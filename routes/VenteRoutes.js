const express = require("express");
const { findVente, creteVente, findById } = require("../controllers/VenteController");
const router = express.Router();

router.get("/vente", findVente); 
router.post("/vente", creteVente); 
router.get("/vente/:id", findById); 

module.exports = router;
