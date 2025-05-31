const Article = require("../models/Article");
const TypeArticle = require("../models/TypeArticle");
const asyncHandler = require("express-async-handler");
const uploadArticle = require('../config/multer');
const Stock = require('../models/Stock')

exports.findArticle = asyncHandler(async (req, res)=> {
    const result = await Article.findAll({
        include: [{
        model: TypeArticle,
        as: 'type',
        attributes: ['id', 'type'] // ne pas inclure toute la table si inutile
        }]
    });

    if(result) {
        res.status(200).json(result);          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})

exports.createArticle = [
uploadArticle.uploadArticle.single('image'),

asyncHandler(async (req, res)=> {
    const {article,prixUnitaire,description,typeId} = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Une image est requise'
      });
    }

    const result = await Article.create({article,prixUnitaire,image: req.file.filename,description,typeId});

    if(result) {
        await Stock.create(
            { articleId : result.id, stock : 0 }
        )
        res.status(200).json("Article creer !");          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})
];

exports.updateArticle = [
  uploadArticle.uploadArticle.single('image'),
  asyncHandler(async (req, res) => {
    const { article, prixUnitaire, description, typeId } = req.body;
    const id = req.params.id;

    const updateData = {
      article,
      prixUnitaire,
      description,
      typeId
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const [result] = await Article.update(updateData, {
      where: { id }
    });

    if (result) {
      res.status(200).json("Article modifié !");
    } else {
      res.status(401).json("Une erreur s'est produite !");
    }
  })
];


exports.deleteArticle = asyncHandler(async (req, res)=> {
    const id = req.params.id;
    const result = await Article.destroy(
        { where: { id } }
    );

    if(result > 0) {
        res.status(200).json("Article supprimer!");       
    } else {
        res.status(401).json('Une erreur s\'est profuite!');
    }
})
