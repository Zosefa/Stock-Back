const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Article = require('./Article');
const Fournisseur = require('./Fournisseur');

const Approvisionnement = sequelize.define('Approvisionnement', {
   articleId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Article,
      key: 'id',
    },
  },
  fournisseurId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Fournisseur,
      key: 'id',
    },
  },
   prixUnitaire: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  qte: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'approvisionnement',
  timestamps: true,
});

Approvisionnement.belongsTo(Article, {
  foreignKey: 'articleId',
  as: 'article',
});

Approvisionnement.belongsTo(Fournisseur, {
  foreignKey: 'fournisseurId',
  as: 'fournisseur',
});

module.exports = Approvisionnement;