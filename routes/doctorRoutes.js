const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/register', doctorController.register);
router.post('/login', doctorController.login);

module.exports = router;
