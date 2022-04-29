const AuthorModel = require('../model/author')
const BloggerModel = require('../model/blog')
const jwt = require('jsonwebtoken')
const { query } = require('express')


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

    let header = req.headers
    let query = req.query.authorId

    console.log("Query:   ", query);
       
    let token = header['x-api-key'] || header["X-API-KEY"]

    console.log("token:  ", token)

    let AuthorDetail = await AuthorModel.findOne({ $or: [{ email: body.email, password: body.password }, { _id: body.authorId }, { _id: query }] }).select({ _id: 1 });
   
    console.log("authordetails:   ", AuthorDetail)
   
    if (!AuthorDetail) {
        return res.status(404).send("Creadential are not matching")
    }


    let DecodeToken = jwt.verify(token, "Functionup-Team52")
    console.log("Decoded Token:   ", DecodeToken)
   
    if (DecodeToken.author_id != AuthorDetail._id) {
        console.log("under mismatch token")
        return res.status(404).send("Token Error: could not validate the authorization ")
    }
    
    console.log("passsing the middleware")
   return next()


}

const MiddlewareMid2= async function(req,res,next){

    let header = req.headers
    let token = header['x-api-key'] || header["X-API-KEY"]


    let bloggerVerification =await BloggerModel.findById(req.params.blogId)

    if(!bloggerVerification){
        return res.status(404).send({msg: "Error: Blog id does not exist"})
    }

    console.log("bloggerVerification",bloggerVerification)

    let AuthorDetail = await AuthorModel.findById(bloggerVerification.authorId ).select({ _id: 1 });
   
    console.log("authordetails:   ", AuthorDetail)

   
   
    if (!AuthorDetail) {
        return res.status(404).send("Creadential are not matching")
    }


    let DecodeToken = jwt.verify(token, "Functionup-Team52")
    console.log("Decoded Token:   ", DecodeToken)
   
    if (DecodeToken.author_id != AuthorDetail._id) {
        console.log("under mismatch token")
        return res.status(404).send("Token Error: could not validate the authorization ")
    }
    
    console.log("passsing the middleware")
   return next()
}



// module.exports.mid1= mid1
module.exports.login = login
module.exports.MiddlewareMid1 = MiddlewareMid1
module.exports.MiddlewareMid2=MiddlewareMid2
