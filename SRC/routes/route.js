const express = require('express');
const router = express.Router();
const Controller=require("../controller/AuthorModel")




router.post("/AuthorController",Controller.AuthorController)



module.exports = router;