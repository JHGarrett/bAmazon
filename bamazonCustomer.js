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
