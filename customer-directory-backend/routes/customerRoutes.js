
const express = require('express');


const {getCustomers, createCustomer} = require('../controllers/customerController');




const router = express.Router();

// GET API
router.get('/', getCustomers);

// POST /api/customers
router.post (
    '/',
    (req, res, next) => Promise
    .resolve(createCustomer(req, res))
    .catch(next)
);

module.exports = router;