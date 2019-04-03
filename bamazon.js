var mysql = require("mysql");
var inquirer = require("inquirer");
var nodemon = require("nodemon");

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 8889,
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function() {
  // if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

//confirmInput to make sure the customer is uses only positive numbers for their requests
function confirmInput(value) {
  // determines whether the passed value is an integer.
  var integer = Number.isInteger(parseFloat(value));
  //function returns the sign of a number, indicating whether the number is positive, negative or zero.
  var sign = Math.sign(value);

  if (integer && (sign === 1)) {
    return true;
  }
  else {
    return 'Please enter a whole non-zero number.';
  }
}



//and then start your inquirer prompts like this 

inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the ID of the item you wish to purchase?',
      name: 'item_id',
      validate: confirmInput,
      filter: Number
    },
    {
      type: 'input',
      message: 'How many would you like to purchase',
      name: 'stock_quantity',
      validate: confirmInput,
      filter: Number
    }
  ]).then(function (input) {
    console.log('Customer has selected: \n    item_id = ' + input.item_id + '\n    quantity = ' + input.quantity);
  });

  //promptUserPurchase will promt user for the item and quantity they would like to purchase
  function promptUserPurchase() {

    //promt customer to select an item
    inquirer.prompt([
      {
        type: 'input',
        name: 'item_id',
        message: 'Please enter the Item ID that you would like to purchase.',
        validate: confirmInput,
        filter: Number},
        {
          type: 'input',
          name: 'stock_quantity',
          message: 'How many would you like to purchase?',
          filter: Number
        }
      ]).then(function(input) {
        console.log('Customer has selected \n item_id = ' + input.item_id + ' \n quantity = ' + input.stock_quantity);

        var item = input.item_id;
        var quantity = input.stock_quantity;

        //query DB to check that the selected item id exists and is in stock
        var queryChk = 'SELECT * FROM products WHERE ?';

        connection.query(queryChk, {item_id: item}, function(err, data) {
          if (err) throw err;

          if (data.length === 0) {
            console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
        displayInventory();
        
          } else {
            var productData = data[0];
          }
          }
        }
      }

        }
      }
    ])
  }