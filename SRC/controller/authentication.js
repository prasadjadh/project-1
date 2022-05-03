const AuthorModel = require('../model/author')
const BloggerModel = require('../model/blog')
const jwt = require('jsonwebtoken')
const { query } = require('express')


// Phase 2nd Problem 1

const login = async function (req, res) {
    try{
        let body = req.body

        let authorization = await AuthorModel.findOne({ email: body.email, password: body.password })

        if (!authorization) {
            return res.status(401).send({ msg: "Please enter correct Credentials" })
        }
    
        let token = jwt.sign({
    
        author_id: authorization._id,
    
        }, "Functionup-Team52")
    
        res.setHeader("x-api-key", token)    /// i have to ask this one
        res.status(201).send(token)

    }
    catch (err) {
        return res.status(403).send({ msg: "Error", error: err.message })
    }
    
}

// Phase 2 Problem 2

const MiddlewareMid1 = async function (req, res, next) {
try{
    let body = req.body

    let header = req.headers

    let token = header['x-api-key'] || header["X-API-KEY"]

    if(!token){
        return res.status(404).send("Token is not present")
    }
    if(!body.authorId){
        return res.status(404).send({msg: "Error", Satus: "Auhtor Id must be present"})
    }

    let AuthorDetail = await AuthorModel.findOne({ $or: [{ email: body.email, password: body.password }, { _id: body.authorId }] }).select({ _id: 1 });
   
  
    if (!AuthorDetail) {
        return res.status(404).send({msg: "Error", Satus: "Author Id is not valid"})
    }
   
    let DecodeToken = jwt.verify(token, "Functionup-Team52")
  
    if (DecodeToken.author_id != AuthorDetail._id) {
      
        return res.status(401).send("Token Error: could not validate the authorization ")
    }
    
   return next()

    }
    catch (err) {
    return res.status(403).send({ msg: "Error", error: err.message })
    }

}

const MiddlewareMid2= async function(req,res,next){

    let header = req.headers

    let token = header['x-api-key'] || header["X-API-KEY"]

    if(!token){
        return res.status(404).send("Token is not present")
    }

    let bloggerVerification =await BloggerModel.findById(req.params.blogId)

    if(!bloggerVerification){
        return res.status(404).send({msg: "Error: Blog id does not exist"})
    }


    let AuthorDetail = await AuthorModel.findById(bloggerVerification.authorId ).select({ _id: 1 });
   
    if (!AuthorDetail) {
        return res.status(404).send("Creadential are not matching")
    }

    let DecodeToken = jwt.verify(token, "Functionup-Team52")
   
    if (DecodeToken.author_id != AuthorDetail._id) {
       
        return res.status(401).send("Token Error: could not validate the authorization ")
    }
    
   return next()
}

const MiddlewareMid3= async function(req,res,next){

    let header = req.headers

    let token = header['x-api-key'] || header["X-API-KEY"]

    if(!token){
        return res.status(404).send("Token is not present")
    }

    let bloggerVerification =await BloggerModel.findOne(req.query)

    if(!bloggerVerification){
        return res.status(404).send({msg: "Error: Blog does not exist"})
    }


    let AuthorDetail = await AuthorModel.findById(bloggerVerification.authorId ).select({ _id: 1 });
   
    if (!AuthorDetail) {
        return res.status(404).send("Creadential are not matching")
    }

    let DecodeToken = jwt.verify(token, "Functionup-Team52")
   
    if (DecodeToken.author_id != AuthorDetail._id) {
       
        return res.status(401).send("Token Error: could not validate the authorization ")
    }
    
   return next()
}




module.exports.login = login
module.exports.MiddlewareMid1 = MiddlewareMid1
module.exports.MiddlewareMid2=MiddlewareMid2
module.exports.MiddlewareMid3=MiddlewareMid3