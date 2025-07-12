const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Fournisseur = sequelize.define('Fournisseur', {
  numFournisseur: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  siege: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'fournisseur',
  timestamps: true,
});


module.exports = Fournisseur;