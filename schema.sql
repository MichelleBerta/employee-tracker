DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(30),
  PRIMARY KEY (id)
);


CREATE TABLE title (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(20),
  salary DECIMAL(6, 4),
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id),
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  manager_id INT,
  title_id INT,
  FOREIGN KEY (title_id) REFERENCES title(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id),
  PRIMARY KEY (id)
);
