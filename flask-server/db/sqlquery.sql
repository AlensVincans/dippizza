--CREATE TABLE orders(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, order_receipt INTEGER, datetime_text TEXT, users_id INTEGER, products_id INTEGER, status_order_id INTEGER, payment_type_id INTEGER, FOREIGN KEY (users_id) REFERENCES users(id), FOREIGN KEY (products_id) REFERENCES products(id), FOREIGN KEY (status_order_id) REFERENCES status_order(id), FOREIGN KEY (payment_type_id) REFERENCES payment_type(id));
--SELECT * FROM orders;

CREATE TABLE payment(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, bakets_id INTEGER, FOREIGN KEY (bakets_id) REFERENCES bakets(id));