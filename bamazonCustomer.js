var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var table = new Table({
    head:['ID', 'Product Name', 'Price', 'Stock QTY']
    , colWidtghs: [100,700,300,300]
});

var port = 3333;
var http = require("http");
var divider = "=========================================================================";

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    // console.log("we here")
    if (err) throw err;
     printproduct();
});

// print products function
function printproduct() {
    connection.query("SELECT * FROM products", function(err,res){
        if (err) throw err;
        for (i =0; i <  res.length; i++) {
            // console.log('Id: ' + res[i].item_id ) 
            // console.log('Product Name: ' + res[i].product_name );
            // console.log('Price: ' + res[i].price )  
            // console.log('Stock QTY: ' + res[i].stock_quantity )
            // console.log(divider); 
            table.push([res[i].item_id,res[i].product_name,"$"+res[i].price+".00",res[i].stock_quantity])
          
        }
        console.log(table.toString());
        productSelection();
    })
}
//select products function
function productSelection(){
    inquirer.prompt([
        {
            name: "itemID",
            type: "input",
            message: "Please enter the Item ID for your desired product: "

        }
        ,
        {
            name: "qty",
            type: "input",
            message: "How Many Would You Like To Purchase?"
        }
    ]).then(function(response){
        var userChoice = response.itemID;
        var quantity =response.qty;
        processPurchase(userChoice, quantity);
    })
}

//process the purchase function
function processPurchase(userChoice, quantity){
connection.query('SELECT * FROM products WHERE item_id=?', [userChoice], function(err, res){
if(err) throw err;
var total;
var currentStock;
if(quantity< res[0].stock_quantity){
    currentStock = res[0].stock_quantity - quantity;
    updateDatabase(userChoice, currentStock);
    total = quantity * res[0].price;
    console.log('Your total is: $' + total +".00")
    console.log('Thank You For Shopping With Bamazon!')
    console.log(divider)
    console.log(divider)
    keepshopping();
    // productSelection();
}else{
    console.log(divider)
    console.log('Insufficient inventory  -- Please adjust your Quantity!')
    console.log(divider)
    productSelection();
}
})
}
//update database function
function updateDatabase(userChoice, currentStock){
connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [currentStock,userChoice], function(err, res){
    if(err) throw err;
    // console.log(res)
  
})
}


function keepshopping() {
    inquirer.prompt([
        {
            name: "continueShopping",
            type: "confirm",
            message: "Would You Like To Keep Shopping? "

        }
    ]).then(function(response){
        var shop = response.continueShopping;
        
    if(shop){
        printproduct();
        
    }
    if(!shop){
        console.log("Thanks For Your Purchase and Have a Wonderful Day!");
    }
})
};