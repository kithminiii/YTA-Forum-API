const express = require("express");
const mysql = require('mysql');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const moment = require('moment');
const { response, request } = require("express");
const cors = require('cors');


const router = express.Router();

const app = express();
const port = 8090;
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: "3306",
    database: "Forum"
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, function(){
    console.log('Server is listening on ' + port)
})

app.use(cors());

con.connect(function(err) {
    if (err) throw err;
    console.log("Database is connected!");
});

// Authentication

//Login
app.post('/auth/login', (request, response) => {
    if (request.body.userName && request.body.password) {
            var userName = request.body.userName;
            var password = request.body.password;
            var query = `SELECT * FROM users WHERE userName = "${userName}" LIMIT 1`;
            con.query(query, async function (error, data) {
                if(data.length == 0){
                    response.json({
                        status:0,
                        message: "User doesn't exist."
                    })
                }else{
                    var hashedPassword = data[0].password;
                    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
                    if(isPasswordMatch){
                        response.json({
                            status: 1,
                            message: "Logged in.",
                            userName: userName
                        })
                    }else{
                        response.json({
                            status:0,
                            message:"Login Failed"
                        })
                    }
                }
            });

        }else {
            response.json({
                status: 0,
                message: "Required fields are missing."})
        }
});

// Register
app.post("/auth/register",async (request,response)=>{
    if(request.body.userName && request.body.firstName && request.body.lastName && request.body.email && request.body.password){
        var userName = request.body.userName;
        var firstName = request.body.firstName;
        var lastName = request.body.lastName;
        var email = request.body.email;
        var hashedPassword = await bcrypt.hash(request.body.password,10);

        //check wether user already exist or not
        var query = `SELECT * FROM users WHERE userName = "${userName}" LIMIT 1`;        
        con.query(query, function(error,data){
            if(data.length == 0){
                //Insert data to the database
                var query = `INSERT INTO users (userName,firstName,lastName,email,password) VALUES ('${userName}','${firstName}', '${lastName}','${email}','${hashedPassword}');`
                con.query(query, function(error,result){
                    if(error) throw error;
                    response.json({
                        status: 1,
                        message: "Registration Sucess"
                    })
                });
            }else{
                response.json({
                    status:0,
                    message:"Data already exists"
                })
            }
        })

    }else{
        response.json({
            status:0,
            message: "Required fields are missing"
        })
    }
})


//Post Management

//Post Create
app.post('/posts/create',(request,response)=>{
    if(request.body.title && request.body.description && request.body.isDraft != undefined  ){
        var title = request.body.title;
        var description = request.body.description;
        var isDraft = request.body.isDraft;
        var createdDate = moment().format('yyyy-MM-DD hh:mm:ss');

        var query = `SELECT * FROM posts WHERE title = "${title}" `;
        con.query(query,function(error,data){
            if(data && data.length == 0){
                var query = `INSERT INTO posts (title,description,isDraft,createdDate) VALUES ('${title}','${description}', '${isDraft}','${createdDate}');`;
                con.query(query, function(error,result){
                    if(error) throw error;
                    response.json({
                        status: 1,
                        message: "Sucessfully posted"
                    })
                });
                    
            }else{
                response.json({
                    status:0,
                    message: "Already Exists"
                })
            }
        });
    }else{
        response.json({
            status:0,
            message: "Required fields are missing"
        })
    }
});

//Post Read-Get All
app.get('/posts/all',(request,response)=>{

        // var query = `SELECT p.* , u.userName FROM users u INNER JOIN posts p ON u.userId = p.createdBy WHERE p.isDraft = 0 `;
        var query = `SELECT * FROM posts`
        con.query(query,function(error,data){
            if(error) throw error;
            response.json(data)
        }) 
})


//Post Read -Using Id
app.post('/posts/single',(request,response)=>{
     if (request.body.postId) {
       var postId = request.body.postId;
       console.log(postId)
    var query = `SELECT * FROM posts WHERE postId = "${postId}" LIMIT 1`;
    con.query(query,function(error,data){
         if(error) throw error;
         response.json(data)
    })
}
})


