const express = require("express");
const path = require("path");
const app = express();
const cors=require('cors');
const { Pool } = require("pg");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
var bodyParser = require('body-parser');  
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  
app.use(express.static('public'));  
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRoute= require("./routes/user");

app.use(userRoute);

//server connection
app.listen(3000, () => { 
  console.log("Server started (http://localhost:3000/ ) !");
});

