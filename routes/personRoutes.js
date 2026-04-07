const express=require('express');
const router=express.Router();
const Person=require('./../models/Person');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');
router.post('/',async (req,res)=>{
    try{
        const data=req.body// assigning the request body conatin the prerson data
        // create a new person document using the Person model
        const newPerson = new Person(data);
        
        // save the new person document to the database
        const response = await newPerson.save();
        console.log("person saved successfully");
        // generate token
        const payload={
            id:response.id,
            username:response.username
        }
        const token=genrateToken(payload);
        res.status(200).json({response:response,token:token});
    }
    catch(err){
        console.log("error saving person",err);
        res.status(500).json({error:'internal server error'});
    }
})
// get method is used to get the person data
router.get('/',jwtAuthMiddleware,async(req,res)=>{
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
//parameterized api: the url will contain the parameter
router.get('/:workType',async(req,res)=>{
    try{
        const workType=req.params.workType;
        if(workType=='chef  '||workType=='waiter'||workType=='manager'||workType=='owner'){
            const response=await Person.find({work:workType});
            console.log("person data fetched successfully");
            res.status(200).json(response);
        }
        else{
            res.status(400).json({error:'invalid work type'});
        }
    }
    catch(err){
        console.log("error fetching person data",err);
        res.status(500).json({error:'internal server error'});
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body;
        const response=await Person.findByIdAndUpdate(personId,
            updatedPersonData,
            {new:true,// return the updated data 
            runValidators:true});// run mongoose validation
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log("person updated successfully");
        res.status(200).json(response);
    }
    catch(err){
        console.log("error updating person",err);
        res.status(500).json({error:'internal server error'});
    }
});

router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log("person deleted successfully");
        res.status(200).json(response);
    }
    catch(err){
        console.log("error deleting person",err);
        res.status(500).json({error:'internal server error'});
    }
});
// login route
router.post('/login',async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user=await Person.findOne({username:username});
        if(!user){
            return res.status(404).json({error:'person not found'});
        }
        const isMatch=await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({error:'invalid password'});
        }
        const payload={
            id:user.id,
            username:user.username
        }
        const token=genrateToken(payload);
        res.status(200).json({response:user,token:token});
    }
    catch(err){
        console.log("error logging in",err);
        res.status(500).json({error:'internal server error'});
    }
}); 

module.exports=router;

