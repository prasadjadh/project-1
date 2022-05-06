const BloggerModel = require("../model/blog")
const AuthorModel = require("../model/author")


// Problem 2

const BloggerCreate = async function (req, res) {

    try {
        let body = req.body

        let StringCheckWithSpace= /^[A-Za-z ]{1,}$/
        let StringAllowwithSpace= /^[A-Za-z ,-]{1,}$/
       
      
        if(!body.title){
            return res.status(404).send({msg: "Error", Status: " Please enter the title"})
        }
        if(!body.body){
            return res.status(404).send({msg: "Error", Status: " Please enter the body"})
        }
        if(!body.category){
            return res.status(404).send({msg: "Error", Status: " Please enter the category"})
        }

        // regex use

        if(!StringAllowwithSpace.test(body.title)){
            return res.status(403).send({Status: false, msg:" title: Special Characters or Space or comma (,)  are not allowed"})
        }
        if(!StringCheckWithSpace.test(body.body)){
            return res.status(403).send({Status: false, msg:" body: No Special Characters or space are allowed"})
        }
        if(!StringAllowwithSpace.test(body.category)){
            return res.status(403).send({Status: false, msg:" category: No Special Characters are allowed"})
        }

        let createBlogg = await BloggerModel.create(body)
      
        if (body.isPublished === true) {
            let Update = await BloggerModel.updateMany({ authorId: body.authorId }, { $set: { publishedAt: new Date() } }, { new: true })

        }
        if (body.isDeleted === true) {
            let CreateDeleteTime = await BloggerModel.updateMany({ authorId: body.authorId }, { $set: { deletedAt: new Date() } }, { new: true })
        }

        let Finaldata = await BloggerModel.find(body)
        return res.status(200).send({Status: true, data: Finaldata })
    }
    catch (err) {
        return res.status(500).send({ Status: false, msg: err.message })
    }
}

// Problem 3rd

const GetData = async function (req, res) {
    try {
        let query = req.query

        let GetRecord = await BloggerModel.find({ $and: [{ isDeleted: false }, { isPublished: true }, query] }).populate("authorId")

        if (GetRecord.length > 0) {
            return res.status(200).send({Status: true , data: GetRecord })
        }
        else {
            return res.status(400).send({Status: false, msg:"No such blog exist"});
        }
    }
    catch (err) {
        return res.status(500).send({Status: false, msg: "Error", error: err.message })
    }
}

// Problem 4

const UpdateData = async function (req, res) {
    try {
        let body = req.body

        let params = req.params

        let DataUpdate = await BloggerModel.findById(params.blogId)

        if (DataUpdate.isDeleted === true) {
            return res.status(400).send({ Status: false , msg: "We cant Published a deleted blog" })
        }
        if(DataUpdate.isPublished === true){
            return res.status(400).send({Status: false, msg: "this is already Published"})
        }

        let UpData = await BloggerModel.findByIdAndUpdate({ _id: params.blogId }, { title: body.title, body: body.body, isPublished: true, publishedAt: new Date(), $push: { tags: body.tags, subcategory: body.subcategory } }, { new: true })

        if (!UpData) {
            return res.status(404).send({ Status: false , msg: "No blog found" })
        }

        // Also we can use this one from line number 68 to 69
        // let setData= await BloggerModel.findOneAndUpdate({_id:params.blogId},{$set:{title:body.title,body:body.body,publishedAt:dateandTime,isPublished:true}})
        // let Pushdata= await BloggerModel.findOneAndUpdate({_id:params.blogId},{$push:{tags:body.tags,subcategory:body.subcategory}},{new:true,upsert:true})

        return res.status(201).send({Status: true,  data: UpData })
    }
    catch (err) {
        return res.status(500).send({Status:false, msg: "Error", error: err.message })
    }
}

// Problem 5

const delData = async function (req, res) {
    try {
        let id = req.params.blogId

        let verification = await BloggerModel.findById(id)

        if (verification.isDeleted === true) {
            return res.status(400).send({Status: false, msg: " already deleted"})
        }
        else {
            let FinalResult = await BloggerModel.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() }, { new: true })
            return res.status(201).send({ Status: true, data: " Successfully deleted the blog ", FinalResult })
        }
    }
    catch (err) {
        return res.status(500).send({Status:false, msg: "Error", error: err.message })
    }
}

// Problem 6

const deleted = async function (req, res) {
    try {
        let query = req.query
// Validation Part 
        if(!query.authorId){
            return res.status(400).send({Status: false, msg:"You have not entered the Author id in query params"})
        }
        if(!query.category){
            return res.status(400).send({Status: false, msg:"You have not entered the category in query params"})
        }
        if(!query.subcategory){
            return res.status(400).send({Status: false, msg:"You have not entered the subcategory in query params"})
        }
        if(!query.isPublished){
            return res.status(400).send({Status: false, msg:"You have not entered the isPublished data in query params"})
        }
        if(!query.tags){
            return res.status(400).send({Status: false, msg:"You have not entered the tags in query params"})
        }

        if(query.isPublished === "true"){
            return res.status(400).send({Status: false, msg: "Sorry you are not allowed to delete this blog "})
        }


        let delDeatails = await BloggerModel.findOneAndUpdate({ $and: [{ categeory: query.categeory }, { authorId: query.authorId }, { tags: query.tags }, { subcategory: query.subcategory }, { isPublished: query.isPublished }] }, { isDeleted: true, deletedAt: new Date() }, { new: true })

        if (!delDeatails) {
            return res.status(404).send({ Status: false, msg: " Data doesn't exist" })
        }
        res.status(200).send({ Status: true,  data: delDeatails })
    }
    catch (err) {
        return res.status(403).send({Status:false, msg: "Error", error: err.message })
    }

}


module.exports.BloggerCreate = BloggerCreate
module.exports.GetData = GetData
module.exports.UpdateData = UpdateData
module.exports.delData = delData
module.exports.DataDelet = deleted