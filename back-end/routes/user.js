const express = require('express');
const User = require('../models/user');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/user/add-user', userController.postAddUser);


module.exports = router;
