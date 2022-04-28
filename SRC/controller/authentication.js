const AuthorModel = require('../model/author')
const BloggerModel = require('../model/blog')
const jwt = require('jsonwebtoken')


// Phase 2nd Problem 1

const login = async function (req, res) {
    let body = req.body

    let authorization = await AuthorModel.findOne({ email: body.email, password: body.password })
    console.log("authorization:  ", authorization)
    if (!authorization) {
        return res.status(404).send({ msg: "Please enter correct Credentials" })
    }

    let token = jwt.sign({

        author_id: authorization._id,

    }, "Functionup-Team52")

    res.setHeader("x-api-key", token)
    res.send(token)

}

// Phase 2 Problem 2

const MiddlewareMid1 = async function (req, res, next) {
    let body = req.body
    let paraId = req.params.blogId
    let header = req.headers
    let token = header['x-api-key'] || header["X-API-KEY"]


    let ParamBlogiD = await BloggerModel.findById({ _id: paraId }).select({ authorId: 1, _id: 0 })

    console.log("kkkk:    ",ParamBlogiD);

    if (!ParamBlogiD) {
        return res.send("Blogger is incorrect ");
    }


    let AuthorDetail = await AuthorModel.findOne({ $or: [{ email: body.email, password: body.password }, { _id: body.authorId }, { _id: req.query.authorId }, { _id: ParamBlogiD.authorId }] }).select({ _id: 1 });



    if (!AuthorDetail) {
        return res.status(404).send("Creadential are not matching");
    }


    try {
        let DecodeToken = jwt.verify(token, "Functionup-Team52")



        if (DecodeToken.author_id != AuthorDetail._id) {
            return res.status(404).send("Token Error: could not validate the authorization ")
        }

        next()
    }
    catch (err) {

        return res.status(404).send({ msg: "error", error: err.message })
    }


}



// module.exports.mid1= mid1
module.exports.login = login
module.exports.MiddlewareMid1 = MiddlewareMid1
