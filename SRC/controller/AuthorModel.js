const { default: mongoose } = require("mongoose")
const AuthorModel= require("../model/author")

const AuthorController= async function(req,res){
    let body= req.body

    console.log("everything is Okay:  ",body)
    let author= await AuthorModel.create(body);
    res.send(author);
}

module.exports.AuthorController=AuthorController