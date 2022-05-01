const BloggerModel = require("../model/blog")
const AuthorModel = require("../model/author")
const moment = require("moment")

// Problem 2

const BloggerCreate = async function (req, res) {

    try {
        let body = req.body

        let dateandTime = moment().format("YYYY-MM-DD HH:mm:ss")

        let createBlogg = await BloggerModel.create(body)

        if (body.isPublished === true) {
            let Update = await BloggerModel.updateMany({ authorId: body.authorId }, { $set: { publishedAt: dateandTime } }, { new: true })

        }
        if (body.isDeleted === true) {
            let CreateDeleteTime = await BloggerModel.updateMany({ authorId: body.authorId }, { $set: { deletedAt: dateandTime } }, { new: true })
        }
        let Finaldata = await BloggerModel.find(body)
        return res.status(200).send({ msg: Finaldata })
    }
    catch (err) {
        return res.status(403).send({ msg: "Error", error: err.message })
    }
}

// Problem 3rd

const GetData = async function (req, res) {
    try {
        let query = req.query

        let GetRecord = await BloggerModel.find({ $and: [{ isDeleted: false }, { isPublished: true }, query] }).populate("authorId")

        if (GetRecord.length > 0) {
            return res.status(200).send({ msg: GetRecord })
        }
        else {
            return res.status(404).send("no data found")
        }
    }
    catch (err) {
        return res.status(403).send({ msg: "Error", error: err.message })
    }
}

// Problem 4

const UpdateData = async function (req, res) {
    try {
        let body = req.body

        let params = req.params
        let dateandTime = moment().format("YYYY-MM-DD HH:mm:ss")

        let DataUpdate = await BloggerModel.findById(params.blogId)

        if (DataUpdate.isDeleted === true) {
            return res.status(403).send({ msg: "error, isDeleted : true ", Status: "false" })
        }

        let UpData = await BloggerModel.findByIdAndUpdate({ _id: params.blogId }, { title: body.title, body: body.body, isPublished: true, publishedAt: dateandTime, $push: { tags: body.tags, subcategory: body.subcategory } }, { new: true })

        if (!UpData) {
            return res.status(404).send({ msg: "No Data Found", Status: false })
        }

        // Also we can use this one from line number 68 to 69
        // let setData= await BloggerModel.findOneAndUpdate({_id:params.blogId},{$set:{title:body.title,body:body.body,publishedAt:dateandTime,isPublished:true}})
        // let Pushdata= await BloggerModel.findOneAndUpdate({_id:params.blogId},{$push:{tags:body.tags,subcategory:body.subcategory}},{new:true,upsert:true})

        return res.status(201).send({ msg: UpData })
    }
    catch (err) {
        return res.status(403).send({ msg: "Error", error: err.message })
    }
}

// Problem 5

const delData = async function (req, res) {
    try {
        let id = req.params.blogId

        let dateandTime = moment().format("YYYY-MM-DD HH:mm:ss")

        let verification = await BloggerModel.findById(id)

        if (!verification) {
            return res.status(404).send({ msg: "No blog id exists" })
        }

        if (verification.isDeleted === true) {
            return res.status(200).send(" deleted")
        }
        else {
            let FinalResult = await BloggerModel.findByIdAndUpdate(id, { isDeleted: true, deletedAt: dateandTime }, { new: true })
            return res.status(201).send({ msg: " isDeleted: true ", FinalResult })
        }
    }
    catch (err) {
        return res.status(403).send({ msg: "Error", error: err.message })
    }
}

// Problem 6

const deleted = async function (req, res) {
    try {
        let query = req.query

        let dateandTime = moment().format("YYYY-MM-DD HH:mm:ss")

        let convertBoolean = JSON.parse(query.isPublished);

        let delDeatails = await BloggerModel.findOneAndUpdate({ $and: [{ categeory: query.categeory }, { authorId: query.authorId }, { tags: query.tags }, { subcategory: query.subcategory }, { isPublished: convertBoolean }] }, { isDeleted: true, deletedAt: dateandTime }, { new: true })

        if (!delDeatails) {
            return res.status(404).send({ msg: " Data doesn't exist" })
        }
        res.status(200).send({ msg: delDeatails })
    }
    catch (err) {
        return res.status(403).send({ msg: "Error", error: err.message })
    }

}


module.exports.BloggerCreate = BloggerCreate
module.exports.GetData = GetData
module.exports.UpdateData = UpdateData
module.exports.delData = delData
module.exports.DataDelet = deleted