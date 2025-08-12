
const express = require('express');
const path = require('path');
const fs = require('fs');
const customerRouter = require('./routes/customerRoutes');

// Create express app
const app = express();

app.use(express.json());

const imageDirectory = path.join(__dirname, 'images');

app.use('/images', express.static(imageDirectory));

app.use('/api/customers', customerRouter)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`);
})