const { askGroq } = require('../external/groqClient');
const data = require('../customerData');

function projectCustomers(customers) {
  return customers.map(c => ({
    id: String(c.id),
    name: c.name ?? '',
    email: c.email ?? '',
    numberOfOrders: Number(c.numberOfOrders || 0),
    age: c.age ?? null,
    gender: c.gender ?? '',
    address: c.address ?? ''
  }));
}

async function chat(req, res) {
  try {
    const question = String(req.body?.question || '').trim();
    if (!question) return res.status(400).json({ answer: 'Please include a "question".' });

    const customers = await data.getAllCustomers();
    const payload = { customers: projectCustomers(customers) };

    const messages = [
      {
        role: 'system',
        content:
`You answer ONLY from the JSON provided by the user.
If the answer isn't in the JSON, say "Unable to find the response to your query in the data."
Be concise; when listing, include name and numberOfOrders when relevant.`
      },
      {
        role: 'user',
        content:
`DATA:
${JSON.stringify(payload, null, 2)}

QUESTION: ${question}

Return your response in plain text or short markdown format.
No hallucinations, PLEASE..`
      }
    ];

    const answer = await askGroq(messages, { temperature: 0.2, max_tokens: 500 });
    res.json({ answer });
  } catch (err) {
    console.error('AI chat error:', err);
    res.status(500).json({ answer: 'Internal error.' });
  }
}

module.exports = { chat };
