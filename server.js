const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "myPassword",
  database: "employee_trackerDB",
});

connection.connect((err) => {
  if (err) throw err;
  startProgram();
});
//  INITIATE PROGRAM
const startProgram = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Please select an action to perform.",
      choices: ["Add an employee", "Add a title", "Add a department", "Update an employee", "View all employees", "View all titles", "View all departments"],
    })
    .then((answer) => {
      switch (answer.action) {
        case "Add an employee":
          addEmployee();
          break;

        case "Add a title":
          addTitle();
          break;

        case "Add a department":
          addDepartment();
          break;

        case "Update an employee":
          updateEmployee();
          break;

        case "View all employees":
          viewAllEmployees();
          break;

        case "View all titles":
          viewAllTitles();
          break;

        case "View all departments":
          viewAllDepartments();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

// ADD DEPARTMENT
function addDepartment() {
  inquirer
    .prompt({
      name: "newDepartment",
      type: "input",
      message: "Department Name: ",
    })
    .then((answer) => {
      connection.query("INSERT INTO department (department_name) VALUES (?)", [answer.newDepartment], (err, results) => {
        if (err) {
          console.log(err);
        }
        startProgram();
      });
    });
}

// ADD TITLE
function addTitle() {
  inquirer
    .prompt([
      {
        name: "newTitle",
        type: "input",
        message: "Title: ",
      },
      {
        name: "newSalary",
        type: "input",
        message: "Salary: ",
      },
      {
        name: "newDepartment",
        type: "input",
        message: "Department: ",
      },
    ])
    .then((answer) => {
      connection.query("INSERT INTO title (title, salary, department_id) VALUES (?, ?, ?)", [answer.newTitle, answer.newSalary, 1], (err, results) => {
        if (err) {
          console.log(err);
        }
        startProgram();
      });
    });
}

// ADD EMPLOYEE
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "First Name: ",
      },
      {
        name: "lastName",
        type: "input",
        message: "Last Name: ",
      },
      {
        name: "newTitle",
        type: "list",
        message: "Title: ",
        choices: ["1-Sr. V.P.", "2-Engineer", "3-Developer", "4-Sales Executive", "5-Manager"],
      },
    ])

    .then((answer) => {
      connection.query("INSERT INTO employee (first_name, last_name, title_id) VALUES (?, ?, ?)", [answer.firstName, answer.lastName, answer.newTitle.split("-")[0]], (err, results) => {
        if (err) {
          console.log(err);
        }
        startProgram();
      });
    });
}

// VIEW ALL TITLES
function viewAllTitles() {
  connection.query("SELECT * FROM title;", function (err, res) {
    if (err) throw err;
    console.table(res);
    startProgram();
  });
}

// VIEW DEPARTMENTS
function viewAllDepartments() {
  connection.query("SELECT * FROM department;", function (err, res) {
    if (err) throw err;
    console.table(res);
    startProgram();
  });
}

// VIEW ALL EMPLOYEES
function viewAllEmployees() {
  connection.query("SELECT * FROM employee;", function (err, res) {
    if (err) throw err;
    console.table(res);
    startProgram();
  });
}
