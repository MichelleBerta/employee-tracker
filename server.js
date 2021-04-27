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

// WHAT DO YOU WANT TO DO?

const startProgram = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add an employee"],
    })

    .then((answer) => {
      switch (answer.action) {
        case "Add an employee":
          addEmployee();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

// ADD EMPLOYEE

function addEmployee() {
  inquirer.prompt([
    {
      name: "firstname",
      type: "input",
      message: "What is the new employee's first name?",
    },
    {
      name: "lasttname",
      type: "input",
      message: "What is the new employee's last name?",
    },

  ]).then((answer) => {
    console.log(answer.firstname);
    connection.query("INSERT INTO employee ('first_name', 'last_name'), VALUES (?, ?)",[answer.firstname, answer.lastname], (err, results) => {
      if (err) {
      console.log(err)
      }
      console.log(results)
    })
  })

}
