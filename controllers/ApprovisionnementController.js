const Approvisionnement = require("../models/Approvisonnement");
const Stock = require("../models/Stock");
const asyncHandler = require("express-async-handler");
const Fournisseur = require("../models/Fournisseur");
const Article = require("../models/Article");

exports.findApprovisionnement = asyncHandler(async (req, res)=> {
    const result = await Approvisionnement.findAll({
        include: [{
        model: Article,
        as: 'article',
        attributes: ['id', 'article'] // ne pas inclure toute la table si inutile
        },
        {
        model: Fournisseur,
        as: 'fournisseur',
        attributes: ['id', 'nom'] // ne pas inclure toute la table si inutile
        }]
    });

    if(result) {
        res.status(200).json(result);          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})

exports.createApprovisionnement = asyncHandler(async (req, res)=> {
    const {articleId,fournisseurId,prixUnitaire,qte} = req.body;

    const stockProudit = await Stock.findOne({ where: {articleId} })

    if(stockProudit)
    {
        const result = await Approvisionnement.create({articleId,fournisseurId,prixUnitaire,qte});
        const newStock = Number(stockProudit.stock) + Number(qte);

        await Stock.update(
            { stock : newStock },
            { where: { id : stockProudit.id } }
        )

        if(result) {
            res.status(200).json("Approvisionement inserer !");          
        } else {
            res.status(401).json('Erreur lors de la recuperation !');
        }
    }
})

exports.findById = asyncHandler(async (req, res) => {
    const result = await Approvisionnement.findByPk(req.params.id);

    if(result) {
        res.status(200).json(result);          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})
