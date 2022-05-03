
const AuthorModel = require("../model/author")

// Problem 1

const AuthorCreate = async function (req, res) {
    try {
        let body = req.body
        if(Object.keys(body).length===0){
            return res.status(404).send(" No data Found to create the account ")
        }

        console.log("okayyy:    ",body)
        if(!body.fname){
            return res.status(404).send({msg: "Error", Status: "First name is required"})
        }
        if(!body.lname){
            return res.status(404).send({msg: "Error", Status: "Last name is required"})
        }
        if(!body.title){
            return res.status(404).send({msg: "Error", Status: "Title is required"})
        }
        if(!body.email){
            return res.status(404).send({msg: "Error", Status: "Email id is required"})
        }
        if(!body.password){
            return res.status(404).send({msg: "Error", Status: "Password is required"})
        }
        let author = await AuthorModel.create(body);
        return res.status(201).send({ author });

    }
    catch (err) {
        return res.status(403).send({ msg: "Error", error: err.message })
    }
    
}



module.exports.AuthorCreate = AuthorCreate