const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/DashboardController');

router.get('/clients-per-month', dashboardController.getClientsPerMonth);
router.get('/ventes-per-year', dashboardController.getVentesPerYear);
router.get('/appro-per-year', dashboardController.getApproPerYear);
router.get('/available-years', dashboardController.getAvailableYears);

module.exports = router;
