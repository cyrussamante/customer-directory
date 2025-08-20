
const express = require('express');


const { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');



const router = express.Router();

// GET API
router.get('/', getCustomers);

router.get('/:id', getCustomer);

// POST /api/customers
router.post(
    '/',
    (req, res, next) => Promise
        .resolve(createCustomer(req, res))
        .catch(next)
);

router.put('/:id', updateCustomer);

router.delete('/:id', deleteCustomer)

module.exports = router;