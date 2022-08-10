CREATE TABLE order_products(
    id SERIAL primary key,
    product_id INTEGER REFERENCES products(id) NOT NULL,
    order_id INTEGER REFERENCES orders(id) NOT NULL,
   quantity INTEGER NOT NULL
);