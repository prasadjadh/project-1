const mongoose=require("mongoose");
const Email= require('mongoose-type-email')


const Author= new mongoose.Schema({
    
    fname: {
        type:String,
        required: true
    }, 
    lname: {
        type: String,
        required: true
    },
    title:  {
        type:String,
        enum: ["Mr", "Mrs", "Miss"],
        required:true
    },                                        
    email:  {
        type: Email,
        required: true,
        unique: true,
    },
                                           
    password:{
        type: String,
        required: true
    }
},{timestamps:true});

module.exports=mongoose.model("author",Author)


