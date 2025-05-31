const { Op } = require("sequelize");
const sequelize = require('../config/db'); // Import manquant
const Client = require('../models/Client');
const Vente = require('../models/Vente');
const Article = require('../models/Article');
const Approvisionnement = require('../models/Approvisonnement'); // Correction orthographe

// Clients par mois de l'année courante
// Dans votre contrôleur
exports.getClientsPerMonth = async (req, res) => {
  try {
    const year = req.query.year || new Date().getFullYear();
    
    const clients = await Client.findAll({
      attributes: [
        [sequelize.fn('MONTH', sequelize.col('createdAt')), 'month'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      where: {
        createdAt: {
          [Op.between]: [
            new Date(`${year}-01-01`),
            new Date(`${year}-12-31`)
          ]
        }
      },
      group: [sequelize.fn('MONTH', sequelize.col('createdAt'))],
      order: [[sequelize.fn('MONTH', sequelize.col('createdAt')), 'ASC']],
      raw: true
    });
    
    res.json(clients);
  } catch (err) {
    // Gestion des erreurs
  }
};

exports.getAvailableYears = async (req, res) => {
  try {
    const years = await Client.findAll({
      attributes: [
        [sequelize.fn('DISTINCT', sequelize.fn('YEAR', sequelize.col('createdAt'))), 'year']
      ],
      order: [['year', 'DESC']],
      raw: true
    });
    
    res.json(years.map(item => item.year));
  } catch (err) {
    // Gestion des erreurs
  }
};

// Ventes par année
exports.getVentesPerYear = async (req, res) => {
  try {
    const ventes = await Vente.findAll({
      attributes: [
        [sequelize.fn('YEAR', sequelize.col('Vente.createdAt')), 'year'], // Spécifier la table
        [sequelize.fn('COUNT', sequelize.col('Vente.id')), 'count'],
        [sequelize.fn('SUM', sequelize.literal('Vente.qte * article.prixUnitaire')), 'total']
      ],
      include: [{
        model: Article,
        as: 'article',
        attributes: []
      }],
      group: [sequelize.fn('YEAR', sequelize.col('Vente.createdAt'))],
      order: [[sequelize.fn('YEAR', sequelize.col('Vente.createdAt')), 'DESC']],
      raw: true
    });
    
    res.json(ventes);
  } catch (err) {
    console.error('Erreur ventes par année:', err);
    res.status(500).json({ message: 'Erreur lors de la récupération des ventes par année' });
  }
};

// Approvisionnements par année avec montant total
exports.getApproPerYear = async (req, res) => {
  try {
    const appro = await Approvisionnement.findAll({
      attributes: [
        [sequelize.fn('YEAR', sequelize.col('createdAt')), 'year'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
        [sequelize.fn('SUM', sequelize.literal('qte * prixUnitaire')), 'total']
      ],
      group: [sequelize.fn('YEAR', sequelize.col('createdAt'))],
      order: [[sequelize.fn('YEAR', sequelize.col('createdAt')), 'DESC']],
      raw: true
    });
    
    res.json(appro);
  } catch (err) {
    console.error('Erreur approvisionnements par année:', err);
    res.status(500).json({ message: 'Erreur lors de la récupération des approvisionnements par année' });
  }
};