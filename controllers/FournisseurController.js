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
    try{
        const {numFournisseur,nom,siege,contact} = req.body;
        const result = await Fournisseur.create({numFournisseur,nom,siege,contact});

        if(result) {
            res.status(200).json({ message: "Fournisseur creer !", data: result.id });          
        } else {
            res.status(401).json('Erreur lors de la recuperation !');
        }
    }catch(error){
        res.status(500).json({message: "error de creation de fournisseur" + error.message})
    }
})

exports.updateFournisseur = asyncHandler(async (req, res)=> {
    try{
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
    }catch(error){
        res.status(500).json({message: "error de la modification de fournisseur" + error.message})
    }  
})

exports.deleteFournisseur = asyncHandler(async (req, res)=> {
    try {
        const id = req.params.id;
        const result = await Fournisseur.destroy(
            { where: { id } }
        );

        if(result > 0) {
            res.status(200).json("Fournisseur supprimer!");       
        } else {
            res.status(401).json('Une erreur s\'est profuite!');
        }
    } catch (error) {
        res.status(500).json({message: "error de suppression de fournisseur" + error.message})   
    }
})
