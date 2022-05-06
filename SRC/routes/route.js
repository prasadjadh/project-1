const express = require('express');
const router = express.Router();
const AuthorController=require("../controller/AuthorController")
const BloggerController=require("../controller/BloggerController")
const Auth = require('../controller/AllMiddleware')

router.post("/authors",AuthorController.AuthorCreate)    // For author creation

router.post("/blogs",Auth.MiddlewareMid1,BloggerController.BloggerCreate)   // for blog creation

router.get("/blogs",Auth.MiddlewareMid3,BloggerController.GetData)              // for getting a blogs

router.put("/blogs/:blogId",Auth.MiddlewareMid2,BloggerController.UpdateData)

router.delete("/blogs/:blogId",Auth.MiddlewareMid2,BloggerController.delData)

router.delete("/blogs",Auth.MiddlewareMid3,BloggerController.DataDelet)

router.post('/login', Auth.login);

module.exports = router;