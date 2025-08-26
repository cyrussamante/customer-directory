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

async function register(req, res) {
    try {
        //mock register api
        const body = req.body || {}
        if (body.email && body.password){
            let user = {
                id: randomUUID(),
                name: body.name || "Default User",
                email: body.email,
                password: body.password,
                role: body.role || "ADMIN",
                token: randomUUID()
            }
            return res.status(200).json(user);
        }else {
            return res.status(400).json("Invalid request")
        }
    }
    catch (err) {
        console.error('Error occured while registering ', err);
        res.status(500).json({errror: 'internal error'});
    }
}

module.exports = { login, register }