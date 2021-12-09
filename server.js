const express = require('express');
const db = require('./connection');
const cors = require('cors')

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = process.env.PORT || 5000;

const app = express();
app.listen(port,() => console.log(`Listening on ${port}`));


app.use(express.json());
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
      key: "user",
      secret: "All",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24,
      },
    })
  );

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
        "SELECT * FROM USERS WHERE User_Name = ? AND Password = ?;",
        [username,password],
        (err,result)=> {
            if(err) {
                console.log({err: err});
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: "Wrong username or password."});
            }
        }
    );
});

app.get('/groups', (req,res) => {
    db.query(
        `SELECT SG.Group_ID as 'ID',SG.Group_name as 'Group Name',SG.Description,GT.Tag_Name as 'Tag' FROM SOCIAL_GROUP SG JOIN GROUP_TAG GT ON GT.Tag_ID = SG.Tag WHERE Visibility = 'Public';`,
        (err,result)=> {
            if(err) {
                console.log({err: err});
            }
            
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: "No Groups."});
            }
        }
    );
});


/**
 * query 10 from pahse 2: 
 * Purpose: Determine the number of group members who 
 * have accepted the event, cancelled, and have not responded.
 * 
 * Expected:A table containing the data for all events displaying 
 * the number of members who accepted the event, cancelled the event, 
 * or did not respond. If the value was null or not a zero was returned.
 * 
 * send server response to the frontend.
 */
app.get('/groups', (req,res) => {
    db.query(
        `Select
            E.Event_ID,
            E.Event_Name,
            ifnull(ACCEPT_COUNT.Accept_Count,0) AS "Number of Members Accpected",
            ifnull(CANCEL_COUNT.Cancel_Count,0) AS "Number of Members Canceled",
            ifnull(NO_REPONSE.No_Response_Count,0) AS "Number of Members No Reply"
        FROM EVENTS E
        LEFT JOIN (
            SELECT EU.Event_ID,E.Event_Name, count(EU.USER_ID) AS Accept_Count
            FROM ATTENDS EU
            JOIN EVENTS E ON E.Event_ID = EU.Event_ID
            WHERE Accepted_Invite = 1
            GROUP BY EU.Event_ID
        ) ACCEPT_COUNT ON  ACCEPT_COUNT.Event_ID = E.Event_ID
        LEFT JOIN (
            SELECT EU.Event_ID,E.Event_Name, count(EU.USER_ID) AS Cancel_Count
            FROM ATTENDS EU
            JOIN EVENTS E on E.Event_ID = EU.Event_ID
            WHERE Accepted_Invite = 0
            GROUP BY EU.Event_ID
        ) CANCEL_COUNT ON  CANCEL_COUNT.Event_ID = E.Event_ID
        LEFT JOIN (
            SELECT E.Event_ID,E.Event_Name,count(UG.User_ID) AS No_Response_Count
            FROM PARTICIPATES_IN UG 
            LEFT JOIN EVENTS E ON E.Group_ID = UG.Group_ID
            LEFT JOIN ATTENDS EU ON EU.Event_ID = E.Event_ID AND UG.User_ID = EU.User_ID
            WHERE EU.User_ID IS NULL AND E.Event_ID IS NOT NULL
            GROUP BY E.Event_ID
        ) NO_REPONSE ON NO_REPONSE.Event_ID = E.Event_ID;`,
        (err,result)=> {
            if(err) {
                console.log({err: err});
            }
            
            if (result.length > 0) {
                console.log(result);
                res.send(result);
            } else {
                res.send({message: "No Event Data."});
            }
        }
    );
});    

app.get("/",(req, res) => {
    if (req.session.user) 
    {
        res.send({ loggedIn: true, user: req.session.user });
    } 
    else 
    {
        res.send({ loggedIn: false });
    }
});



