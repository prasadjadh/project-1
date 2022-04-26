const BloggerModel = require("../model/blog")
const AuthorModel = require("../model/author")
const moment=require("moment")

const BloggerCreate = async function (req, res) {
    let body = req.body

    console.log("body:    ",body)

    let dateandTime= moment().format("YYYY-MM-DD HH:mm:ss")
   
    let Author_id = await AuthorModel.findOne({ _id: body.authorId })
    if (!Author_id) {
        return res.status(404).send(" No author found")
    }
    
    let createBlogg = await BloggerModel.create(body)

    if(body.isPublished === true){
    let Update= await BloggerModel.updateMany({isPublished: true},{$set:{publishedAt: dateandTime}},{new:true})
    let FindData= await BloggerModel.find({isPublished: true})
   return res.status(200).send(FindData)
    }
    else{
       return res.status(201).send(createBlogg)
    }
}

const GetData= async function(req,res){

    let query=req.query

    console.log("query:   ",query)
    //authorId:query.authorId,category:query.category,tags:query.tags,subcategory:query.subcategory

    // let array = query

    // for(let i=0; i<)

     let GetRecord= await BloggerModel.find({$and:[{isDeleted: false},{isPublished: true},query]})

    console.log("record:  ",GetRecord);

    res.send({msg: GetRecord })

    //{$or:[{authorId:query.authorId},{category:query.category},{tags:query.tags},{subcategory:query.subcategory}]
    //,category:[query.category],tags:[query.tags],subcategory:[query.subcategory]

        //{isDeleted: false, isPublished: true}
}

module.exports.BloggerCreate = BloggerCreate
module.exports.GetData=GetData