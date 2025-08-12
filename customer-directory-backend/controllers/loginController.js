const {randomUUID} = require('crypto');

async function login(req, res) {
    try {
        //mock login api
        let token = randomUUID();
        return res.status(200).json(token);
    }
    catch (err) {
        console.error('Error occured while logging in ', err);
        res.status(500).json({errror: 'internal error'});
    }
}

module.exports = {login}