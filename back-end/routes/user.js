const express = require('express');
const User = require('../models/user');
const userController = require('../controllers/user');
const userAuthentication = require("../middleware/auth");

const router = express.Router();

router.post('/user/sign-up', userController.postUserSignUp);
router.get("/isPremiumUser", userAuthentication, userController.isPremiumUser);
router.post('/user/login', userController.postUserLogin);


module.exports = router;
