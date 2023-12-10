// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/:id/create_report', authMiddleware, reportController.createReport);
router.get('/:id/all_reports', authMiddleware, reportController.getAllReportsForPatient);
router.get('/:status', authMiddleware, reportController.getAllReportsByStatus);

module.exports = router;
