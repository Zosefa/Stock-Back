const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Article = require('./Article');
const Approvisionnement = require('./Approvisonnement');

const ApprovisionnementProduit = sequelize.define('ApprovisionnementProduit', {
  approvisionnementId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Approvisionnement,
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
   prixUnitaire: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  qte: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'approvisionnement-produit',
  timestamps: true,
});

ApprovisionnementProduit.belongsTo(Article, {
  foreignKey: 'articleId',
  as: 'article',
});

ApprovisionnementProduit.belongsTo(Approvisionnement, {
  foreignKey: 'approvisionnementId',
  as: 'approvisionnement',
});

module.exports = ApprovisionnementProduit;