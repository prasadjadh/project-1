const express = require('express');
const router = express.Router();
const AuthorController=require("../controller/AuthorController")
const BloggerController=require("../controller/BloggerController")


router.post("/AuthorCreate",AuthorController.AuthorCreate)

router.post("/BloggerCreate",BloggerController.BloggerCreate)

router.get("/GetData",BloggerController.GetData)

router.put("/blogs/:blogId",BloggerController.UpdateData)

router.delete("/blogs/:blogId",BloggerController.delData)

module.exports = router;