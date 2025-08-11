
// module to generate customer id
//const {randomUUID} = require('node: crypto');
const {customers} = require('../customerData');
/*
 Get API that retrieves the list of customers along with search
*/

function getCustomers(req, res) {

    const query = String(req.query.name || '').toLowerCase();
    // If search parameter isn given, perform it, otherwise provide the entire list
    const data = query ? customers.filter(x => x.name.toLowerCase().includes(query)) : customers;
    // Send the data back as a JSON object
    res.json(data);
}

module.exports = {getCustomers}