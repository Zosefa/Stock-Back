const express = require("express");
const { findArticle, createArticle, updateArticle, deleteArticle } = require("../controllers/ArticleController");
const router = express.Router();

router.get("/article", findArticle); 
router.post("/article", createArticle); 
router.put("/article/:id", updateArticle); 
router.delete("/article/:id", deleteArticle); 

module.exports = router;
