
const express = require('express');


const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');



const router = express.Router();

// GET API
router.get('/', getEvents);

// POST /api/events
router.post(
    '/',
    (req, res, next) => Promise
        .resolve(createEvent(req, res))
        .catch(next)
);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;