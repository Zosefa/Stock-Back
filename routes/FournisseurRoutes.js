const express = require("express");
const { findFournisseur, createFournisseur, updateFournisseur, deleteFournisseur } = require("../controllers/FournisseurController");
const router = express.Router();

router.get("/fournisseur", findFournisseur); 
router.post("/fournisseur", createFournisseur); 
router.put("/fournisseur/:id", updateFournisseur); 
router.delete("/fournisseur/:id", deleteFournisseur); 

module.exports = router;
