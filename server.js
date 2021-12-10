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
        expires: 1000* 60 * 60 * 24,
      },
    })
  );

app.post('/groups/new', (req,res) => {
    const groupName = req.body.groupName
    const description = req.body.description
    const tag = req.body.tag
    const visibility = req.body.visibility
    db.query(
        "INSERT INTO SOCIAL_GROUP (Group_name,Description,Visibility,Tag) VALUES (?,?,?,?)",
        [groupName,description,visibility,tag],
        (err,result)=> {
            if(err) {
                console.log({err: err});
            } else {
                res.send({message: "created"});
            }
        }
    );
});

app.get('/groups/new', (req,res) => {
    db.query(
        "SELECT Tag_ID as 'ID', Tag_Name as 'name' FROM GROUP_TAG GT",
        (err,result)=> {
            if(err) {
                console.log({err: err});
            }
            
            if (result.length > 0) {
                console.log(result)
                res.send(result);
            } else {
                res.send({message: "No Tags."});
            }
        }
    );
});

app.post('/auth/register', (req,res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const phone = req.body.phone
    db.query(
        "INSERT INTO USERS (User_Name,Password,Email,Phone_Number) VALUES (?,?,?,?)",
        [username,password,email,phone],
        (err,result)=> {
            if(err) {
                console.log({err: err});
            } else {
                res.send({message: "created"});
            }
        }
    );
});

app.get("/", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
});

app.post('/auth/login', (req,res) => {
    const username = req.body.username
    const password = req.body.password
    db.query(
        "SELECT U.User_ID as ID, U.User_Name as name, U.Password FROM USERS U WHERE User_Name = ? AND Password = ?;",
        [username,password],
        (err,result)=> {
            if(err) {
                console.log({err: err});
            }
            if (result.length > 0) {
                if(password === result[0],password) {
                    console.log(result);
                    req.session.user = result;
                    console.log(req.session.user);
                    res.send(true);
                }
                else 
                {
                    res.send({message: "Wrong username or password."});
                }
                
            } else {
                res.send({message: "No such user"});
            }
        }
    );
});



app.get('/profile/:id', (req,res)=> {
    const UserID = req.params.id
    db.query(
        `SELECT U.User_ID as ID, SG.Group_ID as GroupID, U.User_Name as Name, U.Email, U.Phone_Number as Phone, U.Join_Date as Date, SG.Group_name as GroupNM, UG1.Reputation
        FROM USERS U
        left JOIN PARTICIPATES_IN UG1 ON U.User_ID = UG1.User_ID 
        Left JOIN SOCIAL_GROUP SG ON SG.Group_ID = UG1.Group_ID
        WHERE UG1.Reputation IS NULL OR UG1.Reputation > 
            (SELECT AVG(UG2.Reputation)
            FROM PARTICIPATES_IN UG2
            WHERE UG1.Group_ID = UG2.Group_ID)
        AND U.User_ID = ?;`,
        UserID,
        (err,result)=> {
            console.log(result);
            if(err) {
                console.log({err: err});
            }
            if (result) {
                res.send(result);
            } else {
                res.send({message: "No User with ID."});
            }
        }
    );
});

app.get('/groups/:id', (req,res) => {
    const groupID = req.params.id
    db.query(
        `SELECT Group_ID as ID,Group_name as Name,Description,GT.Tag_Name as Tag,Visibility, Group_Added_Date as Date
        from SOCIAL_GROUP SG
        JOIN GROUP_TAG GT on GT.Tag_ID = SG.Tag
        where SG.GROUP_ID = ? ;`,
        [groupID],
        (err,result)=> {
            console.log(result);
            if(err) {
                console.log({err: err});
            }
            if (result) {
                res.send(result);
            } else {
                res.send({message: "No Group with ID."});
            }
        }
    );
});

app.post('/groups/:id/role', (req,res) => {

    const role = req.body.role
    const groupID = req.params.id
    db.query(
        `SELECT USERS.User_ID as "ID", USERS.User_Name, PARTICIPATES_IN.User_Added_Date AS "Join Date", PARTICIPATES_IN.Reputation
        FROM PARTICIPATES_IN 
        JOIN SOCIAL_GROUP ON SOCIAL_GROUP.Group_ID = PARTICIPATES_IN.Group_ID
        JOIN USERS ON PARTICIPATES_IN.User_ID =  USERS.User_ID
        WHERE PARTICIPATES_IN.Role like ? AND SOCIAL_GROUP.Group_ID = ?;`,
        ['%'+role+'%',groupID],
        (err,result)=> {
            if(err) {
                console.log({err: err});
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: "No Users In Role."});
            }
        }
    );
});


