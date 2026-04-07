const jwt=require("jsonwebtoken");

const jwtAuthMiddleware= (req,res,next)=>{
    // extract jwt tokwn from request header
    const token=req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:'unauthorized'});
    // if i got token
    try{
        // verify token
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        // attach user to request
        req.user=decoded;
        next();
    }
    catch(err){
        console.log("error verifying token",err);
        res.status(500).json({error:'internal server error'});
    }
    
}

// function to generate token
const generateToken=(userData)=>{
    // genreate jwt token
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000});
}
module.exports={jwtAuthMiddleware,generateToken};   