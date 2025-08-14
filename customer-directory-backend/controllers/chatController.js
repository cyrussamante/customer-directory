
const { askGroq } = require('../services/groqClient');
const data = require('../customerData');

// pick only fields that matter to keep token-use small
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
                    `You are a precise assistant answering ONLY from the JSON provided by the user.
                    If the answer isn't present the JSON, say "I can't find that in the data."
                    Prefer concise, factual replies. When listing customers, include name and numberOfOrders if relevant.
                    If the user asks for counts or thresholds (e.g., "more than 5 orders"), compute from the JSON.`
                                },
                                {
                                    role: 'user',
                                    content:
                                        `DATA (JSON):
                    ${JSON.stringify(payload)}

                    QUESTION:
                    ${question}

                    Return the answer in **plain text** (markdown OK). Do not invent data.
                    Certainly no scope for hallucinations, PLEASE..
                    `
            }
        ];

        const answer = await askGroq(messages, { temperature: 0.2, max_tokens: 500 });
        return res.json({ answer });
    } catch (err) {
        console.error('AI chat error:', err);
        return res.status(500).json({ answer: 'Internal error.' });
    }
}

module.exports = { chat };
