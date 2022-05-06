const AuthorModel = require('../model/author')
const BloggerModel = require('../model/blog')
const jwt = require('jsonwebtoken')
const { query } = require('express')


// Phase 2nd Problem 1

const login = async function (req, res) {
    try {
        let body = req.body

        let emailCheck= /^[A-Za-z_.0-9]{2,}@[A-Za-z]{2,12}[.]{1}[A-Za-z.]{2,5}$/

        if (Object.keys(body).length === 0) {
            return res.status(404).send({ Status: false, msg: "No data Found into body" })
        }

        if (!body.password) {
            return res.status(404).send({ Status: false, msg: "You have not entered the password " })
        }
        if (!body.email) {
            return res.status(404).send({ Status: false, msg: "You have not entered the email id" })
        }
        // regex in validation of Email

        if(!emailCheck.test(body.email)){
            return res.status(403).send({Status: false, msg:" email: Please put a valid email"})
        }

        let authorization = await AuthorModel.findOne({ email: body.email, password: body.password })

        if (!authorization) {
            return res.status(401).send({ Satus: false, msg: "Please enter correct email id or password" })
        }

        let author_token = jwt.sign({

            author_id: authorization._id,
            

        }, "Functionup-Team52")

        res.setHeader("x-api-key", author_token)    /// i have to ask this one
       return res.status(201).send({ Status: true, data: author_token })

    }
    catch (err) {
        return res.status(403).send({Satus:false, msg: "Error", error: err.message })
    }

}

// Phase 2 Problem 2

const MiddlewareMid1 = async function (req, res, next) {
    try {
        let body = req.body

        let header = req.headers

        let author_token = header['x-api-key'] || header["X-API-KEY"]

        if (!author_token) {
            return res.status(400).send({ Status: false, msg: "Token is not present" })
        }
        if(Object.keys(body).length===0){
            return res.status(400).send({Status: false, msg: "Sorry You have not entered any data into body"})
        }
        if(!body.authorId){
            return res.status(400).send({Status: false, msg: "Sorry please enter the author id"})
        }

        let AuthorDetail = await AuthorModel.findById({_id:body.authorId})

        console.log("authodetail  ",AuthorDetail)
        if (!AuthorDetail) {
            return res.status(400).send({ Satus: false, msg: "Author Id is not valid" })
        }

        try {
            let DecodeToken = jwt.verify(author_token, "Functionup-Team52")
            
            console.log("DecodeToken  ",DecodeToken.author_id)
            if (DecodeToken.author_id != AuthorDetail._id) {

                return res.status(401).send({ Status: false, msg: "this token is not valid for this author id" })
            }
        }
        catch (err) {
            return res.status(400).send({ Status: false, msg: "you have entered a wrong token" })
        }
        console.log("passing middleware")
        return next()

    }
    catch (err) {
        return res.status(500).send({ msg: "Error", error: err.message })
    }

}
//=======================================================================================================================//

const MiddlewareMid2 = async function (req, res, next) {
    try {
        let header = req.headers

        let author_token = header['x-api-key'] || header["X-API-KEY"]

        if (!author_token) {
            return res.status(400).send({ Status: false, msg: "Token is not present" })
        }

        let bloggerVerification = await BloggerModel.findById(req.params.blogId)

        if (!bloggerVerification) {
            return res.status(400).send({ Status: false, msg: "Error: Blog id does not exist" })
        }

        let AuthorDetail = await AuthorModel.findById(bloggerVerification.authorId).select({ _id: 1 });

        if (!AuthorDetail) {
            return res.status(400).send({ Status: false, msg: "Creadential are not matching" })
        }

        try {
            let DecodeToken = jwt.verify(author_token, "Functionup-Team52")

            if (DecodeToken.author_id != AuthorDetail._id) {

                return res.status(400).send({ Status: false, msg: "this token is not valid for this author id" })
            }
        }
        catch (err) {
            return res.status(400).send({ Status: false, error: err.message, msg: "you have entered a wrong token" })
        }

        return next()
    }
    catch (err) {
        return res.status(500).send({ Status: false, msg: err.message })
    }
}
// ================================================================================================================================//
const MiddlewareMid3 = async function (req, res, next) {
    try {

        let header = req.headers

        let author_token = header['x-api-key'] || header["X-API-KEY"]

        if (!author_token) {
            return res.status(400).send({ Status: false, msg: "Token is not present" });
        }

        if(Object.keys(req.query).length===0){
            return res.status(404).send({ Status: false, msg: "Request query is empty" })
        }


        let bloggerVerification = await BloggerModel.findOne(req.query)
       

        if (!bloggerVerification) {
            return res.status(400).send({ Status: false, msg: "Error: Blog does not exist" })
        }

        let AuthorDetail = await AuthorModel.findById(bloggerVerification.authorId).select({ _id: 1 });

        if (!AuthorDetail) {
            return res.status(400).send({ Status: false, msg: "Creadential are not matching" })
        }

        try {
            let DecodeToken = jwt.verify(author_token, "Functionup-Team52")

            if (DecodeToken.author_id != AuthorDetail._id) {

                return res.status(400).send({ Status: false, msg: "this token is not valid for this author id" })
            }
        }
        catch (err) {
            return res.status(400).send({ Status: false, error: err.message, msg: "you have entered a wrong token" })
        }
        

        return next()

    } catch (err) {
        return res.status(500).send({ Status: false, msg: err.message })
    }
}






module.exports.login = login
module.exports.MiddlewareMid1 = MiddlewareMid1
module.exports.MiddlewareMid2 = MiddlewareMid2
module.exports.MiddlewareMid3 = MiddlewareMid3