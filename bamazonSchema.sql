drop database if exists bamazonDB;

create database bamazonDB;

use bamazonDB;

CREATE TABLE products (
    item_id INT(10) AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) not null,
    price DECIMAL(10,2) not null,
    stock_quantity INT(10) not null,
   	PRIMARY KEY (item_id)
);












