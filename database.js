const mysql =require('mysql')

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_product"
})




module.exports = conn