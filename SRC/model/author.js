const mongoose=require("mongoose")
// require('mongoose-type-email');


const Author= new mongoose.Schema({
    title:  {
        type:String,
        enum: ["Mr", "Mrs", "Miss"],
        required:true
    },
    fname: {
        type:String,
        required: true
    }, 
    lname: {
        type: String,
        required: true
    },                                        
    email:  {
        type: String, 
        required: true,
        unique:true
    },
                                           
    password:{
        type: Number,
        required: true
    }
},{timestamps:true})

module.exports=mongoose.model("author",Author)