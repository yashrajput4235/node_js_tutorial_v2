const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

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
    },
    username:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    }
    
});
personSchema.pre('save',async function(next){
    const person=this;
    if(!person.isModified('password')) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        person.password=await bcrypt.hash(person.password,salt);
        next();
    }catch(err){
        next(err);
    }
});
personSchema.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password);
}

// on the basis of person schema create a model here we do all the crud command
const Person=mongoose.model('Person',personSchema);

// export the model
module.exports=Person;