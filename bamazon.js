var mysql = require("mysql");


var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 8889,
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  createProduct();
});


function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        
        //console log your response here and put it into a table or
        //just console log the results in a neat and clean way.
        
        //and then start your inquirer prompts like this 
        
        inquirer
          .prompt([
            {
              type: 'input',
              message: 'What is the ID of the item you wish to purchase?',
              name: 'first',
              validate: function (value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }}])
// function createProduct() {
//   console.log("Inserting a new product...\n");
//   var query = connection.query(
//     "INSERT INTO products SET ?",
//     {
//         product_name: "item 1",
//         department_name: "department 1",
//         price: 1.00,
//         stock_quantity: 25
//     },

//     function(err, res) {
//       console.log(res.affectedRows + " product inserted!\n");
//       // Call updateProduct AFTER the INSERT completes
//       updateProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function updateProduct() {
//   console.log("Updating all product quantities...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         quantity: 100
//       },
//       {
//         product: "item 1"
//       }
//     ],
//     function(err, res) {
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function deleteProduct() {
//   console.log("Deleting all item 4...\n");
//   connection.query(
//     "DELETE FROM products WHERE ?",
//     {
//       product: "item4"
//     },
//     function(err, res) {
//       console.log(res.affectedRows + " products deleted!\n");
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }

// function readProducts() {
//   console.log("Selecting all products...\n");
//   connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     // Log all results of the SELECT statement
//     console.log(res);
//     connection.end();
//   });
// }
