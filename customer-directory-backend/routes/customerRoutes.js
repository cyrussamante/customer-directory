
const express = require('express');

const {listCustomers} = require('../controllers/customerController');


const router = express.router();

// GET API
router.get(listCustomers);

module.exports(router);