//Post Update
app.post('/posts/update',(request,response)=>{
    if(request.body.title && request.body.description && request.body.image && request.body.isDraft && request.body.createdBy ){
        var title = request.body.title;
        var description = request.body.description;
        var isDraft = request.body.isDraft;
        var createdBy = request.body.createdBy;
        var image = request.body.image;
        var createdDate = moment().format('yyyy-MM-DD hh:mm:ss');

    var query = `UPDATE posts SET title="${title}, description="${description}, isDraft="${isDraft}, createdBy="${createdBy},image="${image}" WHERE postId=${postId}`;
    con.query(query,function(error,data){
        if(error) throw error;
        response.json({
            status:0,
            message:"Error occured"
        })
    }); 
    }else{
        response.json({
            status:1,
            message:"Updated Sucessfully"
        })
    }
});

//Post Delete
app.delete('/posts/delete',(request,response)=>{
    if(request.body.title && request.body.description && request.body.image && request.body.isDraft && request.body.createdBy ){
        var title = request.body.title;
        var description = request.body.description;
        var isDraft = request.body.isDraft;
        var createdBy = request.body.createdBy;
        var image = request.body.image;
        var createdDate = moment().format('yyyy-MM-DD hh:mm:ss');

    var query = `DELETE posts SET title="${title}, description="${description}, isDraft="${isDraft}, createdBy="${createdBy}, image="${image}" WHERE postId=${postId}`;
    con.query(query,function(error,data){
        if(error) throw error;
        response.json({
            status:0,
            message:"Error occured"
        })
    }); 
    }else{
        response.json({
            status:1,
            message:"Deleted Sucessfully"
        })
    }
});


//Comment Management

//Comment Create
app.post('/comments/create',(request,response)=>{
    if(request.body.comment  && request.body.postId ){
        var comment = request.body.comment;
        var commentedDate = request.body.commentedDate;
        var postId = request.body.postId;
        var commentedDate = moment().format('yyyy-MM-DD hh:mm:ss');

                var query = `INSERT INTO comments (comment,commentedDate,postId) VALUES ('${comment}','${commentedDate}','${postId}');`;
                console.log(query)
                con.query(query, function(error,result){
                    if(error) throw error;
                    response.json({
                        status: 1,
                        message: "Sucessfully Commented"
                    })
                });             
              
    }else{
        response.json({
            status:0,
            message: "Required fields are missing"
        })
    }
});

//Comment Read
app.post('/comments/all',(request,response)=>{
    if(request.body.postId){
        var postId = request.body.postId;    
    var query = `SELECT * FROM comments WHERE postId = "${postId}"`
    con.query(query,function(error,data){
        if(error) throw error;
        response.json(data)
    })
    }
})

//Comment Update
app.post('/comments/update',(request,response)=>{
    if(request.body.comment && request.body.commentedBy && request.body.postId ){
        var comment = request.body.comment;
        var commentedDate = request.body.commentedDate;
        var commentedBy = request.body.commentedBy;
        var postId = request.body.postId;
        var commentedDate = moment().format('yyyy-MM-DD hh:mm:ss');

    var query = `UPDATE comments SET comment="${comment}, commentedBy="${commentedBy}, postId="${postId}" WHERE commentId=${commentId}`;
    con.query(query,function(error,data){
        if(error) throw error;
        response.json({
            status:0,
            message:"Error occured"
        })
    }); 
    }else{
        response.json({
            status:1,
            message:"Updated Sucessfully"
        })
    }
});

//Comment Delete
app.delete('/comments/delete',(request,response)=>{
    if(request.body.comment && request.body.commentedBy && request.body.postId ){
        var comment = request.body.comment;
        var commentedDate = request.body.commentedDate;
        var commentedBy = request.body.commentedBy;
        var postId = request.body.postId;
        var commentedDate = moment().format('yyyy-MM-DD hh:mm:ss');

    var query = `DELETE comments SET comment="${comment}, commentedBy="${commentedBy}, postId="${postId}" WHERE commentId=${commentId}`;
    con.query(query,function(error,data){
        if(error) throw error;
        response.json({
            status:0,
            message:"Error occured"
        })
    }); 
    }else{
        response.json({
            status:1,
            message:"Deleted Sucessfully"
        })
    }
});



app.use("/",router)

