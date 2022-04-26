const express = require('express');
const router = express.Router();
const AuthorController=require("../controller/AuthorController")


router.post("/AuthorCreate",AuthorController.AuthorCreate)



module.exports = router;