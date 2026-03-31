// do here database connection
const mongoose=require("mongoose");

// define mongo db connection url
const mongoURL="mongodb://localhost:27017/motel";// motel is databse name 

// set up mongoDB connection
mongoose.connect(mongoURL);
// get default connection
// Mongoose maintain a default connection object representing the MongoDB connection
const db = mongoose.connection;

db.on("connected",()=>{   
    console.log("connected to MongoDB");
});

db.on("error",(err)=>{
    console.log("error connecting to MongoDB",err);
});

db.on("disconnected",()=>{
    console.log("disconnected from MongoDB");
});

module.exports=db;
