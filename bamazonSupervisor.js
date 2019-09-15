const mysql = require("mysql");
const chalk = require('chalk');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Bluestone101!",
    database: "bamazon_db"
});

//establish a conncection to the database 
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    inquirer
        .prompt(options)
        .then(answers => {
            switch (answers.menu) {
                case 'View Product Sales by Department':
                    viewProductSales();
                    break;
                case 'Create New Department':
                    createDepartment();
                    break;
            }
        });
});

let options = [
    {
        name: 'menu',
        type: 'list',
        message: 'Please select an action.',
        choices: ['View Product Sales by Department', 'Create New Department']
    }
]

let viewProductSales = () => {
    connection.query('SELECT departments.department_id, departments.department_name, products.product_sales FROM departments INNER JOIN products ON departments.department_name=products.department_name', (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.end();
    })
}

let createDepartment = () => {

}