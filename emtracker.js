let inquirer = require("inquirer");
mysql = require("mysql")
let Ctable = require("console.table");
const fs = require("fs");
require('dotenv').config()

let team = []
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASS,
    database: process.env.DB_NAME
})
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    promptQuestion();
});
function promptQuestion() {
    inquirer.prompt([{
        type: "list",
        name: "Option",
        message: "What would you like to do?",
        choices: [
            "View all Employees",
            "View all Departments",
            "View all Employees By Manager",
            "View Employee Roles",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Role",
            "Exit"
        ]
    }]).then(function (promptAnswers) {
        switch (promptAnswers.Option) {
            case "View all Employees":
                promptEmployee();
                break;
            case "View all Departments":
                promptDepartment();
                break;
            case "View all Employees By Manager":////////// bonus
                promptManager();
                break;
            case "View Employee Roles":
                promptRoles();
                break;
            case "Add Employee":
                promptAddEmployee();
                break;
            case "Add Department":
                promptAddDepartment();
                break;
            case "Add Role":
                promptAddRole();
                break;
            case "Update employee Role":
                promptUpdateRole();
                break;
            default: "Exit"
                promptQuestion();
                break;

        }
    })
}
const viewEmployee = [
    {
        type: "input",
        name: "viewEmp",
        message: "View all employees"
    },
];
const viewDepartment = [
    {
        type: "input",
        name: "viewDept",
        message: "View all Departments"
    },
];
const viewRoles = [
    {
        type: "input",
        name: "viewRoles",
        message: "View all Roles"
    },
];
const addEmployeeQuestion = [
    {
        type: "input",
        name: "firstName",
        message: "what is the employee first name?"
    },
    {
        type: "input",
        name: "lastName",
        message: "what is the employee last name"
    },
    {
        type: "input",
        name: "role",
        message: "what is the employee role?"
    },
    {
        type: "list",
        name: "employeeManager",
        message: "who is the employee manager?",
        choices:["Curtis Jackson",
                 "Nipsey Hussle",
                 "Tupac Shakur"
    ]
    }
];

const addDepartment = [
    {
        type: "input",
        name: "addDept",
        message: "what department would you like to add?"

    }
];

const addRoles = [
    {
        type: "input",
        name: "title",
        message: "What is the employee role?",
    },
    {
        type: "input",
        name: "salary",
        message: "What is the employee role salary?",
    },
    {
        type: "input",
        name: "dept",
        message: "What is the employee role department?",
    }
];
const updateEmployeeRole = [
    {
        type: "input",
        name: "updateRole",
        message: "What is the new employee role?",
    },
];
// function promptQuestion() {

// };
/////add employee//////
function promptAddEmployee() {
    //console.log("ran prompt employee")
    inquirer.prompt(addEmployeeQuestion)
        .then(function (employeeAnswers) {
            let first_Name = employeeAnswers.firstName
            let lastName = employeeAnswers.lastName
            let managerName = employeeAnswers.employeeManager.split(" ")
            let manager_id;
            let role_id;
            //console.log(managerName)
            connection.query("SELECT * FROM employee WHERE first_name=? AND last_name=?", [managerName[0], managerName[1]], function (err, res) {
                console.log(res)
                manager_id = res[0].id;
                connection.query("SELECT * FROM employeeRole WHERE title=?", [employeeAnswers.role], function (err, res) {
                    role_id = res[0].id
                    connection.query("INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)", [first_Name, lastName, role_id, manager_id], function (err, res) {
                        if (err)
                            throw err;
                        console.log([first_Name, lastName, role_id, manager_id]);
                        console.log("Employee added Successfully!");

                        promptQuestion();

                    })

                })


            })



        });


};
///add department////
function promptAddDepartment() {
    inquirer.prompt(addDepartment)
        .then(function (deptAnswers) {
            const department = (deptAnswers.name)
            team.push(department)
            connection.query("INSERT INTO department (name) VALUES (?)", [deptAnswers.addDept], function (err, res) {
                if (err)
                    throw err;
            })
            promptQuestion();
            console.log("Department added Successfully!")
        }
        )
};
//add roles////
function promptAddRole() {
    inquirer.prompt(addRoles)
        .then(function (rolesAnswers) {
            const roles = (rolesAnswers.title, rolesAnswers.salary, rolesAnswers.dept)
            team.push(roles)
            connection.query("Select * FROM department", function (err, res) {

            })
            promptQuestion();
            console.log("Role added Successfully!")
        }
        )
};

//view employees//////
function promptEmployee() {
    inquirer.prompt(viewEmployee)
    connection.query("SELECT employee.id, employee.first_name, employee.last_name,employeeRole.title, department.name, employeeRole.salary, employee.manager_id FROM employee INNER JOIN employeeRole ON employeeRole.id = employee.role_id INNER JOIN department ON department.id = employeeRole.department_id", function (err, res) {
        if (err) throw err;
        console.table(res)
        promptQuestion();
    })
}
////view all departments/////
function promptDepartment() {
    inquirer.prompt(viewDepartment)
    connection.query("SELECT name FROM department", function (err, res) {
        if (err) throw err;
        console.table(res)
        promptQuestion();
    })
}
////////////view all roles
function promptRoles() {
    inquirer.prompt(viewRoles)
    connection.query("SELECT title FROM employeeRole", function (err, res) {
        if (err) throw err;
        console.table(res)
        promptQuestion();
    })
}
//////////////////////////////////////finish update role
function promptUpdateRole() {
    connection.query("SELECT name FROM department", function (err, res) {
        if (err) throw err;
        console.table(res)
        promptQuestion();
    })
}
///////////////////////////////////////////


//     inquirer.prompt( viewEmployee)
//         .then(function (viewEmpAnswers) {
//             const viewEmp=(viewEmpAnswers)
//             team.push(viewEmp)
//             connection.query("SELECT * FROM employee", function (err, data) {
//                 if (err) {
//             console.log(data)
//             console.log("Role added Successfully!")
//             promptQuestion();
//         }
//     });
//   });

//}





