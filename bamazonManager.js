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
                case 'View Products for Sale':
                    viewProducts();
                    break;
                case 'View Low Inventory':
                    viewLowInventory();
                    break;
                case 'Add to Inventory':
                    addToInventory();
                    break;
                case 'Add New Product':
                    addNewProduct();
                    break;
            }
        });
});

// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
let options = [
    {
        name: 'menu',
        type: 'list',
        message: 'Please select an action.',
        choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }
]

let secondOptions = [
    {
        type: 'input',
        name: 'item',
        message: 'Please enter the ID number of the item you would like to add inventory to.',
        validate: (val) => {
            var valid = !isNaN(parseInt(val));
            return valid || 'Please enter a number';
        }
    },
    {
        type: 'input',
        name: 'stockUp',
        message: 'How much would you like to increase the stock by?',
        validate: (val) => {
            var valid = !isNaN(parseInt(val));
            return valid || 'Please enter a number';
        }
    }
]

let thirdOptions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter product name.',
    },
    {
        type: 'input',
        name: 'price',
        message: 'Enter product price. || Format: (XX.XX)',
        validate: (val) => {
            var valid = !isNaN(parseFloat(val));
            return valid || 'Please enter a number';
        }
    },
    {
        type: 'input',
        name: 'department',
        message: 'Enter product department.',
    },
    {
        type: 'input',
        name: 'stock',
        message: 'Enter product stock.',
        validate: (val) => {
            var valid = !isNaN(parseInt(val));
            return valid || 'Please enter a number';
        }
    }
]


// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
let viewProducts = () => {
    connection.query("SELECT item_id, product_name, price, stock_quantity,product_sales FROM products", (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
}
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
let viewLowInventory = () => {
    console.log("Selecting all products...\n");
    //where stock quantity is less than 5 -- WHERE stock_quantity <= 5
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity <= 5", (err, res) => {
        if (err) throw err;
        console.table(res);
        connection.end();
    });
}
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
let addToInventory = () => {
    //promt user for item ID and then desired quantity 
    inquirer
        .prompt(secondOptions)
        .then(answers => {
            //target the user item and increase the quantity 
            connection.query(`UPDATE products SET stock_quantity = stock_quantity + ${answers.stockUp} WHERE item_id=${answers.item}`, (err, res) => {
                if (err) throw err;
                //display current iventory
                viewProducts();
            });
        })
}
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
let addNewProduct = () => {
    //prompt user for the product they would like to add
    //get product_name, price, department_name, and stock_quantity 
    inquirer
        .prompt(thirdOptions)
        .then(answers => {
            const {name, department, price, stock} = answers;
            connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('${name}', '${department}', ${price}, ${stock})`, (err, res) => {
                if (err) throw err;
                //display current iventory
                viewProducts();
            });
        });
}