const BloggerModel = require("../model/blog")
const AuthorModel = require("../model/author")
const moment = require("moment")


const BloggerCreate = async function (req, res) {
    let body = req.body

   // console.log("body:    ", body)

    let dateandTime = moment().format("YYYY-MM-DD HH:mm:ss")

    let Author_id = await AuthorModel.findById(body.authorId)

    if (!Author_id) {
        return res.status(404).send(" No author found")
    }

    let createBlogg = await BloggerModel.create(body)

    console.log("create blog:  ",createBlogg)

    if (body.isPublished === true && body.isDeleted===true) {
        let Update = await BloggerModel.updateMany({ isPublished: true }, { $set: { publishedAt: dateandTime, deletedAt:dateandTime } }, { new: true })
        let FindData = await BloggerModel.find({authorId: body.authorId})
        console.log("findData: ",FindData)
        return res.status(200).send(FindData)
    }
    else {
        return res.status(201).send(createBlogg)
    }
}

const GetData = async function (req, res) {

    let query = req.query

    console.log("query:   ", query)

    //authorId:query.authorId,category:query.category,tags:query.tags,subcategory:query.subcategory

    let GetRecord = await BloggerModel.find({ $and: [{ isDeleted: false, isPublished: true },query] })

    console.log("record:  ", GetRecord.length);


    if (GetRecord.length > 0) {
        return res.send({ msg: GetRecord })
    }
    else {
        return res.status(400).send("no data found")
    }

}

const UpdateData = async function (req, res) {
    let body = req.body


    let params = req.params
    let dateandTime = moment().format("YYYY-MM-DD HH:mm:ss")

    let DataUpdate = await BloggerModel.findById(params.blogId)
    console.log("dataUpate:  ", DataUpdate)

    if (!DataUpdate) {
        return res.status(404).send({ msg: "No id found" })
    }

    if (DataUpdate.isDeleted === true) {
        return res.status(403).send({ msg: "error, isDeleted : true ", Status: "false" })
    }

    // let setData= await BloggerModel.findOneAndUpdate({_id:params.blogId},{$set:{title:body.title,body:body.body,publishedAt:dateandTime,isPublished:true}})
    // let Pushdata= await BloggerModel.findOneAndUpdate({_id:params.blogId},{$push:{tags:body.tags,subcategory:body.subcategory}},{new:true,upsert:true})

    let UpData = await BloggerModel.findByIdAndUpdate(params.blogId, { title: body.title, body: body.body, isPublished: true, publishedAt: dateandTime, $push: { tags: body.tags, subcategory: body.subcategory } }, { new: true })

    console.log("FinalUpdate:  ", UpData)

    return res.status(201).send(UpData)

}

const delData = async function (req, res) {
    let id = req.params.blogId
    console.log("id:    ", id)

    let dateandTime = moment().format("YYYY-MM-DD HH:mm:ss")

    let verification = await BloggerModel.findById(id)
    console.log("verification:  ", verification)
    if (!verification) {
        return res.status(404).send({ msg: "No blog id exists" })
    }

    if (verification.isDeleted === true) {
        return res.status(404).send(" deleted")
    }
    else {
        let FinalResult = await BloggerModel.findByIdAndUpdate( id , { isDeleted: true,  deletedAt: dateandTime }, { new: true })
        return res.status(200).send(" isDeleted: true ")
    }
}

const deleted= async function(req,res){

    let query= req.query
    console.log("query    ",   query)

   
    let convertBoolean= JSON.parse(query.isPublished);

    let  delDeatails= await BloggerModel.findOneAndUpdate({$and:[{categeory:query.categeory},{authorId:query.authorId},{tags:query.tags},{subcategory:query.subcategory},{isPublished:convertBoolean}]},{isDeleted:true,deletedAt:dateandTime},{new:true})

    console.log("delData   :" ,   delDeatails);

    if(!delDeatails){
        return res.send({msg:" Data doesn't exist"})
    }
    res.send({msg: delDeatails})

}


module.exports.BloggerCreate = BloggerCreate
module.exports.GetData = GetData
module.exports.UpdateData = UpdateData
module.exports.delData = delData
module.exports.DataDelet=deleted