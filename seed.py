from tinydb import Query, TinyDB

db = TinyDB('./products.json')

def main():
    pizza_table = db.table('pizzas')
    pizza_table.insert_multiple([
        {
            "id": "pizza_1",
            "name": "margarita",
            "price": 12.50,
            "ingredients": ["mozarella", "tomato paste"]
        },
        {
            "id": "pizza_2",
            "name": "salami",
            "price": 14.50,
            "ingredients": ["mozarella", "tomato paste", "salami"]
        }
    ])

    topping_table = db.table('toppings')
    topping_table.insert_multiple([
        {
            "id": "topping_1",
            "name": "mustard",
            "price": 2.50,
        },
        {
            "id": "topping_2",
            "name": "ketchup",
            "price": 2.50,
        }
    ])

    drink_table = db.table('drinks')
    drink_table.insert_multiple([
        {
            "id": "drink_1", 
            "name": "water",
            "price": 6.50,
        },
        {
            "id": "drink_2", 
            "name": "juice",
            "price": 2.50,
        }
    ])

main()
