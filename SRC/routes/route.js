const express = require('express');
const router = express.Router();
const AuthorController=require("../controller/AuthorController")
const BloggerController=require("../controller/BloggerController")
const Auth = require('../controller/authentication')

router.post("/AuthorCreate",AuthorController.AuthorCreate)

router.post("/BloggerCreate",BloggerController.BloggerCreate)

router.get("/GetData",BloggerController.GetData)

router.put("/blogs/:blogId",BloggerController.UpdateData)

router.delete("/blogs/:blogId",BloggerController.delData)

router.delete("/blogs",BloggerController.DataDelet)

router.post('/login', Auth.login)

module.exports = router;