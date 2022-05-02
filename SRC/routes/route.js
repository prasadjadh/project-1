const express = require('express');
const router = express.Router();
const AuthorController=require("../controller/AuthorController")
const BloggerController=require("../controller/BloggerController")
const Auth = require('../controller/authentication')

router.post("/AuthorCreate",AuthorController.AuthorCreate)

router.post("/BloggerCreate",Auth.MiddlewareMid1,BloggerController.BloggerCreate)

router.get("/GetData",Auth.MiddlewareMid1,BloggerController.GetData)

router.put("/blogs/:blogId",Auth.MiddlewareMid1,BloggerController.UpdateData)

router.delete("/blogs/:blogId",Auth.MiddlewareMid1,BloggerController.delData)

router.delete("/blogs",Auth.MiddlewareMid2,BloggerController.DataDelet)

router.post('/login', Auth.login)

module.exports = router;