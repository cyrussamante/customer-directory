const {randomUUID} = require('crypto');

async function login(req, res) {
    try {
        //mock login api
        const body = req.body || {}
        if (body.email === "wasadmin@test.com" && body.password ==="1234"){
            let token = randomUUID();
            return res.status(200).json(token);
        }else {
            return res.status(401).json("Invalid credentails")
        }
    }
    catch (err) {
        console.error('Error occured while logging in ', err);
        res.status(500).json({errror: 'internal error'});
    }
}

module.exports = { login }