app.get('/groups', (req,res) => {
    db.query(
        `SELECT SG.Group_ID as 'ID',SG.Group_name as 'Group Name',SG.Description,GT.Tag_Name as 'Tag', SG.Visibility,count(PI.User_ID) as 'count'
        FROM SOCIAL_GROUP SG 
        JOIN GROUP_TAG GT ON GT.Tag_ID = SG.Tag
        LEFT JOIN PARTICIPATES_IN PI ON PI.Group_ID = SG.Group_ID 
        where Visibility in ('Protected','Public')
Group by SG.Group_ID,SG.Group_name,SG.Description,GT.Tag_Name`,
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


app.post('/groups', (req,res) => {
    const search = req.body.search
    const visibility = req.body.visibility
    const order = req.body.order
    console.log(visibility);
    if (visibility.length > 0) {
        db.query(
            `SELECT SG.Group_ID as 'ID',SG.Group_name as 'Group Name',SG.Description,GT.Tag_Name as 'Tag', SG.Visibility,count(PI.User_ID) as 'count'
            FROM SOCIAL_GROUP SG 
            JOIN GROUP_TAG GT ON GT.Tag_ID = SG.Tag
            LEFT JOIN PARTICIPATES_IN PI ON PI.Group_ID = SG.Group_ID 
            where Visibility in (?) and Group_name like ?
            Group by SG.Group_ID,SG.Group_name,SG.Description,GT.Tag_Name
            ORDER BY ?`,
            [visibility,'%'+search+'%',order],
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
    } else {
        db.query(
            `SELECT SG.Group_ID as 'ID',SG.Group_name as 'Group Name',SG.Description,GT.Tag_Name as 'Tag', SG.Visibility,count(PI.User_ID) as 'count'
            FROM SOCIAL_GROUP SG 
            JOIN GROUP_TAG GT ON GT.Tag_ID = SG.Tag
            LEFT JOIN PARTICIPATES_IN PI ON PI.Group_ID = SG.Group_ID 
            where Visibility in ('Public','Protected') and Group_name like ?
            Group by SG.Group_ID,SG.Group_name,SG.Description,GT.Tag_Name
            ORDER BY ?`,
            ['%'+search+'%',order],
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
    }
});


app.get('/calendar', (req,res) => {
    db.query(
        `SELECT Event_Name, Location, Start_Date_Time, End_Date_Time, Details, Repeats_When, User_Name, Group_Name
        FROM EVENTS,USERS,SOCIAL_GROUP
        WHERE USERS.User_ID = EVENTS.User_ID`,
        (err,result)=> {
            if(err) {
                console.log({err: err});
            }
            
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({message: "No Events."});
            }
        }
    );
});

app.post('/calendar', (req,res) => {
    const eventName = req.body.eventName
    const startDate = req.body.startDate
    const endDate = req.body.endDate
    const details = req.body.details
    const hostID = req.body.userID
    const location = req.body.location
    const groupID = req.body.groupID
    const dateTime = req.body.dateTime
    const repeats = req.body.repeats
    const repeatsWhen = req.body.repeatsWhen
    console.log(visibility);
    if (visibility.length > 0) {
        db.query(
            `INSERT INTO EVENTS (Event_Name, Start_Date_Time, End_Date_Time, Details, Host_User_ID, Location, Group_ID, Date_Created, Repeats, Repeats_When, Cancelled)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?),`,
            [eventName,startDate,endDate,details,hostID,location,groupID,dateTime,repeats,repeatsWhen],
            (err,result)=> {
                if(err) {
                    console.log({err: err});
                }     
                if (result.length > 0) {
                    res.send(result);
                    
                } else {
                    res.send({message: "No Events."});
                }
            }
        );
    }
});

/**
 * query 10 from phase 2: 
 * Purpose: Determine the number of group members who 
 * have accepted the event, cancelled, and have not responded.
 * 
 * Expected:A table containing the data for all events displaying 
 * the number of members who accepted the event, cancelled the event, 
 * or did not respond. If the value was null or not a zero was returned.
 * 
 * send server response to the frontend.
 */
app.get('/', (req,res) => {
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



