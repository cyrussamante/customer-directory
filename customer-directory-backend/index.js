
const express = require('express');

// Create express app
const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening on localhost:${PORT}`);
})