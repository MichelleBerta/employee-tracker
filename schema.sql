DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

// DEPARTMENT
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

// TITLE
CREATE TABLE title (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(20) NOT NULL,
  salary DECIMAL(10, 4) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);

// EMPLOYEE
CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  title_id INT,
  FOREIGN KEY (title_id) REFERENCES title(id),
  PRIMARY KEY (id)
);




// DEPARTMENT SEEDS
INSERT INTO department(department_name)
VALUES
("Management"),
("Development"),
("IT"),
("Sales");

// TITLE SEEDS
INSERT INTO title(title, salary, department_id)
VALUES
("Sr. V.P.", 100000.00, 1),
("Engineer", 50000.00, 2),
("Developer", 50000.00, 3),
("Sales Executive", 75000.00, 4)


// EMPLOYEE SEEDS
INSERT INTO employee(first_name, last_name, title_id)
VALUES
('John', 'Bosworth', null),
('Gordon', 'Clark', 1),
('Donna', 'Clark', 1),
('Cameron', 'Howe', 2),
('Joe', 'McMillan', 1)

