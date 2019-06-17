DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
id INT NOT NULL AUTO_INCREMENT ,
item_id VARCHAR(100),
product_name VARCHAR(100),
department_name VARCHAR(100),
price integer(11),
stock_quantity integer(100),
PRIMARY KEY (id)

);


-- add products

INSERT INTO products 

(item_id, product_name, department_name, price, stock_quantity)
VALUES ("1","product1","electronics","3999","5");

select * from (products)








