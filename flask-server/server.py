from datetime import timedelta
import os
import sqlite3
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import mail


app = Flask(__name__)

UPLOAD_FOLDER = 'client-react/public/uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def format_product_data(row):
    product = {
        "id": row[0],
        "name": row[1],
        "ingredients": row[2],
        "price": row[3],
        "image": row[4],
        "food_drink": row[5],
    
    }
    return product

def format_operator_data(row):
    operator = {
        "id": row[0],
        "name": row[1],
        "login": row[2],
        "pass": row[3],
        "role": row[4],
        "img": row[5]
    }
    return operator

def format_admin_orders(row):
    operator = {
        "id": row[0],
        "first_name": row[1],
        "last_name": row[2],
        "mobile": row[3],
        "address": row[4],
        "datetime": row[5],
        "payment_type": row[6],
        "order_receipt": row[7],
        "status_name": row[8],
        "product_name": row[9]
    }
    return operator    

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
    sql.execute("SELECT * FROM products WHERE id = ?", (id,))
    result_pizza = sql.fetchall()
    db.commit()
    db.close()
    formatted_result = [format_product_data(row) for row in result_pizza]
    return jsonify({"products": formatted_result})

@app.route('/food_drink/<typeData>', methods=['GET'])
def food_drink(typeData):
    db = sqlite3.connect('flask-server\db\main_db.db')
    sql = db.cursor()
    sql.execute("SELECT * FROM products WHERE food_drink = ?", (typeData,))
    result_pizza = sql.fetchall()
    db.commit()
    db.close()
    formatted_result = [format_product_data(row) for row in result_pizza]
    return jsonify({"products": formatted_result})

@app.route('/create_user', methods=['POST'])
def payment():
    first_name = request.json["first_name"]
    last_name = request.json["last_name"]
    mobile = request.json["mobile"]
    email = request.json["email"]
    order_receipt_id = request.json["order_receipt_id"]
    address = request.json["address"]
    db = sqlite3.connect('flask-server\db\main_db.db')
    sql = db.cursor()
    sql.execute("INSERT INTO users (first_name, last_name, mobile, email, order_receipt_id, address) VALUES (?, ?, ?, ?, ?, ?)", (first_name, last_name, mobile, email, order_receipt_id, address))
    db.commit()
    db.close()
    return jsonify({"message": "Запись успешно создана"})


@app.route('/create_order', methods=['POST'])
def create_order():
    orders_data = request.json['orders_data']
    order_receipt = request.json['order_receipt']
    status_order_id = request.json['status_order_id']
    #products_id = request.json['products_id']
    

    for order_data in orders_data:
        db = sqlite3.connect('flask-server\db\main_db.db')
        sql = db.cursor()
        sql.execute("INSERT INTO orders (order_receipt, products_id, status_order_id) VALUES (?, ?, ?)", (order_receipt, order_data['id'], status_order_id))
        db.commit()
        db.close() 
    mail.sendMail() 
    return jsonify({"message": "Запись успешно создана"})

@app.route('/set_operator', methods=['GET', 'POST'])
def set_operator():
    login = request.json['login']
    password = request.json['pass']
    db = sqlite3.connect('flask-server\db\main_db.db')
    sql = db.cursor()
    sql.execute("SELECT * FROM operators WHERE login = ? AND pass = ?", (login, password))
    operatorData = sql.fetchall()
    db.commit()
    db.close()
    if(operatorData != []):
        formatted_result = [format_operator_data(row) for row in operatorData]
        return jsonify({"operator": formatted_result})
    return jsonify({"error": "User is not found"}) 

@app.route('/adminOrders', methods=["GET"])
def admin_orders():
    db = sqlite3.connect('flask-server\db\main_db.db')
    sql = db.cursor()
    sql.execute("SELECT orders.id, users.first_name, users.last_name, users.mobile, users.address,"+
                "orders.datetime_text, orders.payment_type_id, orders.order_receipt, "+
                "status_order.status_name, products.name "+
                "FROM (((orders "+
                "INNER JOIN users ON users.order_receipt_id = orders.order_receipt) "+
                "INNER JOIN status_order ON status_order.id = orders.status_order_id) "+
                "INNER JOIN products ON products.id = orders.products_id)")
    result_ordersAdmin = sql.fetchall()
    db.commit()
    db.close()
    format_admin_orders_result = [format_admin_orders(row) for row in result_ordersAdmin]
    return jsonify({"orders": format_admin_orders_result})

@app.route('/addProduct', methods=['POST'])
def add_product():
    name = request.form["name"]
    ingredients = request.form["ingredients"]
    price = request.form["price"]
    food_drink = request.form["food_drink"]
    file_img = request.files["image"]
    if file_img:
        filename = secure_filename(file_img.filename)
        file_img.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    db = sqlite3.connect('flask-server\db\main_db.db')
    sql = db.cursor()
    sql.execute("INSERT INTO products (name, ingredients, price, food_drink, image) VALUES (?, ?, ?, ?, ?)", (name, ingredients, price, food_drink,  filename))
    db.commit()
    db.close()
    return jsonify({"message": "Запись успешно создана"})

    
@app.route('/deleteProduct', methods=["POST"])
def delete_product():
    id_product = request.json["id_product"]

    db = sqlite3.connect('flask-server\db\main_db.db')
    sql = db.cursor()
    sql.execute("DELETE FROM products WHERE id = ?", (id_product,))
    db.commit()
    db.close()
    return jsonify({"message": "Запись успешно удалена"})

@app.route('/updateProduct', methods=["POST"])
def update_product():
    id_update = request.form["id"]
    name = request.form["name"]
    ingredients = request.form["ingredients"]
    price = request.form["price"]
    food_drink = request.form["food_drink"]
    file_img = request.files["image"]
    if file_img:
        filename = secure_filename(file_img.filename)
        file_img.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    
    db = sqlite3.connect('flask-server\db\main_db.db')
    sql = db.cursor()
    sql.execute("UPDATE products SET name = ?, ingredients = ?, price = ?, food_drink = ?, image = ? WHERE id = ?", 
                (name, ingredients, price, food_drink, filename,  id_update))
    db.commit()
    db.close()
    return jsonify({"message": "Запись успешно обновлена"})

    
@app.route('/updateOrder', methods=["POST"])
def update_order():
    id_update = request.json["id"]
    status_order_id = request.json["status_order_id"]
    
    db = sqlite3.connect('flask-server\db\main_db.db')
    sql = db.cursor()
    sql.execute("UPDATE orders SET status_order_id = ? WHERE id = ?", 
                (status_order_id,  id_update))
    db.commit()
    db.close()
    return jsonify({"message": "Запись успешно обновлена"})


if __name__ == "__main__":
    app.run(debug=True)
