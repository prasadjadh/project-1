
const AuthorModel= require("../model/author")

const AuthorCreate= async function(req,res){
    
    let body= req.body

    console.log("everything is Okay:  ",body)

    let author= await AuthorModel.create(body)
    
    res.send(author);
}

module.exports.AuthorCreate=AuthorCreate