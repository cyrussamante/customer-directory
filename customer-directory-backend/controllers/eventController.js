// controllers/eventController.js
const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');
const axios = require('axios').default;

const data = require('../eventData'); // async data layer

const imageDirectory = path.join(__dirname, '..', 'images');
const defaultImagePath = '/images/default.png';


// Generate and save image (PNG)
async function generateImage(id, gender) {
    try {
        const url = faker.image.personPortrait({ sex: gender, size: 512 });
        const response = await axios.get(url, { responseType: 'arraybuffer' }); // <-- const + await
        const arrayBuffer = Buffer.from(response.data);

        const filename = `customer-${id}.png`;
        const filePath = path.join(imageDirectory, filename);

        await fs.writeFileSync(filePath, arrayBuffer);
        return `/images/${filename}`;
    } catch (e) {
        console.error('generateImage failed:', e.message);
        return defaultImagePath;
    }
}

/** GET /events?name=... */
async function getEvents(req, res) {
    try {
        const list = await data.getAllEvents();
        const q = String(req.query.name || '').toLowerCase();
        const filtered = q ? list.filter(x => (x.title || '').toLowerCase().includes(q)) : list;
        res.json(filtered);
    } catch (err) {
        console.error('getEvents error:', err);
        res.status(500).json({ error: 'internal error' });
    }
}

async function createEvent(req, res) {

    try {
        const body = req.body || {};
        let id = randomUUID();

        imageUrl = defaultImagePath;
        // If gender follows the given rules
        if (body.gender === 'male' || body.gender === 'female') {
            imageUrl = await generateImage(id, body.gender)
        }

        const newEvent = {
            id,
            title: String(body.title),
            startDateTime: body.startDateTime,
            location: String(body.location),
            price: body.price,
            bannerImage: String(body.bannerImage),
            description: String(body.description),
            capacity: body.capacity
        }

        // Create Event
        const create = await data.createEvent(newEvent)

        return res.status(200).json(create);
    }

    catch (err) {
        console.error('Error occured while creating event: ', err);
        res.status(500).json({ errror: 'internal error' });
    }
}

async function updateEvent(req, res) {

    try {
        const { id } = req.params;
        const body = req.body || {};

        const checkEvent = await data.getEventById(id);

        if (!checkEvent) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        const updated = await data.updateEvent(id, body);
        if (!updated) return res.status(404).json({ message: 'Unable to update event info' });

        return res.json(updated)

    }

    catch (err) {
        console.error('Error occured while updating event info: ', err);
        res.status(500).json({ errror: 'internal error' });
    }

}

async function deleteEvent(req, res) {

    try {
        const { id } = req.params;
        const ok = await data.deleteEvent(id);
        if (!ok) return res.status(404).json({ message: 'Event not found.' });
        return res.status(204).end();
    } catch (err) {
        console.error('Unable to delete event:', err);
        res.status(500).json({ error: 'internal error' });
    }

}

module.exports = { getEvents, createEvent, updateEvent, deleteEvent }