import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import { getUserFromRequest } from '../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const user = await getUserFromRequest(req);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { babyId } = req.query;
    if (!babyId) {
        return res.status(400).json({ message: 'Baby ID required' });
    }

    let id: bigint;
    try {
        id = BigInt(babyId as string);
    } catch {
        return res.status(400).json({ message: 'Invalid Baby ID format' });
    }

    // Time calculations
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - 6);
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(todayEnd);

    // Fetch Data (Parallel Fetching)
    try {
        const [feedingToday, sleepToday, diaperToday, growthToday, feedingWeek, sleepWeek] = await Promise.all([
            prisma.feedingRecord.findMany({ where: { babyId: id, time: { gte: todayStart, lte: todayEnd } } }),
            prisma.sleepRecord.findMany({ where: { babyId: id, startTime: { gte: todayStart, lte: todayEnd } } }),
            prisma.diaperRecord.findMany({ where: { babyId: id, time: { gte: todayStart, lte: todayEnd } } }),
            prisma.growthRecord.findFirst({ where: { babyId: id }, orderBy: { time: 'desc' } }),
            prisma.feedingRecord.findMany({ where: { babyId: id, time: { gte: weekStart, lte: weekEnd } } }),
            prisma.sleepRecord.findMany({ where: { babyId: id, startTime: { gte: weekStart, lte: weekEnd } } })
        ]);

        // --- Calculate Today Stats ---
        const todayStats = {
            feeding: { totalCount: 0, breastCount: 0, bottleCount: 0, bottleMl: 0, foodCount: 0, lastFeedingTime: null as Date | null },
            sleep: { sessionCount: 0, totalMinutes: 0, lastSleepMinutes: 0 },
            diaper: { totalCount: 0, peeCount: 0, poopCount: 0 },
            growth: { latestHeight: 0, latestWeight: 0, latestHeadCircumference: 0 }
        };

        // Feeding Today
        todayStats.feeding.totalCount = feedingToday.length;
        feedingToday.forEach(r => {
            if (r.feedingType === 'breast') todayStats.feeding.breastCount++;
            if (r.feedingType === 'bottle') {
                todayStats.feeding.bottleCount++;
                todayStats.feeding.bottleMl += r.amount || 0;
            }
            if (r.feedingType === 'food') todayStats.feeding.foodCount++;
        });
        if (feedingToday.length > 0) {
            // Assuming findMany returns unsorted unless specified? We didn't sort, so let's sort or just finding max
            const sorted = feedingToday.sort((a, b) => b.time.getTime() - a.time.getTime());
            todayStats.feeding.lastFeedingTime = sorted[0].time;
        }

        // Sleep Today
        todayStats.sleep.sessionCount = sleepToday.length;
        sleepToday.forEach(r => {
            let minutes = 0;
            if (r.duration) minutes = Math.ceil(r.duration / 60);
            else if (r.endTime) minutes = Math.ceil((r.endTime.getTime() - r.startTime.getTime()) / 1000 / 60);
            todayStats.sleep.totalMinutes += minutes;
        });

        // Diaper Today
        todayStats.diaper.totalCount = diaperToday.length;
        diaperToday.forEach(r => {
            if (r.type === 'pee' || r.type === 'both') todayStats.diaper.peeCount++;
            if (r.type === 'poop' || r.type === 'both') todayStats.diaper.poopCount++;
        });

        // Growth Today (Latest)
        if (growthToday) {
            todayStats.growth.latestHeight = growthToday.height ? Number(growthToday.height) : 0;
            todayStats.growth.latestWeight = growthToday.weight ? Number(growthToday.weight) : 0;
            todayStats.growth.latestHeadCircumference = growthToday.headCircumference ? Number(growthToday.headCircumference) : 0;
        }

        // --- Calculate Weekly Stats (Simplified for now - just totals) ---
        const weeklyStats = {
            feeding: { totalCount: feedingWeek.length, avgPerDay: parseFloat((feedingWeek.length / 7).toFixed(1)) },
            sleep: { totalMinutes: 0, avgPerDay: 0 }
        };

        let weeklySleepMinutes = 0;
        sleepWeek.forEach(r => {
            let minutes = 0;
            if (r.duration) minutes = Math.ceil(r.duration / 60);
            else if (r.endTime) minutes = Math.ceil((r.endTime.getTime() - r.startTime.getTime()) / 1000 / 60);
            weeklySleepMinutes += minutes;
        });
        weeklyStats.sleep.totalMinutes = weeklySleepMinutes;
        weeklyStats.sleep.avgPerDay = parseFloat((weeklySleepMinutes / 7 / 60).toFixed(1)); // Hours per day? Or minutes? Original likely minutes.

        return res.status(200).json({
            today: todayStats,
            weekly: weeklyStats
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
