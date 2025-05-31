const typeArticle = require("../models/TypeArticle");
const asyncHandler = require("express-async-handler");

exports.findType = asyncHandler(async (req, res)=> {
    const type = await typeArticle.findAll();

    if(type) {
        res.status(200).json(type);          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})

exports.createType = asyncHandler(async (req, res)=> {
    const {type} = req.body;
    const result = await typeArticle.create({type});

    if(result) {
        res.status(200).json("Type creer !");          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})

exports.updateType = asyncHandler(async (req, res)=> {
    const { type } = req.body;
    const id = req.params.id;
    const [result] = await typeArticle.update(
        { type },
        { where: { id } }
    );

    if(result) {
        res.status(200).json("Type Article modifier!");       
    } else {
        res.status(401).json('Une erreur s\'est profuite!');
    }
})

exports.deleteType = asyncHandler(async (req, res)=> {
    const id = req.params.id;
    const result = await typeArticle.destroy(
        { where: { id } }
    );

    if (result > 0) {
        console.log('tong ato')
        res.status(200).json("Type Article supprimé !");
    } else {
        res.status(404).json("Type Article introuvable ou déjà supprimé.");
    }
})
