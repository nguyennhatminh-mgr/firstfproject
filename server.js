//npm init
//npm install express
//npm install body-parser
//npm install ejs
var express = require('express');
var bodyParser=require('body-parser');

var app = express();
var urlencodedParser=bodyParser.urlencoded({extended: false});

//Cau hinh ejs
app.set('view engine','ejs');
app.set('views','./views');

app.use(express.static(__dirname+"/css"));
app.use(express.static(__dirname+"/app"));

app.get('/access',(req,res)=>{
    res.render("index");
});

app.get('/chitiet',(req,res)=>{
    res.render('chitiet',{hovaten: "Nguyễn Nhật Minh"});
});

var sql = require("mssql");

// config for your database
var config = {
    user: 'sa',
    password: '123456',
    server: 'localhost', 
    database: 'Company' ,
    port: 1433
};

// const pool=new sql.ConnectionPool(config);
// pool.connect(err=>{
//     console.log(err);
// });

app.get('/dsemployee', function (req, res) {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from EMPLOYEE', function (err, recordset) {
            if (err) console.log(err);
            // send records as a response
            res.render("dsemployee",recordset);
            // res.send(recordset);
            sql.close();
        });
    });
    
});

app.get('/dsdepartment', function (req, res) {
    // connect to your database
    // sql.connect(config, function (err) {
    //     if (err) console.log(err);
    //     // create Request object
    //     var request = new sql.Request();
    //     // query to the database and get the records
    //     request.query('select * from Department', function (err, recordset) {
    //         if (err) console.log(err);
    //         // send records as a response
    //         res.render("dsemployee",recordset);
    //         // res.send(recordset);
    //     });
    // });

    sql.connect(config).then(pool => {
        return pool.request().query('select* from Employee');
    }).then(result =>{
        res.render('dsemployee',result);
    }).catch(err=>{
        console.log(err);
    });
});

app.get('/delete/:id',(req,res)=>{
    // sql.connect(config).then(pool => {
    //     return pool.request().query("delete from Employee where ssn="+req.params.id);
    // }).then(result =>{
        
    // }).catch(err=>{
    //     console.log(err);
    // });

    // const request=new sql.Request();
    // request.query("delete from Employee where ssn="+req.params.id).then(result=>{
    // // request.query("select* from Employee").then(result=>{
    //     console.log(result);
    // });

    sql.connect(config).then(pool => {
        return pool.request().query("delete from Employee where ssn="+req.params.id);
    }).then(result =>{
        // console.log(result);
        res.send(',h1>Successful</h1> <a href="/dsdepartment">Back to home</a>');
    }).catch(err=>{
        console.log(err);
    });
    
});

app.get('/hello',(req,res)=>{
    res.send("<h1>GETTING Hello Nguyễn Nhật Minh</h1>");
});

app.post('/hello',urlencodedParser,(req,res)=>{
    var u=req.body.username;
    var p=req.body.password;
    res.send("Username:"+u+"\n"+"Password:"+p);
});

app.get('/sanpham/:id',(req,res)=>{
    var id=req.params.id;
    res.send("Id of product is: "+id);
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});



