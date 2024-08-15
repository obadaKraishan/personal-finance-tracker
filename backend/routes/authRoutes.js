const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register); // Allow passing role during registration
router.post('/login', login);

module.exports = router;
