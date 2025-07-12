const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Fournisseur = require('./Fournisseur');

const Approvisionnement = sequelize.define('Approvisionnement', {
  numeroAchat:{
    type: DataTypes.STRING,
    allowNull: false
  },
  fournisseurId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Fournisseur,
      key: 'id',
    },
  },
   etat: {
    type: DataTypes.ENUM('EN ATTANTE, VALIDER, REJETER, RECEPTIONNER'),
    allowNull: false,
  }
}, {
  tableName: 'approvisionnement',
  timestamps: true,
});

Approvisionnement.belongsTo(Fournisseur, {
  foreignKey: 'fournisseurId',
  as: 'fournisseur',
});

module.exports = Approvisionnement;