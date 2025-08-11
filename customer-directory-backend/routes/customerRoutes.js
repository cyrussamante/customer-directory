
const express = require('express');

const {getCustomers} = require('../controllers/customerController');


const router = express.Router();

// GET API
router.get('/', getCustomers);

module.exports = router;