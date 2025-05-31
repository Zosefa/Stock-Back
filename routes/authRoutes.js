const express = require("express");
const { authUser, register, refreshToken, logout, findById } = require("../controllers/UserController");
const router = express.Router();

router.post("/login", authUser); 
router.post("/register", register); 
router.get("/info-user/:id", findById); 
router.post("/refreshToken", refreshToken); 
router.post("/logout", logout); 

module.exports = router;
