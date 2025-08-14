// controllers/customerController.js
const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');
const { faker } = require('@faker-js/faker');
const axios = require('axios').default;

const data = require('../customerData'); // async data layer

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

/** GET /customers?name=... */
async function getCustomers(req, res) {
    try {
        const list = await data.getAllCustomers();
        const q = String(req.query.name || '').toLowerCase();
        const filtered = q ? list.filter(x => (x.name || '').toLowerCase().includes(q)) : list;
        res.json(filtered);
    } catch (err) {
        console.error('getCustomers error:', err);
        res.status(500).json({ error: 'internal error' });
    }
}

async function createCustomer(req, res) {

    try {
        const body = req.body || {};
        let id = randomUUID();

        imageUrl = defaultImagePath;
        // If gender follows the given rules
        if (body.gender === 'male' || body.gender === 'female') {
            imageUrl = await generateImage(id, body.gender)
        }
        
        const newCustomer = {
            id,
            name: String(body.name),
            age: body.age,
            gender: body.gender,
            email: body.email,
            password: String(body.password),
            address: String(body.address),
            imageUrl,
            numberOfOrders: body.numberOfOrders
        }
        
        // Create Customer
        const create = await data.createCustomer(newCustomer)

        return res.status(200).json(create);
    }

    catch (err) {
        console.error('Error occured while creating customer: ', err);
        res.status(500).json({ errror: 'internal error' });
    }
}

async function updateCustomer(req, res) {

    try {
        const { id } = req.params;
        const body = req.body || {};

        const checkCustomer = await data.getCustomerById(id);

        if (!checkCustomer) {
            return res.status(404).json({ message: 'Customer not found.' });
        }

        const updated = await data.updateCustomer(id, body);
        if (!updated) return res.status(404).json({ message: 'Unable to update customer info' });

        return res.json(updated)

    }

    catch (err) {
        console.error('Error occured while updating customer info: ', err);
        res.status(500).json({ errror: 'internal error' });
    }

}

async function deleteCustomer(req, res) {

    try {
        const { id } = req.params;
        const ok = await data.deleteCustomer(id);
        if (!ok) return res.status(404).json({ message: 'Customer not found.' });
        return res.status(204).end();
    } catch (err) {
        console.error('Unable to delete customer:', err);
        res.status(500).json({ error: 'internal error' });
    }

}

module.exports = { getCustomers, createCustomer, updateCustomer, deleteCustomer }