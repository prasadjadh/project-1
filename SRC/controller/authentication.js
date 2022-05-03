const AuthorModel = require('../model/author')
const BloggerModel = require('../model/blog')
const jwt = require('jsonwebtoken')
const { query } = require('express')


// Phase 2nd Problem 1

const login = async function (req, res) {
    try{
        let body = req.body
      
        if(Object.keys(body).length===0 && Object.values(body).length===0){
            return res.status(404).send({Status: false, msg:"No data Found into body"})
        }

        if(!body.password){
            return res.status(404).send({Status: false, msg: "You have not entered the password "})
        }
        if(!body.email){
            return res.status(404).send({Status: false, msg: "You have not entered the email id"})
        }

        let authorization = await AuthorModel.findOne({ email: body.email, password: body.password })

        if (!authorization) {
            return res.status(401).send({Satus: false , msg: "Please enter correct Credentials" })
        }
    
        let token = jwt.sign({
    
        author_id: authorization._id,
    
        }, "Functionup-Team52")
    
        res.setHeader("x-api-key", token)    /// i have to ask this one
        res.status(201).send({Status: true, msg: token})

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
        return res.status(404).send({Status: false, msg: "Token is not present"})
    }

    if(Object.keys(body).length===0 && Object.values(body).length===0){
        return res.status(404).send({Status: false, msg:"No data Found to create the account"})
    }

    if(!body.authorId){
        return res.status(404).send({ Satus: false, msg: "Auhtor Id must be present" })
    }

    let AuthorDetail = await AuthorModel.findOne({ $or: [{ email: body.email, password: body.password }, { _id: body.authorId }] }).select({ _id: 1 });
   
  
    if (!AuthorDetail) {
        return res.status(404).send({ Satus: false ,msg: "Author Id is not valid" })
    }
   
    try{
        let DecodeToken = jwt.verify(token, "Functionup-Team52")

        if (DecodeToken.author_id != AuthorDetail._id) {
      
            return res.status(401).send({Status: false, msg:"this token is not valid for this author id"})
        }
    }
    catch(err){
        return res.status(404).send({Status: false, error: err.message,  msg: "you have entered a wrong token"})
    }
  
   return next()

    }
    catch (err) {
    return res.status(403).send({ msg: "Error", error: err.message })
    }

}
//=======================================================================================================================//

const MiddlewareMid2= async function(req,res,next){

    let header = req.headers
    
    let token = header['x-api-key'] || header["X-API-KEY"]

    if(!token){
        return res.status(404).send({Status: false, msg:"Token is not present"})
    }


    let bloggerVerification =await BloggerModel.findById(req.params.blogId)

    if(!bloggerVerification){
        return res.status(404).send({Status: false, msg: "Error: Blog id does not exist"})
    }
    
    let AuthorDetail = await AuthorModel.findById(bloggerVerification.authorId ).select({ _id: 1 });
   
    if (!AuthorDetail) {
        return res.status(404).send({Status: false, msg: "Creadential are not matching"})
    }

    try{
        let DecodeToken = jwt.verify(token, "Functionup-Team52")

        if (DecodeToken.author_id != AuthorDetail._id) {
      
            return res.status(401).send({Status: false, msg:"this token is not valid for this author id"})
        }
    }
    catch(err){
        return res.status(404).send({Status: false, error: err.message,  msg: "you have entered a wrong token"})
    }
    
   return next()
}
// ================================================================================================================================//

const MiddlewareMid3= async function(req,res,next){

    let header = req.headers
    let query = req.query

    let token = header['x-api-key'] || header["X-API-KEY"]

    if(!token){
        return res.status(404).send({Status: false, msg:"Token is not present"})
    }
    if(!query.authorId){
        return res.status(404).send({Status: false, msg:"You have not entered the Author id in query params"})
    }
    if(!query.category){
        return res.status(404).send({Status: false, msg:"You have not entered the category in query params"})
    }
    if(!query.subcategory){
        return res.status(404).send({Status: false, msg:"You have not entered the subcategory in query params"})
    }
    if(!query.isPublished){
        return res.status(404).send({Status: false, msg:"You have not entered the isPublished data in query params"})
    }
    if(!query.tags){
        return res.status(404).send({Status: false, msg:"You have not entered the tags in query params"})
    }

    let bloggerVerification =await BloggerModel.findOne({ $and: [{ categeory: query.categeory }, { authorId: query.authorId }, { tags: query.tags }, { subcategory: query.subcategory }, { isPublished: query.isPublished }]})

    if(!bloggerVerification){
        return res.status(404).send({Satus: false , msg: " Blog does not exist"})
    }

    let AuthorDetail = await AuthorModel.findById(bloggerVerification.authorId).select({ _id: 1 });
   
    if (!AuthorDetail) {
        return res.status(404).send({Status: false, msg: "Author Id is not matching with database"})
    }

   
    // console.log(": Authodetails  ", AuthorDetail)

    
    try{
        let DecodeToken = jwt.verify(token, "Functionup-Team52")

        if (DecodeToken.author_id != AuthorDetail._id) {
      
            return res.status(401).send({Status: false, msg:"this token is not valid for this author id"})
        }
    }
    catch(err){
        return res.status(404).send({Status: false, error: err.message,  msg: "you have entered a wrong token"})
    }
    
   return next()
}

const MiddlewareMid4= async function(req,res,next){

    let header = req.headers
    let query = req.query
    console.log("query:     ", query)

    let token = header['x-api-key'] || header["X-API-KEY"]

    if(!token){
        return res.status(404).send({Status: false, msg:"Token is not present"})
    }
    
    if(Object.keys(query).length===0){
    return res.status(404).send({Status: false, msg: "You have not entered the any data into query params"})
    }

    let bloggerVerification =await BloggerModel.findOne(query)

    if(!bloggerVerification){
        return res.status(404).send({Satus: false , msg: " Blog does not exist"})
    }

    let AuthorDetail = await AuthorModel.findById(bloggerVerification.authorId).select({ _id: 1 });
   
    if (!AuthorDetail) {
        return res.status(404).send({Status: false, msg: "Author Id is not matching with database"})
    }

    
    try{
        let DecodeToken = jwt.verify(token, "Functionup-Team52")

        if (DecodeToken.author_id != AuthorDetail._id) {
      
            return res.status(401).send({Status: false, msg:"this token is not valid for this author id"})
        }
    }
    catch(err){
        return res.status(404).send({Status: false, error: err.message,  msg: "you have entered a wrong token"})
    }
    
   return next()
}





module.exports.login = login
module.exports.MiddlewareMid1 = MiddlewareMid1
module.exports.MiddlewareMid2=MiddlewareMid2
module.exports.MiddlewareMid3=MiddlewareMid3
module.exports.MiddlewareMid4=MiddlewareMid4