-- CREATE DATABASE happeats;

-- GRANT ALL PRIVILEGES ON DATABASE happeats TO he_user;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public to he_user;

BEGIN;

CREATE TABLE users (
    name VARCHAR(20) NOT NULL,
    gender CHAR(6),
    dateOfBirth DATE,
    contact CHAR(8) NOT NULL,
    address VARCHAR(100) NOT NULL,
    postalCode CHAR(6) NOT NULL,
    email VARCHAR(50) NOT NULL PRIMARY KEY UNIQUE,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE food (
    id SERIAL NOT NULL PRIMARY KEY UNIQUE,
    name VARCHAR(30) NOT NULL,
    image TEXT NOT NULL,
    price NUMERIC(5,2) NOT NULL,
    type VARCHAR(20) NOT NULL
);

CREATE TABLE cartItems (
    userEmail VARCHAR(50) NOT NULL PRIMARY KEY UNIQUE,
    foodId SERIAL NOT NULL UNIQUE,
    quantity INTEGER
);

CREATE TABLE orders (
    id SERIAL NOT NULL PRIMARY KEY UNIQUE,
    orderDateTime TIMESTAMP NOT NULL,
    deliveredDateTime TIMESTAMP NOT NULL,
    userEmail VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE foodOrders (
    id SERIAL NOT NULL PRIMARY KEY UNIQUE,
    orderId SERIAL NOT NULL UNIQUE,
    foodId SERIAL NOT NULL UNIQUE,
    quantity INTEGER
);

ALTER TABLE ONLY cartItems
    ADD CONSTRAINT cartItems_userEmail_fkey FOREIGN KEY (userEmail) REFERENCES users(email);

ALTER TABLE ONLY orders
    ADD CONSTRAINT orders_userEmail_fkey FOREIGN KEY (userEmail) REFERENCES users(email);

ALTER TABLE ONLY foodOrders
    ADD CONSTRAINT foodOrders_orderId_fkey FOREIGN KEY (orderId) REFERENCES orders(id);

ALTER TABLE ONLY foodOrders
    ADD CONSTRAINT foodOrders_foodId_fkey FOREIGN KEY (foodId) REFERENCES food(id);

COMMIT;

ANALYZE users;
ANALYZE food;
ANALYZE cartItems;
ANALYZE orders;
ANALYZE foodOrders;