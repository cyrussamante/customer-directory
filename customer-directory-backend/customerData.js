// customerData.js
const fs = require('fs/promises');
const path = require('path');

const dataPath = path.join(__dirname, 'data.json');

async function loadFile() {
    const rawData = await fs.readFile(dataPath, 'utf-8');
    const parsedData = JSON.parse(rawData);

    return parsedData;
}

async function saveFile(db) {
    const content = JSON.stringify(db, null, 2);
    await fs.writeFile(dataPath, content, 'utf8');
}

function formatCustomerDetails(customer) {
    const formatted = { ...customer };
    if ('age' in formatted) formatted.age = Number(formatted.age);
    if ('numberOfOrders' in formatted) formatted.numberOfOrders = Number(formatted.numberOfOrders);
    return formatted;
}

async function getAllCustomers() {
    const db = await loadFile();
    return db.customers;
}

async function getCustomerById(id) {
    const db = await loadFile();
    return db.customers.find(x => String(x.id) === String(id)) || null;
}

async function createCustomer(customer) {
    if (!customer || !customer.id) {
        throw new Error('createCustomer: missing id (controller must assign UUID)');
    }

    const db = await loadFile();

    const formatted = formatCustomerDetails(customer);
    db.customers.push(formatted);
    await saveFile(db);
    return formatted;
}

async function updateCustomer(id, update) {
    const db = await loadFile();
    const index = db.customers.findIndex(x => String(x.id) === String(id));
    if (index === -1) throw new Error("Unable to find customer");

    const formatted = formatCustomerDetails(update);
    db.customers[index] = {
        ...db.customers[index],
        ...formatted,
        id: db.customers[index].id, //Keep the id as it was before
    };

    await saveFile(db);
    return db.customers[index];
}

async function deleteCustomer(id) {
    const db = await loadFile();


    const customer = db.customers.find(c => String(c.id) === String(id));
    if (!customer) return false;

    // Delete associated image if not default
    if (customer.imageUrl && customer.imageUrl !== '/images/default_image.png') {
        try {
            const imgFile = path.join(path.join(__dirname, 'images'), path.basename(customer.imageUrl));
            await fs.unlink(imgFile);
        } catch (err) {
            console.warn(`Could not delete image file for ${id}:`, err.message);
        }
    }

    // Remove customer from the array
    db.customers = db.customers.filter(c => String(c.id) !== String(id));
    await saveFile(db);

    return true;
}

module.exports = {
    getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer,
};
