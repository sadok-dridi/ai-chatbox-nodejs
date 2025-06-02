const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 8080;

// Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Home page route
app.get('/', (req, res) => {
    res.render('pages/index');
});

// Chat API route (AI response)
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: "deepseek/deepseek-r1-0528:free",
            messages: [
                { role: "user", content: userMessage }
            ]
        }, {
            headers: {
                'Authorization': `Bearer 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`,
                'Content-Type': 'application/json'
            }
        });

        const botReply = response.data.choices[0].message.content;
        res.json({ reply: botReply });

    } catch (error) {
        console.error("❌ API error:", error.response?.data || error.message);
        res.status(500).json({ reply: "Sorry, I couldn't contact the AI." });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
