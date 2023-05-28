from datetime import timedelta
import os
import sqlite3
from flask import Flask, request, jsonify


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
    db = sqlite3.connect('flask-server\db\main_db.db')
    sql = db.cursor()
    sql.execute("INSERT INTO users (first_name, last_name, mobile, email, order_receipt_id) VALUES (?, ?, ?, ?, ?)", (first_name, last_name, mobile, email, order_receipt_id))
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
    return jsonify({"message": "Запись успешно создана"})



if __name__ == "__main__":
    app.run(debug=True)
