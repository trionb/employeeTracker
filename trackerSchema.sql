DROP DATABASE IF  EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department(
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR (30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE employeeRole(
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,3) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
    -- FOREIGN KEY (department_id) REFERENCES deptartment(id)
    
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT DEFAULT NULL,
	  PRIMARY KEY(id)
    -- FOREIGN KEY (role_id) REFERENCES employeeRole(id),
    -- FOREIGN KEY (manager_id) REFERENCES employee(id)
);

SELECT * FROM employee.id, employee.first_name, employee.last_name,employeeRole.title, department.name, employeeRole.salary, employee.manager_id FROM employee INNER JOIN employeeRole ON employeeRole.id = employee.role_id INNER JOIN department ON department.id = employeeRole.department_id