const mongoose=require("mongoose")
const objectId= mongoose.Schema.Types.ObjectId

const BlogsSchema= new mongoose.Schema({
    title: { 
        type:String,
        required:true
    },
    body: {
        type:String,
        required:true
    },
    authorId:{
        type:ObjectId,
        ref:"author"
    },
    tags: [String],
    category: {
        type:[String],
        required:true
    },
    subcategory: {
        type:[String],
        required:true
    },   
     deletedAt:{
         type: Boolean,
         default: false
     },
    
    publishedAt: { 
     type: Boolean,
    default: false
},
    isPublished: {
    type:Boolean,
     default: false
    }                           // if deleted is true deletedAt will have a date 2021-09-17T04:25:07.803Z,
  
  },{timestamps:true})


  module.exports=mongoose.model("Blogs", BlogsSchema )