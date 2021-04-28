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

const startProgram = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add a department", "Add a title"],
    })
    .then((answer) => {
      switch (answer.action) {
        case "Add a department":
          addDepartment();
          break;
        case "Add a title":
          addTitle();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};
function addDepartment() {
  inquirer
    .prompt({
      name: "newDepartment",
      type: "input",
      message: "Department Name: ",
    })
    .then((answer) => {
      console.log(answer.newDepartment);
      connection.query("INSERT INTO department (department_name) VALUES (?)", [answer.newDepartment], (err, results) => {
        if (err) {
          console.log(err);
        }
        startProgram();
      });
    });
}

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
    }
  ])
    .then((answer) => {
      connection.query("INSERT INTO title (title, salary, DEPARTMENT????) VALUES (?, ?, ?)", [answer.newTitle, answer.newSalary, answer.newDepartment], (err, results) => {
        if (err) {
          console.log(err);
        }
        startProgram();
      });
    });
}