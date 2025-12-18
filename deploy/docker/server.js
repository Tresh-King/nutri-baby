// Basic Express adapter to run Vercel serverless functions in Docker
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Use PORT from env or default to 3000
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper to adapt Express req/res to Vercel signature
const adapt = (handler) => async (req, res) => {
    // Vercel functions expect req.query to contain path params too if using dynamic routes
    // We merge params into query to simulate this
    req.query = { ...req.query, ...req.params };
    
    // Simple mock of VercelRequest/Response if needed needed beyond standard Express
    // But usually standard Express req/res works fine for the subset of features used
    try {
        await handler(req, res);
    } catch (e) {
        console.error(e);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

// --- Import Handlers (Manual Mapping) ---
// Note: In a real generic runner, we would walk the directory.
// For stability here, we manually map known routes.

// Auth
const login = require('../../api/auth/login').default;
app.all('/api/auth/login', adapt(login));

// Baby
const babyIndex = require('../../api/baby/index').default;
const babyId = require('../../api/baby/[id]').default;
app.all('/api/baby', adapt(babyIndex));
app.all('/api/baby/:id', adapt(babyId));

// Records
const feedingIndex = require('../../api/feeding-records/index').default;
const feedingId = require('../../api/feeding-records/[id]').default;
const sleepIndex = require('../../api/sleep-records/index').default;
const sleepId = require('../../api/sleep-records/[id]').default;
const diaperIndex = require('../../api/diaper-records/index').default;
const diaperId = require('../../api/diaper-records/[id]').default;
const growthIndex = require('../../api/growth-records/index').default;
const growthId = require('../../api/growth-records/[id]').default;

app.all('/api/feeding-records', adapt(feedingIndex));
app.all('/api/feeding-records/:id', adapt(feedingId));
app.all('/api/sleep-records', adapt(sleepIndex));
app.all('/api/sleep-records/:id', adapt(sleepId));
app.all('/api/diaper-records', adapt(diaperIndex));
app.all('/api/diaper-records/:id', adapt(diaperId));
app.all('/api/growth-records', adapt(growthIndex));
app.all('/api/growth-records/:id', adapt(growthId));

// Statistics
const statsIndex = require('../../api/statistics/index').default;
app.all('/api/statistics', adapt(statsIndex));

// Start
app.listen(PORT, () => {
    console.log(`Backend adapter listening on port ${PORT}`);
});
