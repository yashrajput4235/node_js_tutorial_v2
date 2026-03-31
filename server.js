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
const Person=require('./Person');
const MenuItem=require('./Menu');   
// app.use('/menu',MenuItem); // Removed as it was wrong and redundant with routes below

// define a port number(e.g. 3001)
const PORT=3001;

//DEFINE A simple route for the root URL('/')
app.get('/',(req,res)=>{
    res.send("Hello Your Server Is Running.");
});

app.post('/person',async (req,res)=>{
    try{
        const data=req.body// assigning the request body conatin the prerson data
        // create a new person document using the Person model
        const newPerson = new Person(data);
        
        // save the new person document to the database
        const response = await newPerson.save();
        console.log("person saved successfully");
        res.status(200).json(response);
    }
    catch(err){
        console.log("error saving person",err);
        res.status(500).json({error:'internal server error'});
    }
})
// get method is used to get the person data
app.get('/person',async(req,res)=>{
    try{
        const data=await Person.find();
        console.log("person data fetched successfully");
        res.status(200).json(data);
    }
    catch(err){
        console.log("error fetching person data",err);
        res.status(500).json({error:'internal server error'});
    }
});
// now menu routes
app.post('/menu',async(req,res)=>{
    try{
        const data=req.body;
        const newMenuItem=new MenuItem(data);
        const response=await newMenuItem.save();
        console.log("menu item saved successfully");
        res.status(200).json(response);
    }
    catch(err){
        console.log("error saving menu item",err);
        res.status(500).json({error:'internal server error'});
    }
}); 
app.get('/menu',async(req,res)=>{
    try{
        const data=await MenuItem.find();
        console.log("menu item fetched successfully");
        res.status(200).json(data);
    }
    catch(err){
        console.log("error fetching menu item",err);
        res.status(500).json({error:'internal server error'});
    }
});


// start the server and listen for incoming requests
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
});
