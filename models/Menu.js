const mongoose=require("mongoose");


const menuSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    category:{
        type: String,
        enum:['breakfast','lunch','dinner','snack'],
        required:true
    },
    ingredients:{
        type: [String],
        required:true
    },
    is_spicy:{
        type: Boolean,
        default:false
    },
    num_sales:{
        type: Number,
        default:0
    },
    
});

const MenuItem=mongoose.model('MenuItem',menuSchema);

module.exports=MenuItem;