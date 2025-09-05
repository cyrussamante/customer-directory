import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set in environment variables');
    throw new Error('OPENAI_API_KEY is required');
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const generateEvent = async (req, res) => {
    try {
        const { prompt } = req.body;
        
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a highly skilled event planner assistant. 
                    Use ONLY the provided context to answer questions. 
                    If context is insufficient, say 'I cannot answer this based on the provided information.'
                    Your task is to generate a detailed event description.
                    Provide your response in the following structured JSON format with these fields:
                    - title: string
                    - startDateTime: ISO date string (for near future)
                    - endDateTime: ISO date string (should be after startDateTime)
                    - location: string (as specified in prompt otherwise empty string)
                    - price: number (as specified in prompt otherwise 0)
                    - description: string (elaborate creatively based on prompt in 2-3 paragraphs)
                    - capacity: number (as specified in prompt otherwise 0)
                    Ensure the JSON is properly formatted.
                    Keep the response concise and realistic.`
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 500
        });

        const eventData = JSON.parse(response.choices[0].message.content);
        res.json(eventData);
    } catch (error) {
        console.error('Error generating event:', error);
        res.status(500).json({ error: 'Failed to generate event details' });
    }
}