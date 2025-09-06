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

export const generateEventDescription = async (req, res) => {
    try {
        const eventDetails = req.body;

        const startDate = new Date(eventDetails.startDateTime);
        const endDate = new Date(eventDetails.endDateTime);
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedStartDate = startDate.toLocaleDateString('en-US', dateOptions);
        const startTime = startDate.toLocaleTimeString('en-US', timeOptions);
        const formattedEndDate = endDate.toLocaleDateString('en-US', dateOptions);
        const endTime = endDate.toLocaleTimeString('en-US', timeOptions);
        const price = Number(eventDetails.price) || 0;
        const capacity = Number(eventDetails.capacity) || 0;
        const location = eventDetails.location || 'TBA';

        const formattedPrompt = `Generate a compelling description for this event using ONLY the following details:
            Event Name: ${eventDetails.title}
            Start Date: ${formattedStartDate}
            Start Time: ${startTime}
            End Date: ${formattedEndDate}
            End Time: ${endTime}
            Location: ${location}
            Registration Fee: $${price}
            Participant Capacity: ${capacity} people`;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a highly skilled event copywriter.
                    Create a flowing, well-structured description that includes:
                    1. A captivating opening hook to draw readers in
                    2. A clear introduction explaining the event's purpose and experience
                    3. Information about who should attend and why
                    4. The key features and attractions
                    5. Important event details and tips
                    6. A strong call to action for registration
                    
                    Rules:
                    - Write in clear, flowing paragraphs
                    - Use ONLY the provided event details
                    - Don't add fictional features or details
                    - Don't use bullet points or special formatting
                    - Create smooth transitions between topics
                    - Keep each paragraph focused and concise
                    - Write in a professional, engaging tone`
                },
                {
                    role: "user",
                    content: formattedPrompt
                }
            ],
            temperature: 0.3,
            max_tokens: 1000
        });
        res.json({
            description: response.choices[0].message.content.trim()
        });

    } catch (error) {
        console.error('Error generating event description:', error);
        res.status(500).json({
            error: 'Failed to generate event description',
            details: error.message
        });
    }
}