const Vente = require("../models/Vente");
const Stock = require("../models/Stock");
const asyncHandler = require("express-async-handler");
const Article = require('../models/Article');
const Client = require('../models/Client');

exports.findVente = asyncHandler(async (req, res)=> {
    const result = await Vente.findAll({
        include: [{
        model: Article,
        as: 'article',
        attributes: ['id', 'article', 'prixUnitaire'] // ne pas inclure toute la table si inutile
        },
        {
        model: Client,
        as: 'client',
        attributes: ['id', 'nom'] // ne pas inclure toute la table si inutile
        }]
    });

    if(result) {
        res.status(200).json(result);          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})

exports.creteVente = asyncHandler(async (req, res)=> {
    const {articleId,clientId,qte} = req.body;

    const stockProudit = await Stock.findOne({ where: {articleId} })

    if(stockProudit)
    {
        if(Number(stockProudit.stock) >= Number(qte)){
            const result = await Vente.create({articleId,clientId,qte});
            const newStock = Number(stockProudit.stock) - Number(qte);

            await Stock.update(
                { stock : newStock },
                { where: { id : stockProudit.id } }
            )

            if(result) {
                res.status(200).json("Vente inserer !");          
            } else {
                res.status(401).json('Erreur lors de la recuperation !');
            }
        }else{
            res.status(200).json({'status':false, 'msg': 'Stock insuffisant !'})
        }
    }
})

exports.findById = asyncHandler(async (req, res) => {
    const result = await Vente.findByPk(req.params.id);

    if(result) {
        res.status(200).json(result);          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})
