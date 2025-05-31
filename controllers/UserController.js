const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const Token = require('../models/Token');
const upload = require('../config/multer');
const { generateAccessToken, generateRefreshToken } = require('../config/generateToken');
const jwt = require('jsonwebtoken');

const getExpiration = (token) => {
  const decoded = jwt.decode(token);
  return new Date(decoded.exp * 1000);
};

exports.authUser = asyncHandler(async (req, res)=> {
    const {email, password} = req.body;
    
    const user = await User.findOne({ where: { email }});

    if(user && (await user.validPassword(password))) {
        const accessToken = generateAccessToken(user.id, '30m');
        const refreshToken = generateRefreshToken(user.id, '7d');

        await Token.bulkCreate([
            {
                userId: user.id,
                token: accessToken,
                type: 'access',
                expiresAt: getExpiration(accessToken)
            },
            {
                userId: user.id,
                token: refreshToken,
                type: 'refresh',
                expiresAt: getExpiration(refreshToken)
            }
        ]);
        res.json({
            id: user.id,
            email: user.email,
            username: user.username,
            accessToken: accessToken,
            refreshToken: refreshToken,
        });     
    } else {
        res.status(401).json('Invalid Email or password');
    }
})

exports.findById = asyncHandler(async (req,res) => {
    try{
        const info = await User.findByPk(req.params.id)
        return res.json({'info': info})
    }catch(error){
      res.status(401).json('id non trouver'); 
    }
    
})

exports.register = [
  upload.upload.single('image'), 
  asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    
    // Vérifiez si un fichier a été uploadé
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Une image est requise'
      });
    }

    // Vérification si l'email existe déjà
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ 
        success: false,
        message: 'Cette adresse email est déjà utilisée' 
      });
    }

    try {
      // Stockez seulement le nom du fichier dans la base de données
      const user = await User.create({ 
        email, 
        password, 
        username,
        image: req.file.filename // seulement le nom du fichier
      });

      res.status(201).json({
        success: true,
        id: user.id,
        email: user.email,
        username: user.username,
        image: user.image
      });     
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Une erreur est survenue lors de l\'inscription' 
      });
    }
  })
];

exports.refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ success: false, message: "Refresh token manquant" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "Utilisateur non trouvé" });
    }

    const accessToken = generateAccessToken(user.id, '30m');
     await Token.bulkCreate([
          {
              userId: user.id,
              token: accessToken,
              type: 'access',
              expiresAt: getExpiration(accessToken)
          }
      ]);
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(403).json({ success: false, message: "Refresh token invalide ou expiré" });
  }
});


exports.logout = asyncHandler(async (req, res) => {
  const { refreshToken, accessToken } = req.body;

  if (!refreshToken && !accessToken) {
    return res.status(400).json({ message: "Refresh token et Access token requis pour se déconnecter" });
  }

  // Révoque tous les tokens de l'utilisateur (ou seulement celui fourni)
  await Token.update(
    { isRevoked: true },
    { where: { token: refreshToken } }
  );

  await Token.update(
    { isRevoked: true },
    { where: { token: accessToken } }
  );

  res.json({ message: "Déconnexion réussie, tokens invalidés" });
});

