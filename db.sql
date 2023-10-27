CREATE TABLE admins (
	admin_id SERIAL PRIMARY KEY,
	fullname VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	is_active BOOLEAN DEFAULT true,
	subscribtion_started_on DATE DEFAULT CURRENT_DATE,
	subscription_ends_on DATE DEFAULT (CURRENT_DATE + INTERVAL '30 days'),
	created_on DATE DEFAULT CURRENT_DATE,
	updated_on DATE DEFAULT NULL
);

CREATE TABLE stores (
	store_id SERIAL PRIMARY KEY,
	admin_id INT REFERENCES admins(admin_id) ON DELETE CASCADE,
	name VARCHAR(255) NOT NULL,
	address VARCHAR(255) NOT NULL,
	phone VARCHAR(50) NOT NULL,
	tax_rate DECIMAL(5,4) NOT NULL,
	is_active BOOLEAN DEFAULT true,
	created_on DATE DEFAULT CURRENT_DATE,
	updated_on DATE DEFAULT NULL
);


CREATE TABLE cashiers (
	cashier_id SERIAL PRIMARY KEY,
	store_id INT REFERENCES stores(store_id) ON DELETE CASCADE,
	uesr_name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	fullname VARCHAR(255) NOT NULL,
	is_active BOOLEAN DEFAULT true,
	created_on DATE DEFAULT CURRENT_DATE,
	updated_on DATE DEFAULT NULL
);

CREATE TABLE products (
	product_id SERIAL PRIMARY KEY,
	store_id INT REFERENCES stores(store_id) ON DELETE CASCADE,
	name VARCHAR(255) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	quantity INT NOT NULL,
	taxable BOOLEAN DEFAULT true,
	crv DECIMAL(3,2) NOT NULL,
	is_active BOOLEAN DEFAULT true,
	created_on DATE DEFAULT CURRENT_DATE,
	updated_on DATE DEFAULT NULL
);

CREATE TABLE sales (
	sale_id SERIAL PRIMARY KEY,
	quantity INT NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	created_on DATE DEFAULT CURRENT_DATE,
	updated_on DATE DEFAULT NULL
);

CREATE TABLE products_sales (
	product_sale_id SERIAL PRIMARY KEY,
	sale_id INT REFERENCES sales(sale_id),
	product_id INT REFERENCES products(product_id),
	quantity INT NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	created_on DATE DEFAULT CURRENT_DATE,
	updated_on DATE DEFAULT NULL
);


ALTER TABLE sales 
ADD COLUMN store_id INT REFERENCES stores(store_id) ON DELETE CASCADE;

ALTER TABLE products_sales 
ADD COLUMN store_id INT REFERENCES stores(store_id) ON DELETE CASCADE;





