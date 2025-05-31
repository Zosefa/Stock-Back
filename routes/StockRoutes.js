const express = require("express");
const { findStock, createStock, updateStock } = require("../controllers/StockController");
const router = express.Router();

router.get("/stock", findStock); 
router.post("/stock", createStock); 
router.put("/stock/:id", updateStock); 

module.exports = router;
