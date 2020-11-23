var sequelize = require("sequelize")
const db = require('./../config/database')
// const instausr=require('./../models/instausr');

const getuser = async(req, res) => {
    let ma=req.params.moboremail;
    let final;
    const sql = "SELECT * FROM Users WHERE moboremail= '"+ma+"'";
    db.sequelize.query(sql)
    .then((results) => {
      results.forEach(r=>{
          final=r.rows;
        })
      res.json(final[0]);
    });
};

const getpost=async(req,res)=>{
  const sql = "SELECT * FROM Users";
  db.sequelize.query(sql)
    .then((results) => {
     res.json(results[0])
    });
};

const like=async(req,res)=>{
  response = {  
      users:req.body  
  };
  var p=JSON.stringify(req.body);
  var ma=req.params.email
  var update_sql="UPDATE Users set posts= '" + p + "' WHERE moboremail='"+ ma + "'"
  db.sequelize.query(update_sql);
  res.end(JSON.stringify(response));  
};

const saveuser=async(req,res)=>{
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
  db.sequelize.query(sql_insert);
  res.end(JSON.stringify(response));  
};

const changepass=async(req,res)=>{
  response = {  
      users:req.body  
  };
  let npass;
req.body.forEach(k=>{
  npass= k.pass
})
var email=req.params.email
var update_pass="UPDATE Users set pass= '" + npass + "' WHERE moboremail='"+ email + "'"
db.sequelize.query(update_pass);
res.end(JSON.stringify(response));  
};

const changepoto=async(req,res)=>{
  response = {  
      users:req.body  
  };
  let npro;
  req.body.forEach(k=>{
    npro= k.url
  })
  var email=req.params.email
  var update_pro="UPDATE Users set profile= '" + npro + "' WHERE moboremail='"+ email + "'"
db.sequelize.query(update_pro);
res.end(JSON.stringify(response));  
};
const edit=async(req,res)=>{
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
db.sequelize.query(update_edit);
res.end(JSON.stringify(response));  
};


module.exports = {
  getuser,
  getpost,
  like,
  saveuser,
  changepass,
  changepoto,
  edit
};