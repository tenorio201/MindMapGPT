const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

const apiKey = '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';

app.post('/chat', async (req, res) => {
	const userInput = req.body.message;
const userInput2=req.body.message2;
	const userInput3=req.body.message3;
	const number=parseInt(userInput3);
	try {
		const response = await axios.post(
			'https://api.openai.com/v1/chat/completions',

			{
				model: 'gpt-3.5-turbo',
				messages: [
					{ role: 'system', content: userInput2 },
					{ role: 'user', content: userInput },
				],
				max_tokens: 4000,
				n: number,
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

	const gptResponses = response.data.choices.map(choice => choice.message.content.trim());
		res.json({ messages: gptResponses });

	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error fetching GPT-3 response' });
	}
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});

