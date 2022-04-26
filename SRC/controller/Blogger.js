const BloggerModel = require("../model/blog")
const AuthorModel = require("../model/author")
const moment=require("moment")

const BloggerCreate = async function (req, res) {
    let body = req.body

    console.log("body:    ",body)

    let dateandTime= moment().format("YYYY-MM-DD HH:mm:ss")
   
    let Author_id = await AuthorModel.findOne({ _id: body.authorId })
    if (!Author_id) {
        res.status(404).send(" No author found")
    }
    
    let createBlogg = await BloggerModel.create(body)

    if(body.isPublished === true){
    let Update= await BloggerModel.updateMany({isPublished: true},{$set:{publishedAt: dateandTime}},{new:true})
    let FindData= await BloggerModel.find({isPublished: true})
    res.status(200).send(FindData)
    }
    else{
        res.status(201).send(createBlogg)
    }
}

const UpdateData= async function(req,res){

    let body= req.body

    let UpdateRecord= await BloggerModel.updateMany


}

module.exports.BloggerCreate = BloggerCreate
module.exports.UpdateData=UpdateData