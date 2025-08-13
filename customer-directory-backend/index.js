
const express = require('express');
const path = require('path');
const fs = require('fs');
const customerRouter = require('./routes/customerRoutes');
const loginRouter = require('./routes/loginRoutes');

// Create express app
const app = express();

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/customers', customerRouter)
app.use('/api/login', loginRouter)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`);
})