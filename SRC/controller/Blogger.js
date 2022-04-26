const BloggerModel = require("../model/blog")
const AuthorModel = require("../model/author")

const BloggerCreate = async function (req, res) {
    let body = req.body

    console.log("body:    ",body.authorId)
    
        let Author_id = await AuthorModel.findOne({_id: body.authorId})
        if (!Author_id) {
            res.status(404).send(" No author found")
        }
    
        console.log("thik hai rebabab :     ")
    let createBlogg= await BloggerModel.create(body)

    res.status(201).send({msg: createBlogg})


}

module.exports.BloggerCreate = BloggerCreatefecth