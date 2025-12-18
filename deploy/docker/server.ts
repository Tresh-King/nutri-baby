// Basic Express adapter to run Vercel serverless functions in Docker
import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Import Vercel handlers
// @ts-ignore
import authLogin from '../../api/auth/login';
// @ts-ignore
import babyIndex from '../../api/baby/index';
// @ts-ignore
import babyId from '../../api/baby/[id]';
// @ts-ignore
import feedingIndex from '../../api/feeding-records/index';
// @ts-ignore
import feedingId from '../../api/feeding-records/[id]';
// @ts-ignore
import sleepIndex from '../../api/sleep-records/index';
// @ts-ignore
import sleepId from '../../api/sleep-records/[id]';
// @ts-ignore
import diaperIndex from '../../api/diaper-records/index';
// @ts-ignore
import diaperId from '../../api/diaper-records/[id]';
// @ts-ignore
import growthIndex from '../../api/growth-records/index';
// @ts-ignore
import growthId from '../../api/growth-records/[id]';
// @ts-ignore
import statsIndex from '../../api/statistics/index';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Helper to adapt Express req/res to Vercel signature
const adapt = (handler: any) => async (req: Request, res: Response) => {
    // Merge params into query
    req.query = { ...req.query, ...req.params } as any;

    try {
        await handler.default(req, res);
    } catch (e) {
        console.error(e);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

// Routes
app.all('/api/auth/login', adapt(authLogin));

app.all('/api/baby', adapt(babyIndex));
app.all('/api/baby/:id', adapt(babyId));

app.all('/api/feeding-records', adapt(feedingIndex));
app.all('/api/feeding-records/:id', adapt(feedingId));
app.all('/api/sleep-records', adapt(sleepIndex));
app.all('/api/sleep-records/:id', adapt(sleepId));
app.all('/api/diaper-records', adapt(diaperIndex));
app.all('/api/diaper-records/:id', adapt(diaperId));
app.all('/api/growth-records', adapt(growthIndex));
app.all('/api/growth-records/:id', adapt(growthId));

app.all('/api/statistics', adapt(statsIndex));

app.listen(PORT, () => {
    console.log(`Backend adapter listening on port ${PORT}`);
});
