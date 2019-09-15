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
    readItemsAvailable();
});
// Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
let readItemsAvailable = () => {
    console.log("Selecting all products...\n");
    connection.query("SELECT item_id, product_name, price FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);

        inquirer
            .prompt(questions)
            .then(answers => {
                checkStock(answers.item, answers.units);
            });
    });
}

// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.
let questions = [
    {
        type: 'input',
        name: 'item',
        message: 'Input the ID# of the item you would like to buy.',
        validate: (val) => {
            var valid = !isNaN(parseInt(val));
            return valid || 'Please enter a number';
        }
    },
    {
        type: 'input',
        name: 'units',
        message: 'How many units would you like to buy?',
        validate: (val) => {
            var valid = !isNaN(parseInt(val));
            return valid || 'Please enter a number';
        }
    }
]



//function that subtracts items from the products tables based on user input 
//fucntion should check if there are enough items 
//if not enough, reutrn 'Insuffcent quantity' and prevent order 
//if enough
//update database and show total cost of order 
let checkStock = (itemNumber, requestedUnits) => {
    //get the number of units of the item 
    var unitsRemaining = 0;
    var totalPrice = 0;

    connection.query(`SELECT stock_quantity,price FROM products WHERE item_id=${itemNumber}`, function (err, res) {
        if (err) throw err;

        //calculate the total purchase 
        unitsRemaining = res[0].stock_quantity;
        totalPrice = (res[0].price * requestedUnits).toFixed(2);

        //check if the number of units is greater than the requested unit amount 
        //if enough units, update the table to reflect the changes and print the total cost to the user 
        if (unitsRemaining > requestedUnits) {
            unitsRemaining -= requestedUnits;
            purchaseItem(itemNumber, unitsRemaining);
            console.log('Here is the total price!: ' + totalPrice);
            connection.end();
        }
        //if not enough, reutrn a message to the user and cancel the request
        else {
            console.log("Sorry, not enough in stock :(");
            connection.end();
        }
    });
}

let purchaseItem = (itemNumber, unitsRemaining) => {
    //if enough units, update the table to reflect the changes and print the total cost to the user 
    //update the table 
    var query = connection.query(
        'UPDATE products SET ? WHERE ?',
        [
            {
                stock_quantity: unitsRemaining
            },
            {
                item_id: itemNumber
            }
        ],
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " products updated!\n");
        }
    )
    // console.log(query.sql);
}



//choices: function(){
    //loop over array
    //display array 
//}
