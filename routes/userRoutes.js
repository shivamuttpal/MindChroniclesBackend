
const express = require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/userContoller');

const router = express.Router()

//Get ALL Users || GET
router.get('/all-user',getAllUsers);

// Create User || POST
router.post('/register',registerController);

//LOGIN || POST
router.post('/login',loginController);

module.exports = router; 