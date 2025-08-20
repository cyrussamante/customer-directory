
const express = require('express');


const {login, register} = require('../controllers/loginController');


const router = express.Router();

// POST /api/account/login
router.post(
    '/login',
    (req, res, next) => Promise
        .resolve(login(req, res))
        .catch(next)
);

// POST /api/account/register
router.post(
    '/register',
    (req, res, next) => Promise
        .resolve(register(req, res))
        .catch(next)
);

module.exports = router;