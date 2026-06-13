const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/bible', async (req, res) => {
    try {
        const response = await fetch('https://deku-api.giize.com/random/bible', {
            headers: {
                'apikey': '6d2668cdf0bd1da212a0c3f763247ef9'
            }
        });

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: 'Failed to fetch Bible verse', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Bible Verse Proxy running at http://localhost:${PORT}`);
});