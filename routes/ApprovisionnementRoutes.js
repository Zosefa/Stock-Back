const express = require("express");
const { findApprovisionnement, createApprovisionnement, findById } = require("../controllers/ApprovisionnementController");
const router = express.Router();

router.get("/approvisionnement", findApprovisionnement); 
router.post("/approvisionnement", createApprovisionnement); 
router.get("/approvisionnement/:id", findById); 

module.exports = router;
