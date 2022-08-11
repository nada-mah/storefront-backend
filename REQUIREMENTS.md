# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
veiw all users (req token):
    `get ==>"/users"`
veiw users by users id (req token):    
    `get ==>"/users/:id"`
post new users:    
    `post ==>"/users"`

veiw all products:
    `get ==>"/products"`
veiw products by product id:    
    `get ==>"/products/:id"`
post new product (req token):    
    `post ==>"/products"`
veiw top 5 product (req token): 
    `get ==>"/products?top5=true"`

veiw all orders (req token):
    `get ==>"/orders"`
veiw order by order id (req token):    
    `get ==>"/orders/:id"`
post new order with user_id (req token):    
    `post ==>"/orders"`
post product to order (req token):    
    `post ==>"/orders/:product_id"`
    
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 

#### Users
- Index [token required]
- Show [token required]
- Create [token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- email
- firstName
- lastName
- password

#### Orders
- id
- user_id
- completed (true or false)

#### order_products
- id
- product_id
- order_id
- quantity of each product in the order
