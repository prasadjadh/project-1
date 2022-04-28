const AuthorModel= require('../model/author')
const BloggerModel= require('../model/blog')
const jwt = require('jsonwebtoken')

// const mid1 = async function(req, res, next){
//     let body= req.body
//     let email = body.email
//     let password = body.password
//     let authorization = await AuthorModel.find({email:email, password: password})
//     console.log(authorization, "aaja mere paas")
    
//     if (authorization.length<=0){
//         res.status(404).send({msg: "Please enter correct Credentials"})
//     }
//     else{
//         next()
//     }
// }


const login = async function(req, res){
    let body= req.body
    let email = body.email
    let password = body.password
    let authorization = await AuthorModel.findOne({email:email, password: password}).select("_id: 1")
    console.log(authorization._id)
    if (!authorization){
        res.status(404).send({msg: "Please enter correct Credentials"})
    }

    let token= jwt.sign({
        userid: authorization._id,
        
    } ,  "Functionup-Team52")
    console.log(token)
    // res.setHeader("x-api-key", token)
    res.status(201).send({msg:token})
} 

let auth1 = async function (req, res, next){

}


// module.exports.mid1= mid1
module.exports.login= login
