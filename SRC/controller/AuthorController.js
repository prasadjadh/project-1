
const AuthorModel = require("../model/author")

// Problem 1

const AuthorCreate = async function (req, res) {
    try {
        let body = req.body
        if(Object.keys(body).length===0 && Object.values(body).length===0){
            return res.status(404).send({Status: false, msg:"No data Found to create the account"})
        }

        if(!body.fname){
            return res.status(404).send({status: false , msg: "First name is required"})
        }
        if(!body.lname){
            return res.status(404).send({status: false, msg: "Last name is required"})
        }
        if(!body.title){
            return res.status(404).send({status: false, msg: "Title is required"})
        }
        if(!body.email){
            return res.status(404).send({status: false, msg: " No Email found,   Email id is required"})
        }
        if(!body.password){
            return res.status(404).send({status: false, msg: "Password is required"})
        }
        

        let author = await AuthorModel.create(body);
        return res.status(201).send({ author });

    }
    catch (err) {
        return res.status(403).send({ msg: "Error", error: err.message })
    }
    
}



module.exports.AuthorCreate = AuthorCreate