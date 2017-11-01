var mysql = require('mysql');
var http = require('http')
var fs = require('fs');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "calculadora"
});


con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT o.Op1,o.Op2,op.Operacion," +
        "o.Resultado FROM operaciones o, operacion op  WHERE o.Operacion = op.Id ORDER BY o.Id " +
        "DESC  LIMIT 4", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    var sql = " INSERT INTO `operaciones` (`Op1`, `Op2`, `Operacion`, `Resultado`) VALUES ('0', '0', '1', '0')";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});

