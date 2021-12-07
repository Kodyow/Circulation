const express = require('express');
const app = express();
const db = require('./connection');
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Listening on ${port}`));


app.use(express.json());
app.use(cors())



app.post('/auth/register', (req,res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const phone = req.body.phone
    db.query(
        "INSERT INTO USERS (User_ID,User_Name,Password,Email,Phone_Number) VALUES (100,?,?,?,?)",
        [username,password,email,phone],
        (err,result)=> {
            if(err) {
                console.log({err: err});
            }
        }
    );
});

app.post('/auth/login', (req,res) => {
    const username = req.body.username
    const password = req.body.password
    db.query(
        "SELECT * FROM USERS WHERE User_Name = ?;",
        username,
        (err,result)=> {
            if(err) {
                console.log({err: err});
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: "Wrong username/password."});
            }
        }
    );
});

app.get('/',function(req,res){
    var post  = {from:'me', to:'you', msg:'hi'};
    db.query('SELECT * FROM USERS LIMIT 1', function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
      console.log('The solution is: ', rows)
    });
});