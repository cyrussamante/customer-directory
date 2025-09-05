import dotenv from "dotenv";
import express from 'express';
import cors from "cors";
import { generateEvent } from './controllers/eventController.js';

dotenv.config();
const app = express();

const corsOptions = {
    origin: [
        process.env.FRONTEND_URL,
        process.env.LOCAL_URL,
        process.env.RENDER_URL
    ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {res.send('Welcome to the AI Event Generator!');});

app.post('/api/generate-event', generateEvent);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`AI assistant running on port ${PORT}`); });