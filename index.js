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

//connection to db
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "instagram",
    password: "selva123",
    port: 5432
  });
console.log("Successful connection to the database");


//creating table in db
const sql_create = `CREATE TABLE IF NOT EXISTS Users (
    moboremail TEXT,
    fname TEXT,
    uname TEXT,
    pass TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    bio TEXT,
    gender TEXT,
    profile TEXT,
    posts TEXT,
    fav TEXT
  );`;
  
  pool.query(sql_create, [], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful creation of the 'USERS' table");
  });


  //updating a record
  // var posts="[{\"id\": \"3\",\"path\": [{\"id\": 1,\"title\": \"https://assets.ajio.com/medias/sys_master/root/hdf/h3d/15562852106270/-473Wx593H-4914911230-multi-MODEL.jpg\"}],\"comment\": \"cutieee\",\"likes\": \"0\",\"date\": \"2020-10-8 12:0:14\"}, {\"id\": \"5\",\"path\": [{\"id\": \"2\",\"title\": \"https://www.ikea.com/in/en/images/products/smycka-artificial-flower-rose-red__0903311_PE596728_S5.JPG\"}],\"comment\": \"flowers\",\"likes\": \"0\",\"date\": \"2020-10-8 12:39:31\"}]"
  // console.log(posts)
  // var update_sql="UPDATE Users set posts= '" + posts + "' WHERE moboremail='9500878566'"
  // pool.query(update_sql, [], (err, result) => {
  //   if (err) {
  //     return console.error(err.message);
  //   }
  //  console.log("updated");
  // });




//server connection
app.listen(3000, () => { 
  console.log("Server started (http://localhost:3000/ ) !");
});

app.get("/", (req, res) => { 
res.send("hello world");
});


//inserting records of new user
app.post('/saveuser',(req,res)=>{
response = {  
    users:req.body  
};  
var moboremail,fname,uname,pass,profile,gender,bio,website,posts,fav,email,phone;
req.body.forEach(k=>{
  moboremail=k.moboremail;
  fname=k.fname;
  uname=k.uname;
  pass=k.pass;
  profile=k.profile;
  gender=k.gender;
  bio=k.bio;
  website=k.website;
  posts=k.posts;
  fav=k.fav;
  email=k.email;
  phone=k.phone;
})

const sql_insert = `INSERT INTO Users (moboremail, fname, uname, pass, phone, email, website, bio, gender, profile, posts, fav) VALUES ('${moboremail}','${fname}','${uname}','${pass}','${phone}','${email}','${website}','${bio}','${gender}','${profile}','${posts}','${fav}')ON CONFLICT DO NOTHING;`;
pool.query(sql_insert, [], (err, result) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("created")
});
res.end(JSON.stringify(response));  
})

//get particluar user
app.get('/getuser/:moboremail', (req, res) => {
  let ma=req.params.moboremail;
  let final;
  const sql = "SELECT * FROM Users WHERE moboremail= '" + ma + "'";
  pool.query(sql, [], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    result.rows.forEach(r=>{
      final=r;
    })
    // console.log(final)
    res.json(final);
  });
});


//get posts
app.get('/getpost', (req, res) => {
  const sql = "SELECT * FROM Users";
  pool.query(sql, [], (err, result) => {
    if (err) {
      return console.error(err.message);
    }
    // console.log(result.rows);
    res.json(result.rows);
  });
});


//post changes
app.post('/like/:email',(req,res)=>{
  response = {  
    users:req.body  
};
var p=JSON.stringify(req.body);
var ma=req.params.email
var update_sql="UPDATE Users set posts= '" + p + "' WHERE moboremail='"+ ma + "'"
pool.query(update_sql, [], (err, result) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("updated");
});
res.end(JSON.stringify(response));  
})


//change password
app.post('/changepass/:email',(req,res)=>{
  response = {  
    users:req.body  
};
let npass;
req.body.forEach(k=>{
  npass= k.pass
})
var email=req.params.email
var update_pass="UPDATE Users set pass= '" + npass + "' WHERE moboremail='"+ email + "'"
pool.query(update_pass, [], (err, result) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("updated");
});
res.end(JSON.stringify(response));  
})

//change poto
app.post('/changepoto/:email',(req,res)=>{
  response = {  
    users:req.body  
};
let npro;
req.body.forEach(k=>{
  npro= k.url
})
var email=req.params.email
var update_pro="UPDATE Users set profile= '" + npro + "' WHERE moboremail='"+ email + "'"
pool.query(update_pro, [], (err, result) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("updated");
});
res.end(JSON.stringify(response));  
})

//edit details
app.post('/edit/:email',(req,res)=>{
  response = {  
    users:req.body  
};  
let nfname,nuname,nphone,nemail,nwebsite,nbio,ngender;
req.body.forEach(k=>{
 nfname= k.fname;
 nuname= k.uname;
 nphone= k.phone;
 nemail= k.email;
 nwebsite= k.website;
 nbio= k.bio;
 ngender= k.gender;
})
var emailn=req.params.email
var update_edit="UPDATE Users SET fname= '" + nfname + "',uname= '" + nuname + "',phone= '" + nphone + "',email= '" + nemail + "',website= '" + nwebsite + "',bio= '" + nbio + "',gender= '" + ngender + "' WHERE moboremail='"+ emailn + "'"
pool.query(update_edit, [], (err, result) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("updated");
});
res.end(JSON.stringify(response));  
})