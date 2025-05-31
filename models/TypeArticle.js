const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TypeArticle = sequelize.define('TypeArticle', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'type_article',
  timestamps: true,
});

module.exports = TypeArticle;