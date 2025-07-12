const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ReceptionAchat = require('./ReceptionAchat');
const ApprovisionnementProduit = require('./ApprovisionnementProduit');

const ReceptionProduitAchat = sequelize.define('ReceptionProduitAchat', {
  receptionAchatId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ReceptionAchat,
      key: 'id',
    },
  },
  approvisionnementProduitId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ApprovisionnementProduit,
      key: 'id',
    },
  },
  qteArrive: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'reception-produit-achat',
  timestamps: true,
});

ReceptionProduitAchat.belongsTo(ReceptionAchat, {
  foreignKey: 'receptionAchatId',
  as: 'receptionAchat',
});

ReceptionProduitAchat.belongsTo(ApprovisionnementProduit, {
  foreignKey: 'approvisionnementProduitId',
  as: 'approvisionnementProduit',
});

module.exports = ReceptionProduitAchat;