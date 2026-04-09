// Netlify Function: netlify/functions/chat.js
// Simple proxy to OpenAI Chat Completions API.
// Set OPENAI_API_KEY in Netlify environment variables (Site settings -> Build & deploy -> Environment).

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const question = body.question || body.prompt || '';
  if (!question) return { statusCode: 400, body: JSON.stringify({ error: 'Missing question/prompt in body' }) };

  const OPENAI_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_KEY) return { statusCode: 500, body: JSON.stringify({ error: 'Server not configured: missing OPENAI_API_KEY' }) };

  try {
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that responds concisely.' },
          { role: 'user', content: question }
        ],
        max_tokens: 400,
        temperature: 0.2,
      }),
    });

    const data = await resp.json();
    const answer = data?.choices?.[0]?.message?.content || null;
    return { statusCode: 200, body: JSON.stringify({ answer, raw: data }) };
  } catch (err) {
    console.error('OpenAI proxy error', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'OpenAI request failed' }) };
  }
};
