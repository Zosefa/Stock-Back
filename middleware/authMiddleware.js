const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Token = require('../models/Token');
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Récupère le token Bearer depuis l'en-tête Authorization
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Non autorisé, token manquant" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérifie que le token est bien enregistré et non révoqué
    const storedToken = await Token.findOne({
      where: { token, isRevoked: false }
    });

    if (!storedToken) {
      return res.status(401).json({ message: "Token révoqué ou invalide" });
    }

    // Récupère l'utilisateur
    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }
    });

    if (!req.user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Non autorisé, échec du token" });
  }
});

module.exports = protect;
