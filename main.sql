-- Drops the bamazon_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "bamazon_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

CREATE TABLE products (
    -- unique id for each product --
    item_id INTEGER NOT NULL AUTO_INCREMENT,

    product_name VARCHAR(30),

    department_name VARCHAR(30),
    -- cost to customer --
    price DECIMAL(30,2),

    stock_quantity INTEGER(100),

    PRIMARY KEY (item_id),

    product_sales INTEGER(100)
);

-- Insert rows into table 'products' --
INSERT INTO products
( -- columns to insert data into --
 product_name, department_name, price, stock_quantity 
)
VALUES
(
 'fan', 'electronics', 16.14, 200
),
( 
 'wallet', 'accessories', 8.24, 100
),
( 
 'beanie', 'clothing', 7.64, 345
),
( 
 'bowtie', 'clothing', 3.67, 567
),
( 
 'ironman keychain', 'accessories', 10.87, 876
),
( 
 'samsung tv', 'electronics', 399.90, 352
),
( 
 'watch', 'electronics', 67.89, 287
),
( 
 'ring', 'accessories', 47.32, 909
),
( 
 'the black swan', 'books', 16.99, 1
),
( 
 'ego is the enemy', 'books', 23.99, 3
)

CREATE TABLE departments (
    department_id INTEGER NOT NULL,
    department_name VARCHAR(30),
    over_head_costs DECIMAL(30,2)
)