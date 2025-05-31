const Client = require("../models/Client");
const asyncHandler = require("express-async-handler");

exports.findClient = asyncHandler(async (req, res)=> {
    const result = await Client.findAll();

    if(result) {
        res.status(200).json(result);          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})

exports.createClient = asyncHandler(async (req, res)=> {
    const {nom,prenom,adresse,tel} = req.body;
    const result = await Client.create({nom,prenom,adresse,tel});

    if(result) {
        res.status(200).json("Client creer !");          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})

exports.updateClient = asyncHandler(async (req, res)=> {
    const { nom,prenom,adresse,tel } = req.body;
    const id = req.params.id;
    const [result] = await Client.update(
        { nom,prenom,adresse,tel },
        { where: { id } }
    );

    if(result) {
        res.status(200).json("Client modifier!");       
    } else {
        res.status(401).json('Une erreur s\'est profuite!');
    }
})

exports.deleteClient = asyncHandler(async (req, res)=> {
    const id = req.params.id;
    const result = await Client.destroy(
        { where: { id } }
    );

    if(result > 0) {
        res.status(200).json("Client supprimer!");       
    } else {
        res.status(401).json('Une erreur s\'est profuite!');
    }
})
