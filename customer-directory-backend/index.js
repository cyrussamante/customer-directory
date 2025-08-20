
require('dotenv').config(); // Load the .env file

const express = require('express');
const path = require('path');
const fs = require('fs');
const customerRouter = require('./routes/customerRoutes');
const eventRouter = require('./routes/eventRoutes');
const loginRouter = require('./routes/loginRoutes');
const cors = require('cors');


// Create express app
const app = express();

app.use(cors())
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/customers', customerRouter)
app.use('/api/events', eventRouter)
app.use('/api/account', loginRouter)
app.use('/api/ai', require('./routes/chatRoutes'))

module.exports = {app}; // Allows app to be discoverable for tests

if (require.main === module) {                  
    const PORT = process.env.PORT;
    app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
  }