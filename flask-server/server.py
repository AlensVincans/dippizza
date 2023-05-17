from datetime import timedelta
import os
import sqlite3
from flask import Flask, abort, redirect, request, jsonify


app = Flask(__name__)

def format_product_data(row):
    product = {
        "id": row[0],
        "name": row[1],
        "ingredients": row[2],
        "price": row[3],
        "image": row[4],
        "food_drink": row[5]
    }
    return product

# menu page -> listing all the products
@app.route('/products')
def products():
    db = sqlite3.connect('flask-server\db\main_db.db')
    sql = db.cursor()
    sql.execute("SELECT * FROM products")
    result_pizza = sql.fetchall()
    db.commit()
    db.close()
    formatted_result = [format_product_data(row) for row in result_pizza]
    return jsonify({"products": formatted_result})  


@app.route('/info', methods=['POST'])
def info():
    data = request.json['id']
    db = sqlite3.connect('flask-server\db\main_db.db')
    sql = db.cursor()
    sql.execute("SELECT * FROM products WHERE id = ?", data)
    result_pizza = sql.fetchall()
    db.commit()
    db.close()
    return {"result": result_pizza}

@app.route('/products/<id>', methods=['GET'])
def productDetails(id):
    db = sqlite3.connect('flask-server\db\main_db.db')
    sql = db.cursor()
    sql.execute("SELECT * FROM products WHERE id = ?", id)
    result_pizza = sql.fetchall()
    db.commit()
    db.close()
    formatted_result = [format_product_data(row) for row in result_pizza]
    return jsonify({"products": formatted_result})

@app.route('/food_drink/<typeData>', methods=['GET'])
def food_drink(typeData):
    db = sqlite3.connect('flask-server\db\main_db.db')
    sql = db.cursor()
    print(typeData)
    sql.execute("SELECT * FROM products WHERE food_drink = ?", (typeData,))
    result_pizza = sql.fetchall()
    db.commit()
    db.close()
    formatted_result = [format_product_data(row) for row in result_pizza]
    return jsonify({"products": formatted_result})

# payment page -> order is saved in the database with order status after being paid
'''@app.route('/payment')
def payment():
    if not order or order == {"items": {}, "total": 0}:
        return abort(405)
    order_db.insert(order)
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
    return redirect('/order')

# POST _ /product/remove/<product_id> -> remove product with <product_id> from current order
@app.route('/product/remove/<product_id>', methods=['POST'])
def remove_from_order(product_id):
    product = findProductById(product_id)
    if not product:
        return abort(404)
    return redirect('/order')
'''


if __name__ == "__main__":
    app.run(debug=True)
