const express = require('express');
const router = express.Router();
const AuthorController=require("../controller/AuthorController")
const BloggerController=require("../controller/Blogger")


router.post("/AuthorCreate",AuthorController.AuthorCreate)

router.post("/BloggerCreate",BloggerController.BloggerCreate)

router.get("/UpdateData",BloggerController.UpdateData)

module.exports = router;