const Fournisseur = require("../models/Fournisseur");
const asyncHandler = require("express-async-handler");

exports.findFournisseur = asyncHandler(async (req, res)=> {
    const result = await Fournisseur.findAll();

    if(result) {
        res.status(200).json(result);          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})

exports.createFournisseur = asyncHandler(async (req, res)=> {
    const {nom,siege,contact} = req.body;
    const result = await Fournisseur.create({nom,siege,contact});

    if(result) {
        res.status(200).json("Fournisseur creer !");          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})

exports.updateFournisseur = asyncHandler(async (req, res)=> {
    const { nom,siege,contact } = req.body;
    const id = req.params.id;
    const [result] = await Fournisseur.update(
        { nom,siege,contact },
        { where: { id } }
    );

    if(result) {
        res.status(200).json("Fournisseur modifier!");       
    } else {
        res.status(401).json('Une erreur s\'est profuite!');
    }
})

exports.deleteFournisseur = asyncHandler(async (req, res)=> {
    const id = req.params.id;
    const result = await Fournisseur.destroy(
        { where: { id } }
    );

    if(result > 0) {
        res.status(200).json("Fournisseur supprimer!");       
    } else {
        res.status(401).json('Une erreur s\'est profuite!');
    }
})
