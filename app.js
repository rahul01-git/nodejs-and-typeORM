//require
const express = require("express")
const todoRoutes = require("./routes/todo.routes")
const bodyParser = require("body-parser")
const getConnection = require("./config/db")

//init
const app = express()
let connection;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
getConnection().then(conn => {
    connection=conn;
  }).catch(error => {
    console.log(error);
  });

//middleware
app.use("/",(req,res,next)=>{
    req.conn = connection;
    next();
})

// routes
app.use("/",todoRoutes);

//server activation
app.listen(3000,()=>{
    console.log("server running in port 3000");
})