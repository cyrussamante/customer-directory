// services/groqClient.js
const axios = require('axios');

async function askGroq(messages, {
  model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
  temperature = 0.2,
  max_tokens = 600
} = {}) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('Missing GROQ_API_KEY');

  const url = 'https://api.groq.com/openai/v1/chat/completions';
  const { data } = await axios.post(
    url,
    { model, messages, temperature, max_tokens },
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );

  const text = data?.choices?.[0]?.message?.content ?? '';
  return String(text).trim();
}

module.exports = { askGroq };
