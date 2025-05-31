const Stock = require("../models/Stock");
const Article = require("../models/Article");
const asyncHandler = require("express-async-handler");

exports.findStock = asyncHandler(async (req, res)=> {
    const result = await Stock.findAll({
    include: [
      {
        model: Article,
        as: 'article', 
      },
    ],
  });

    if(result) {
        res.status(200).json(result);          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})


exports.createStock = asyncHandler(async (req, res)=> {
    const {articleId,stock} = req.body;
    const result = await Stock.create({articleId,stock});

    if(result) {
        res.status(200).json("Stock ajouter !");          
    } else {
        res.status(401).json('Erreur lors de la recuperation !');
    }
})

exports.updateStock = asyncHandler(async (req, res)=> {
    const { articleId,stock } = req.body;
    const id = req.params.id;

    const stockActuel = Stock.findByPk(id);

    if(stockModel){
        const newSTock = Number(stockActuel.stock) + Number(stock);
        const [result] = await Stock.update(
            { articleId,stock : newSTock },
            { where: { id } }
        );

        if(result) {
            res.status(200).json("Stock ajouter !");       
        } else {
            res.status(401).json('Une erreur s\'est profuite!');
        }
    }
})
