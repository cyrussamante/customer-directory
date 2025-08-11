
const express = require('express');
const customerRouter = require('./routes/customerRoutes')

// Create express app
const app = express();

app.use(express.json());

app.use('/api/customers', customerRouter)

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`);
})