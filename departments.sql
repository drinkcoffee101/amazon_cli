-- Makes it so all of the following code will affect bamazon_db --
USE bamazon_db;

CREATE TABLE departments (
    department_id INTEGER NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    over_head_costs DECIMAL(30,2),
    PRIMARY KEY (department_id),
    total_profit DECIMAL(30,2) DEFAULT 0
);

INSERT INTO departments (department_name,over_head_costs)
VALUES ('electronics',2000),('accessories',3000),('clothing',4000),('books',5000)
