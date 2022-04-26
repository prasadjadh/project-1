const mongoose=require("mongoose")

const Author= new mongoose.Schema({
    fname: { mandatory}, 
    lname: {
        type: String,
        required: true
    },
    title:  {
        type:String,
        enum: [Mr, Mrs, Miss]
    },                                          //{mandatory, enum[Mr, Mrs, Miss]}, 
    email:{
        type: String,
        unique: true,
        required: true
    },                                      //{mandatory, valid email, unique}, 
    password:{
        type: Number,
        required: true
    }
})

module.exports=mongoose.model("author",Author)