const Approvisionnement = require("../models/Approvisonnement");
const ApprovisionnementProduit = require("../models/ApprovisionnementProduit");
const Stock = require("../models/Stock");
const asyncHandler = require("express-async-handler");
const Fournisseur = require("../models/Fournisseur");
const Article = require("../models/Article");

exports.findApprovisionnement = asyncHandler(async (req, res)=> {
    const result = await Approvisionnement.findAll({
        include: [
            {
                model: Fournisseur,
                as: 'fournisseur',
                attributes: ['id', 'nom'] 
            }]
    });

    if(result) {
        res.status(200).json(result);          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})

exports.createApprovisionnement = asyncHandler(async (req, res)=> {
    try{
        const {numeroAchat,fournisseurId,etat} = req.body;

        const result = await Approvisionnement.create({numeroAchat,fournisseurId,etat});

        if(result) {
            res.status(200).json({msg:"Approvisionement inserer !", data: result});          
        }
    }catch(error){
        res.status(500).json({ message: "Erreur d'insertion d'approvisionnement", error: error.message });
    }
})

exports.createProduitAchat = asyncHandler(async (req, res) => {
    try{
        const {id,produitAchat} = req.body;
 
        const achat = await Approvisionnement.findByPk(id);
        if (!achat) return res.status(404).json({message: "achat non trouver"});

        const produitAchatToCreate = produitAchat.map(p => ({
            ...p,
            approvisionnementId: achat.id
        }));

        await ApprovisionnementProduit.bulkCreate(produitAchatToCreate);
        return res.status(201).json({ message: "Produit Achat inserer !" });

    }catch(error){
        res.status(500).json({ message: "Erreur d'insertion de produit d'approvisionnement", error: error.message });
    }
});

exports.findById = asyncHandler(async (req, res) => {
    const result = await Approvisionnement.findByPk(req.params.id);

    if(result) {
        res.status(200).json(result);          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})
