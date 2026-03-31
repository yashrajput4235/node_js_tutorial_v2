const mongoose=require("mongoose");

// cretate a databse schema here

//define Person schema
const personSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    age:{
        type: Number,
        
    },
    work:{   // ❌ missing colon fixed
        type: String,
        enum:['chef','waiter','manager','owner'],
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobile:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true,
    },
    salary:{
        type: Number,
        required:true   // ❌ 'require' → 'required'
    }
    
});

// on the basis of person schema create a model here we do all the crud command
const Person=mongoose.model('Person',personSchema);

// export the model
module.exports=Person;