INSERT INTO deptartment(name) VALUES("Sales");
INSERT INTO department(name) VALUES("Engineering");
INSERT INTO department(name) VALUES("Finance");
INSERT INTO department(name) VALUES("Legal");

INSERT INTO employeeRole(title, salary, department_id)
VALUES("Sales Lead", 80000.00, 1);
INSERT INTO employeeRole(title, salary, department_id)
VALUES("Salesperson", 60000.00, 2);
INSERT INTO employeeRole(title, salary, department_id)
VALUES("Lead Engineer", 100000.00, 3);
INSERT INTO employeeRole(title, salary, department_id)
VALUES("Software Engineer", 110000.00, 4);
INSERT INTO employeeRole(title, salary, department_id)
VALUES("Accountant", 95000.00, 5);
INSERT INTO employeeRole(title, salary, department_id)
VALUES("Legal Team Lead", 150000.00, 6);
INSERT INTO employeeRole(title, salary, department_id)
VALUES("Lawyer", 180000.00, 7);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Robert", "Williams", 4,3),("Nipsey", "Hussle", 5,null),("Benjamin", "Franklin", 2,1), ("Curtis", "Jackson", 1,null),("Christopher", "Wallace", 6,null),("Nia", "Long", 7,6),("Tupac", "Shakur", 3,null);
