const express = require('express');
const router = express.Router();
const { signup, login, profile } = require('../controllers/user.Controller');
const { userAuth } = require('../middleware/auth');

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', userAuth,profile);

module.exports = router;
