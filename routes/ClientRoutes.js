const express = require("express");
const { findClient, createClient, updateClient, deleteClient } = require("../controllers/ClientController");
const router = express.Router();

router.get("/client", findClient); 
router.post("/client", createClient); 
router.put("/client/:id", updateClient); 
router.delete("/client/:id", deleteClient); 

module.exports = router;
