
const express = require('express');


const {getCustomers, createCustomer, updateCustomer, deleteCustomer} = require('../controllers/customerController');




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

router.put('/customers/:id', updateCustomer);

router.delete('/customers/:id', deleteCustomer)

module.exports = router;