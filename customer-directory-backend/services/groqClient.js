const axios = require('axios');

async function askGroq(messages, {
  model = process.env.GROQ_MODEL || 'llama-3.1-8b-instant',
  temperature = 0.2,
  max_tokens = 600
} = {}) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('Missing GROQ_API_KEY');

  const { data } = await axios.post(
    'https://api.groq.com/openai/v1/chat/completions',
    { model, messages, temperature, max_tokens },
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );
  return (data?.choices?.[0]?.message?.content || '').trim();
}

module.exports = { askGroq };
