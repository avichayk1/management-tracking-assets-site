
--create 2
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id int UNIQUE,
    customer_f_name VARCHAR(45),
    customer_l_name VARCHAR(45),
    customer_phone VARCHAR(13),
    customer_mail VARCHAR(45),
    customer_adress VARCHAR(45),
    customer_d_join DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
--create 3
CREATE TABLE Assets (
    asset_id int AUTO_INCREMENT PRIMARY KEY,
    asset_adress VARCHAR(45),
    asset_district VARCHAR(45),
    asset_path CHAR(2),
    asset_cost INT,
    starting_date DATE,
    ending_date DATE,
    asset_registration DATE,
    team CHAR(1),
    summaries VARCHAR(225),
    size FLOAT,
    budget FLOAT,
    customer_id int,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);
--create 4
CREATE TABLE ActiveTenants (
    asset_id int UNIQUE,
    tenant_f_name VARCHAR(45),
    tenant_l_name VARCHAR(45),
    tenant_id int,
    asset_price INT,
    PRIMARY KEY (asset_id, tenant_id),
    FOREIGN KEY (asset_id) REFERENCES Assets(asset_id)
);
--create 5
CREATE TABLE PassiveTenants (
    asset_id int UNIQUE,
    last_maintenance DATE,
    next_maintenance DATE,
    PRIMARY KEY (asset_id),
    FOREIGN KEY (asset_id) REFERENCES Assets(asset_id)
);
--create 7
CREATE TABLE StockOrders (
    order_id int AUTO_INCREMENT PRIMARY KEY,
    order_date DATE,
    amount VARCHAR(45),
    item_name VARCHAR(45),
    action_type VARCHAR(45),
    employee_id int,
    urgency BOOLEAN,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)

);
--create 6
CREATE TABLE Employees (
    employee_id int AUTO_INCREMENT PRIMARY KEY,
    user_id int UNIQUE,
    employee_f_name VARCHAR(45),
    employee_l_name VARCHAR(45),
    employee_phone VARCHAR(45),
    employee_mail VARCHAR(45),
    employee_adress VARCHAR(45),
    team CHAR(1),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
drop table Employees
--create 8
CREATE TABLE Journals (
    journal_id int  AUTO_INCREMENT PRIMARY KEY,
    name_ VARCHAR(45),
    date_ DATE,
    team CHAR(1),
    employee_id int,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
--create 9

CREATE TABLE Contacts (
    full_name VARCHAR(45),
    customer_mail VARCHAR(45),
    customer_phone VARCHAR(13),
    message_ VARCHAR(225),
    customer_id int,
    team CHAR(1),
    PRIMARY KEY (customer_id, customer_mail),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);
--create 10

CREATE TABLE CustomersOpinions (
    opinion_id int AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    rating BOOLEAN,
    positive_note VARCHAR(45),
    negative_note VARCHAR(45),
    opinion_date DATE,
    more VARCHAR(45),
    frequency VARCHAR(45),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);
--create 1
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(45),
    user_password VARCHAR(45),
    user_type ENUM('employee', 'manager', 'customer')
);

DROP TABLE log_in
INSERT INTO users (id, Password) VALUES
('1234', '1234'),
('205621414', '2056'),
('206617417', 'Lee'),
('356987415', 'Yagel');
AUTO_INCREMENT = 1;
drop TABLE PassivTenants
drop table ActiveTenants
drop table Assets
drop table contact
drop table customers
drop table CustomersOpinion
drop table Employees
drop table journal
drop table Users
drop table StockOrder









ALTER TABLE Assets
DROP COLUMN asset_id;

ALTER TABLE Assets
MODIFY COLUMN asset_id AUTO_INCREMENT INT;

ALTER TABLE Assets
ADD CONSTRAINT fk_owner
FOREIGN KEY (asset_id)
REFERENCES Customers(customer_id);


ALTER TABLE ActiveTenants
DROP FOREIGN KEY fk_ActiveTenants_asset_id;

ALTER TABLE passivtenants
add CONSTRAINT fk_passivtenants_asset_id
FOREIGN KEY (asset_id)
REFERENCES Assets(asset_id)

truncate table Customers

ALTER TABLE Employees
CHANGE employee_l_ame employee_l_name VARCHAR(45);
ALTER table users AUTO_INCREMENT = 1
INSERT INTO users (user_name, user_password, user_type) VALUES
('john_doe', 'password123', 'customer'),
('jane_smith', 'password123', 'employee'),
('michael_lee', 'adminpass', 'manager'),
('emily_jones', 'employee123', 'employee'),
('madmin', 'madmin123', 'manager'),
('admin', 'admin123', 'employee'),
('chris_rock', 'password123', 'employee'),
('paul_smith', 'password123', 'manager'),
('lisa_white', 'password123', 'customer'),
('alex_brown', 'password123', 'customer');

INSERT INTO users (user_name, user_password, user_type) VALUES
('admin', 'password123', 'employee'),
('madmin', 'password123', 'manager');
INSERT INTO users (user_name, user_password, user_type) VALUES
('admin2', 'password123', 'employee')

UPDATE users SET user_password = 'password123';
ALTER table Customers AUTO_INCREMENT = 1

INSERT INTO Customers (user_id, customer_f_name, customer_l_name, customer_phone, customer_mail, customer_adress, customer_d_join) VALUES
(1, 'John', 'Doe', '123-456-7890', 'john.doe@example.com', '123 Elm St', '2024-01-15'),
(7, 'Lisa', 'White', '555-222-3333', 'lisa.white@example.com', '789 Pine St', '2024-03-10'),
(8, 'Alex', 'Brown', '555-444-5555', 'alex.brown@example.com', '101 Maple Ave', '2024-04-05');

TRUNCATE table Customers
ALTER table Employees AUTO_INCREMENT = 1

-- Insert employees
INSERT INTO Employees (user_id, employee_f_name, employee_l_name, employee_phone, employee_mail, employee_adress, team) VALUES
(2, 'Jane', 'Smith', '555-123-4567', 'jane.smith@example.com', '789 Pine St', 'A'),
(4, 'Emily', 'Jones', '555-987-6543', 'emily.jones@example.com', '101 Maple Ave', 'B'),
(5, 'Chris', 'Rock', '555-888-9999', 'chris.rock@example.com', '303 Cedar St', 'C'),
(6, 'Paul', 'Smith', '555-000-1111', 'paul.smith@example.com', '404 Elm St', 'D'),
(9, 'Admin', 'User', '555-111-2222', 'admin@example.com', '505 Oak St', 'E'), -- New Employee
(10, 'Madmin', 'User', '555-333-4444', 'madmin@example.com', '606 Birch St', 'F'); -- New Manager

TRUNCATE table Employees
ALTER table Assets AUTO_INCREMENT = 1


INSERT INTO Assets (asset_adress, asset_district, asset_path, asset_cost, starting_date, ending_date, asset_registration, team, summaries, size, budget, customer_id) VALUES
('123 Elm St', 'North District', 'A1', 5000, '2024-01-01', '2024-12-31', '2024-01-01', 'A', 'Office Building', 150.0, 10000.0, 1),
('789 Pine St', 'East District', 'B2', 7000, '2024-02-01', '2024-11-30', '2024-02-01', 'B', 'Warehouse', 200.0, 15000.0, 2),
('101 Maple Ave', 'South District', 'C3', 6000, '2024-03-01', '2024-10-31', '2024-03-01', 'C', 'Retail Store', 175.0, 12000.0, 3),
('202 Birch St', 'West District', 'D4', 8000, '2024-04-01', '2024-09-30', '2024-04-01', 'A', 'Manufacturing Plant', 250.0, 20000.0, 1),
('303 Cedar St', 'Central District', 'E5', 5500, '2024-05-01', '2024-08-31', '2024-05-01', 'B', 'Distribution Center', 180.0, 13000.0, 2),
('404 Elm St', 'North District', 'F6', 4500, '2024-06-01', '2024-07-31', '2024-06-01', 'C', 'Service Center', 160.0, 11000.0, 3),
('505 Oak St', 'South District', 'G7', 6500, '2024-07-01', '2024-06-30', '2024-07-01', 'A', 'Research Facility', 190.0, 14000.0, 1),
('606 Birch St', 'East District', 'H8', 7500, '2024-08-01', '2024-05-31', '2024-08-01', 'B', 'Training Center', 210.0, 16000.0, 2);


TRUNCATE table Assets
ALTER table ActiveTenants AUTO_INCREMENT = 1
INSERT INTO ActiveTenants (asset_id, tenant_f_name, tenant_l_name, tenant_id, asset_price) VALUES
(1, 'Alice', 'Johnson', 1, 2000),
(2, 'Bob', 'Williams', 2, 2500),
(3, 'Charlie', 'Davis', 3, 2200),
(4, 'David', 'Miller', 4, 3000),
(5, 'Eva', 'Wilson', 5, 2300),
(6, 'Frank', 'Moore', 6, 2100),
(7, 'Grace', 'Taylor', 7, 2700),
(8, 'Hannah', 'Anderson', 8, 2800);


TRUNCATE table ActiveTenants


ALTER table StockOrders AUTO_INCREMENT = 1

INSERT INTO StockOrders (order_date, amount, item_name, action_type, employee_id, urgency) VALUES
('2024-01-10', '50', 'Office Chairs', 'Purchase', 2, TRUE),
('2024-02-15', '100', 'Desks', 'Purchase', 5, FALSE),
('2024-03-20', '20', 'Computers', 'Purchase', 6, TRUE),
('2024-04-25', '75', 'Monitors', 'Purchase', 3, FALSE),
('2024-05-30', '60', 'Printers', 'Purchase',4, TRUE),
('2024-06-15', '30', 'Projectors', 'Purchase', 1, FALSE),
('2024-07-10', '80', 'Office Supplies', 'Purchase', 1, TRUE),
('2024-08-05', '40', 'Software Licenses', 'Purchase', 2, FALSE);

TRUNCATE table StockOrder
ALTER table journals AUTO_INCREMENT = 1

INSERT INTO journals (name_, date_, team, employee_id) VALUES
('Meeting with Client', '2024-01-15', 'A', 2),
('Project Update', '2024-02-20', 'B', 5),
('Budget Review', '2024-03-10', 'C', 6),
('Team Building Event', '2024-04-05', 'D', 1),
('Quarterly Report', '2024-05-15', 'E', 3),
('Maintenance Review', '2024-06-25', 'A', 2),
('Strategy Session', '2024-07-30', 'B', 5),
('Annual Review', '2024-08-15', 'C', 6);

TRUNCATE table CustomersOpinions

ALTER table CustomersOpinions AUTO_INCREMENT = 1

INSERT INTO CustomersOpinions (customer_id, rating, positive_note, negative_note, opinion_date, more, frequency) VALUES
(1, TRUE, 'Great service!', 'None', '2024-02-01', 'Very satisfied', 'Weekly'),
(1, FALSE, 'Average experience', 'Long wait time', '2024-03-01', 'Neutral', 'Monthly'),
(2, TRUE, 'Excellent support', 'None', '2024-04-01', 'Happy with the support', 'Monthly'),
(2, TRUE, 'Very satisfied', 'None', '2024-05-01', 'Great service overall', 'Weekly'),
(3, FALSE, 'Slow service', 'Unfriendly staff', '2024-06-01', 'Needs improvement', 'Monthly'),
(3, TRUE, 'Improved experience', 'None', '2024-07-01', 'Getting better', 'Weekly'),
(1, TRUE, 'Quick response', 'None', '2024-08-01', 'Very happy', 'Weekly'),
(2, TRUE, 'Reliable service', 'None', '2024-08-02', 'Will recommend', 'Monthly');

ALTER table Contacts AUTO_INCREMENT = 1

INSERT INTO Contacts (full_name, customer_mail, customer_phone, message_, customer_id, team) VALUES
('John Doe', 'john.doe@example.com', '123-456-7890', 'Need information about new products.', 1, 'A'),
('Lisa White', 'lisa.white@example.com', '555-222-3333', 'Looking for a refund process.', 2, 'B'),
('Alex Brown', 'alex.brown@example.com', '555-444-5555', 'Inquiry about warranty services.', 3, 'C')

DELETE FROM Users
WHERE user_id = 32 ;


UPDATE Customers
SET user_id = 9
WHERE customer_id=2;