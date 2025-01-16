import express from 'express';
import axios from 'axios';

const router = express.Router();

const apiKey = 'SG_9ca6598d9c21e332';
const apiUrl = 'https://api.segmind.com/v1/llama-v3-8b-instruct';

router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      apiUrl,
      {
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: { 'x-api-key': apiKey },
      }
    );

    console.log('API Response:', response.data); // Log the full response for debugging

    // Check the structure of the response data
    if (response.data.choices && response.data.choices.length > 0) {
      res.json({ message: response.data.choices[0].message.content });
    } else {
      res.status(500).json({ error: 'Unexpected API response structure' });
    }
  } catch (error) {
    console.error('Error:', error); // Log the error message for debugging
    res.status(500).json({ error: 'Error fetching chatbot response', details: error.message });
  }
});

export default router;
