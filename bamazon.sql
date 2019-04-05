DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DOUBLE(10,2) NOT NULL,
	stock_quantity INT NOT NULL
);

INSERT INTO products
(product_name, department_name, price, stock_quantity)
VALUES
("Ipad","Electronics", 649.99, 6),
("Iphone 12", "Electronics", 999.99, 10),
("Rockstar Energy Drink", "Food", 2.50, 20),
("Band of Brothers DVD", "Movies", 40.00, 3),
("Case of Water", "Food" 1.99, 5),
("Basketball", "Sports", 18, 11),
("Gucci shirt", "Clothing", 99.99, 800)

SELECT * FROM products;