
const AuthorModel = require("../model/author")

// Problem 1

const AuthorCreate = async function (req, res) {
    try {
        let body = req.body
        if(Object.keys(body).length===0){
            return res.status(404).send(" No data Found to create the account ")
        }
        let author = await AuthorModel.create(body);
        return res.status(201).send({ author });

    }
    catch (err) {
        return res.status(403).send({ msg: "Error", error: err.message })
    }
    
}



module.exports.AuthorCreate = AuthorCreate