const express = require("express");
const { findType, createType, updateType, deleteType } = require("../controllers/TypeActicleController");
const router = express.Router();

router.get("/type-article", findType); 
router.post("/type-article", createType); 
router.put("/type-article/:id", updateType); 
router.delete("/type-article/:id", deleteType); 

module.exports = router;
