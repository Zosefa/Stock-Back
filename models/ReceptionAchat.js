const { DataTypes, NOW } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Approvisionnement = require('./Approvisonnement');

const ReceptionAchat = sequelize.define('ReceptionAchat', {
  approvisionnementId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Approvisionnement,
      key: 'id',
    },
  },
  userId: {
    type:DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: User,
        key: 'id'
    }
  },
  etat: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  tableName: 'reception-achat',
  timestamps: true,
});

ReceptionAchat.belongsTo(User, {
  foreignKey: 'userId',
  as: 'users',
});

ReceptionAchat.belongsTo(Approvisionnement, {
  foreignKey: 'approvisionnementId',
  as: 'approvisionnement',
});

module.exports = ReceptionAchat;