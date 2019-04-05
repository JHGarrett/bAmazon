var mysql = require("mysql");
const cTable = require('console.table');
var inquirier = require("inquirer")

var connection = mysql.createConnection({
    hosts: "localhost",
    user: "root",
    password: "root",
    port: 8889,
    database: "bamazonDB"
})



function main(){
    connection.connect(function(err){
        if(err) throw error;
        mainMenu()
    })
}


function buyItems(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        let table = [];
        console.log(res[0]["item_id"])
        for(var i = 0; i < res.length; i++){
            table.push(
                {
                    item_id: res[i]["item_id"],
                    product_name: res[i]["product_name"],
                    department_name: res[i]["department_name"],
                    price: res[i]["price"],
                    stock_quantity: res[i]["stock_quantity"]
                }
            )
        }
        console.log(consoleTable.getTable(table))
        promptUser()
    })
}
// =======================================================================================================================

function mainMenu(){
    inquirier
        .prompt([
            {
                name:"options",
                message: "What would you like to do?",
                type:"list",
                choices:["Buy AN ITEM", "EXIT"]
            }
        ]).then(function(r){
            if(r.options === "EXIT"){
                console.log("GoodBye.")
                connection.end();
            }else{
                buyOption();
            }
        })
}


function promptUser(){
    inquirier
        .prompt([
            {
                name: "itemID",
                message: "Use the Item ID to select what you would like to buy.",
                validate(value){
                    return !isNaN(value) && value > 0
                }
            },
            {
                name: "amount",
                message: "How many many do you want?",
                validate(value){
                    return !isNaN(value) && value > 0
                }
            }
        ]).then(function(ans){
            isAvaiable(ans.itemID, ans.amount)
        })
}

function isAvaiable(id, amount){
    connection.query(`
    SELECT * FROM products WHERE ?`,
    {
        item_id: id
    },
    function(err, res){
        if(err) throw err;
        console.log(res)
        if(res[0]["stock_quantity"] >= amount){
            console.log("buying items " + amount);
            fullfilOrder(id, amount)
        }else{
            console.log("Insufficent quantity");
            mainMenu();
        }
    }

    )
}

function fullfilOrder(id, amount){
    connection.query(
        `SELECT stock_quantity, price FROM products WHERE ?`, [{
            item_id: id
        }], function(err,res){
            let price = res[0].price;
            let currentAmount = res[0].stock_quantity;
            currentAmount -= amount;
        
        connection.query(
            ` UPDATE products SET ? WHERE ?`,[{stock_quantity: currentAmount}, {item_id: id}], function(err,res){
                console.log("Thanks! Your total is $" + (parseInt(amount)*parseFloat(price) +"."));
                mainMenu();
            })
        
        }
        )
}

//Running main program
main();