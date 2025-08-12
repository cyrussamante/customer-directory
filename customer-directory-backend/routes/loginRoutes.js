
const express = require('express');


const {login} = require('../controllers/loginController');


const router = express.Router();


router.post (
    '/',
    (req, res, next) => Promise
    .resolve(login(req, res))
    .catch(next)
);

module.exports = router;