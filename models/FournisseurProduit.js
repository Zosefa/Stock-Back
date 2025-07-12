const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Article = require('./Article');
const Fournisseur = require('./Fournisseur');

const FournisseurProduit = sequelize.define('FournisseurProduit', {
  fournisseurId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Fournisseur,
      key: 'id',
    },
  },
   articleId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Article,
      key: 'id',
    },
  },
}, {
  tableName: 'fournisseur-produit',
  timestamps: true,
});

FournisseurProduit.belongsTo(Article, {
  foreignKey: 'articleId',
  as: 'article',
});

FournisseurProduit.belongsTo(Fournisseur, {
  foreignKey: 'fournisseurId',
  as: 'fournisseur',
});

module.exports = FournisseurProduit;