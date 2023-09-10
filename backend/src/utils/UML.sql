+----------------+          +----------------+          +----------------+
|     Users      |          |    Products    |          |     Orders     |
+----------------+          +----------------+          +----------------+
| id: INTEGER    |          | id: INTEGER    |          | id: INTEGER    |
| name: STRING   |          | name: STRING   |          | user_id:INTEGER|
| email: STRING  |          | price: FLOAT   |          | total: FLOAT   |
| password: HASH |          | stock: INTEGER |          | status: STRING |
+----------------+          +----------------+          +----------------+
        |                           |                           |
        |                           |                           |
        |                           |                           |
+------------------+          +--------------------+          +---------------------+
|      Cart        |          |     Review         |          |    Favorites        |
+------------------+          +--------------------+          +---------------------+
| id: INTEGER      |          | id: INTEGER        |          | id: INTEGER         |
|user_id:INTEGER   |          | user_id: INTEGER   |          | user_id: INTEGER    |
|product_id:INTEGER|          | product_id: INTEGER|          | product_id: INTEGER |
+------------------+          +--------------------+          +---------------------+
        |                           |                           |
        |                           |                           |
        |                           |                           |
+----------------+          +----------------+          +----------------+
|     Brand      |          |    Category    |          |    Subcategory |
+----------------+          +----------------+          +----------------+
| id: INTEGER    |          | id: INTEGER    |          | id: INTEGER    |
| name: STRING   |          | name: STRING   |          | name: STRING   |
+----------------+          +----------------+          +----------------+
        |                           |                           |
        |                           |                           |
        |                           |                           |
+----------------+          +---------------------+          +--------------------+
|      Tags      |          |   orders_products   |          | favorites_products |
+----------------+          +---------------------+          +--------------------+
| id: INTEGER    |          | order_id: INTEGER   |          | user_id: INTEGER   |
| name: STRING   |          | product_id: INTEGER |          | product_id: INTEGER|
+----------------+          +---------------------+          +--------------------+