/* what server file does?
Think of it like the brain of your backend:

Start server
app.listen() or server.listen()
Handle routes
/login, /signup, /posts
Connect database
MongoDB / MySQL connection
Middleware setup
JSON parsing, auth, logging
API endpoints
GET, POST, PUT, DELETE

Callback = “call this function later when work is done”
function greet(name, callback) {
    console.log("Hello " + name);
    callback();   // calling the callback
}

function sayBye() {
    console.log("Goodbye!");
}

greet("Yash", sayBye);
🔸 Output:
Hello Yash
Goodbye!*/

// import express module
const express=require('express');

// initialize express application
const app=express();

const db=require('./db');
const bodyParser=require('body-parser');
app.use(bodyParser.json());
const Person=require('./models/Person');
const MenuItem=require('./models/Menu');  
const personRoutes=require('./routes/personRoutes'); 
const menuRoutes=require('./routes/menuRoutes'); 
// app.use('/menu',MenuItem); // Removed as it was wrong and redundant with routes below

// define a port number(e.g. 3001)
const PORT=3001;

//DEFINE A simple route for the root URL('/')
app.get('/',(req,res)=>{
    res.send("Hello Your Server Is Running.");
});

app.use('/',personRoutes);
app.use('/',menuRoutes);


// start the server and listen for incoming requests
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});
