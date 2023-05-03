from datetime import timedelta
import os

from flask import Flask, abort, render_template, session, redirect
from tinydb import Query, TinyDB

app = Flask(__name__)
app.secret_key = 'super secret key'
app.permanent_session_lifetime = timedelta(minutes=15)
app.debug = True

dirname = os.path.dirname(os.path.realpath(__file__))
product_db = TinyDB(dirname + '/products.json')
order_db = TinyDB(dirname + '/orders.json')
order_index = 0

# homepage
@app.route('/', methods=['GET'])
def index():
    return render_template('home.html')

# menu page -> listing all the products
@app.route('/menu', methods=['GET'])
def menu():
    products = {}
    for table_name in ["pizzas", "toppings"]:
        products[table_name] = product_db.table(table_name).all()
    return render_template('menu.html', products=products)

# payment page -> order is saved in the database with order status after being paid
@app.route('/payment')
def payment():
    global order_index
    order = session.get("order")
    if not order or order == {"items": {}, "total": 0}:
        return abort(405)
    order["id"] = order_index
    order["status"] = "ordered"
    order_db.insert(order)
    order_index += 1
    return render_template('payment.html')

# GET _ /order -> preview of the current order
@app.route('/order', methods=['GET'])
def preview_order():
    order = session.get("order")
    if not order:
        order = {"items": {}, "total": 0}
        session["order"] = order

    products = {}
    for item_id in order["items"]:
        item = findProductById(item_id)
        if not item:
            return abort(400)
        products[item_id] = item
        products[item_id]["qty"] = order["items"][item_id]
    print(products)
    return render_template('order.html', products=products)

# POST _ /order -> delete(purge) current order
@app.route('/order', methods=['POST'])
def purge_order():
    order = session.get("order")
    if not order:
        return abort(405)
    session.clear()
    return redirect('/menu')


def findProductById(id):
    for table_name in ["pizzas", "toppings"]:
        table = product_db.table(table_name)
        product = table.get(Query().id == id)
        if product:
            return product
    return None

# POST _ /product/add/<product_id> -> add product with <product_id> to current order
@app.route('/product/add/<product_id>', methods=["POST"])
def add_to_order(product_id):
    product = findProductById(product_id)
    if not product:
        return abort(404)

    order = {}
    if not session["order"]:
        order = {"items": {}, "total": 0}
    else:
        order = session["order"]

    if product_id not in session["order"]["items"]:
        order["items"][product_id] = 1
    else:
        order["items"][product_id] += 1

    order["total"] += product["price"]
    session["order"] = order
    return redirect('/order')

# POST _ /product/remove/<product_id> -> remove product with <product_id> from current order
@app.route('/product/remove/<product_id>', methods=['POST'])
def remove_from_order(product_id):
    product = findProductById(product_id)
    if not product:
        return abort(404)

    order = {}
    if not session["order"]:
        return abort(405)
    order = session["order"]

    if product_id not in order["items"]:
        return abort(405)

    if order["items"][product_id] - 1 == 0:
        order["items"].pop(product_id, None)
    else:
        order["items"][product_id] -= 1

    order["total"] -= product["price"]
    session["order"] = order
    return redirect('/order')

app.run()
