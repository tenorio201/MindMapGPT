const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.json());

const apiKey = process.env.OPENAI_API_KEY;

app.post('/chat', async (req, res) => {
  const userInput = req.body.message;
  const userInput2 = req.body.message2;
  const responseAmount = parseInt(req.body.message3, 10) || 1;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: userInput2 },
          { role: 'user', content: userInput },
        ],
        max_tokens: 2000,
        n: responseAmount,
        stop: null,
        temperature: 0.9,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    const gptResponses = response.data.choices.map((choice) => choice.message.content.trim());
    res.json({ messages: gptResponses });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching GPT-3 response' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

