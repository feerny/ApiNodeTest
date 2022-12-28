const mysql=require('mysql')

const mysqlConecction=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'company'
})

mysqlConecction.connect(function(err){
    if (err) {
        console.log(err);
        return;
    }
    else{
        console.log("conectado");
    }
});

module.exports = mysqlConecction;