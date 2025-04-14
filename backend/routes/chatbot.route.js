// import express from 'express';
// import axios from 'axios';

// const router = express.Router();

// const apiKey = 'SG_c360d8b1ab648e8d';
// const apiUrl = 'https://api.segmind.com/v1/llama-v3-8b-instruct';
// // const apiUrl ='https://api.segmind.com/v1/llama-2-7b-chat';


// router.post('/chat', async (req, res) => {
//   const { message } = req.body;

//   try {
//     // const response = await axios.post(
//     //   apiUrl,
//     //   {
//     //     messages: [{ role: 'user', content: message }],
//     //   },
//     //   {
//     //     headers: { 'x-api-key': apiKey },
//     //   }
//     // );

//     const response = await axios.post(
//       'https://openrouter.ai/api/v1/chat/completions',
//       {
//         model: 'openai/gpt-3.5-turbo',
//         messages: [{ role: 'user', content: message }],
//       },
//       {
//         headers: {
//           'Authorization': 'Bearer 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',
//           'Content-Type': 'application/json',
//         },
//       }
//     );
    
//     console.log('API Response:', response.data); 

//     if (response.data.choices && response.data.choices.length > 0) {
//       res.json({ message: response.data.choices[0].message.content });
//     } else {
//       res.status(500).json({ error: 'Unexpected API response structure' });
//     }
//   } catch (error) {
//     console.error('Error:', error); // Log the error message for debugging
//     res.status(500).json({ error: 'Error fetching chatbot response', details: error.message });
//   }
// });

// export default router;


import express from 'express';
import axios from 'axios';

const router = express.Router();

// ✅ Route: POST /chat
router.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-3.5-turbo', // ✅ You can change this to any other supported model
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('API Response:', response.data); 

    // ✅ Response handling
    if (response.data.choices && response.data.choices.length > 0) {
      res.json({ message: response.data.choices[0].message.content });
    } else {
      res.status(500).json({ error: 'Unexpected API response structure' });
    }
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Error fetching chatbot response', 
      details: error.response?.data || error.message 
    });
  }
});

export default router;
