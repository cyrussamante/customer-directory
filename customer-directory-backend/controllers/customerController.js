
// module to generate customer id
const {randomUUID} = require('crypto');
// Convert all images to .png for simplicity
const fs = require('fs');
const path = require('path');

const {customers} = require('../customerData');
const { faker } = require('@faker-js/faker');
const { default: axios } = require('axios');

const imageDirectory = path.join(__dirname, '..', 'images');
const defaultImagePath = 'images/default_image.png';


// Generate and save image in .jpg format
async function generateImage(id, gender) {

        const url = faker.image.personPortrait({sex:gender, size:512});
        response = await axios.get(url, {'responseType': 'arraybuffer'});

        const arrayBuffer = Buffer.from(response.data);

        const filename = `customer-${id}-${Date.now()}.png`;
        const filePath = path.join(imageDirectory, filename);

        fs.writeFileSync(filePath, arrayBuffer);


        return `/images/${filename}`


}



/*
 Get API that retrieves the list of customers along with search
*/
async function getCustomers(req, res) {

    const query = String(req.query.name || '').toLowerCase();
    // If search parameter isn given, perform it, otherwise provide the entire list
    const data = query ? customers.filter(x => x.name.toLowerCase().includes(query)) : customers;
    // Send the data back as a JSON object
    res.json(data);
}

async function createCustomer(req, res) {

    try {
        const body = req.body || {} ;

        let id = randomUUID();

        while (customers.some(c => c.id === id)) id = randomUUID(); // prevent duplication of id
       
        imageUrl = await generateImage(id, body.gender)
        

        const createCustomer = {
            id,
            name: String(body.name),
            age: body.age,
            gender:body.gender,
            email: body.email,
            password: String(body.password),
            address: String(body.address),
            imageUrl,
            numberOfOrders: body.numberOfOrders
        }

        customers.push(createCustomer);

        return res.status(200).json(createCustomer);
    }

    catch (err) {
        console.error('Error occured while creating customer: ', err);
        res.status(500).json({errror: 'internal error'});
    }
}

module.exports = {getCustomers, createCustomer}