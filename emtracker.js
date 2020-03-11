let inquirer = require("inquirer");
mysql = require("mysql")
let Ctable = require("console.table");
const fs = require("fs");
require('dotenv').config()

let team=[]
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.MYSQL_PASS,
    database: process.env.DB_NAME
})
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    askQuestions();
});

function askQuestions() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    });
}
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
        type: "input",
        name: "employeeManager",
        message: "who is the employee manager?"
    }
];

const addDepartment = [
    {
        type: "input",
        name: "name",
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
function promptQuestion() {
    inquirer.prompt([{
        type: "list",
        name: "Option",
        message: "What would you like to do?",
        choices:[
            "View all Employees",
            "View all Employees By Department",
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
                promptEmployees();
                break;
            case "View all Employees By Department":
                promptDepartment();
                break;
            case "View all Employees By Manager":
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
            default:"Exit"
                promptQuestion();
                break;

        }
    })
};
function promptAddEmployee() {
    inquirer.prompt(addEmployeeQuestion)
        .then(function (employeeAnswers) {
            const employee=(employeeAnswers.firstName, employeeAnswers.lastName,employeeAnswers.role,employeeAnswers.employeeManager)
            team.push(employee)
            //connection.query("INSERT INTO employee("
            promptQuestion();
            console.log("Employee added Successfully!")
        }
        )
};
function promptAddDepartment() {
    inquirer.prompt( addDepartment)
        .then(function (deptAnswers) {
            const department=(deptAnswers.name)
            team.push(department)
            //connection.query("INSERT INTO employee("
            promptQuestion();
            console.log("Department added Successfully!")
        }
        )
};
function promptAddRole() {
    inquirer.prompt( addRoles)
        .then(function (rolesAnswers) {
            const roles=(rolesAnswers.title, rolesAnswers.salary, rolesAnswers.dept)
            team.push(roles)
            //connection.query("INSERT INTO employee("
            promptQuestion();
            console.log("Role added Successfully!")
        }
        )
};

// "View all Employees"
// function promptEmployees() {
//     inquirer.prompt( viewEmployee)
//         .then(function (viewEmpAnswers) {
//             const viewEmp=(viewEmpAnswers.)
//             team.push(viewEmp)
//             //connection.query("INSERT INTO employee("
//             promptQuestion();
//             console.log("Role added Successfully!")
//         }
//         )
// };






promptQuestion()
