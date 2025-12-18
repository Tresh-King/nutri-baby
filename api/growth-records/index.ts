import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import { getUserFromRequest } from '../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const user = await getUserFromRequest(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    if (req.method === 'GET') {
        const { babyId, startTime, endTime } = req.query;
        if (!babyId) return res.status(400).json({ message: 'Baby ID required' });
        const where: any = { babyId: BigInt(babyId as string) };
        if (startTime || endTime) {
            where.time = {};
            if (startTime) where.time.gte = new Date(Number(startTime));
            if (endTime) where.time.lte = new Date(Number(endTime));
        }
        try {
            const records = await prisma.growthRecord.findMany({ where, orderBy: { time: 'desc' } });
            const response = JSON.parse(JSON.stringify(records, (key, value) => typeof value === 'bigint' ? value.toString() : value));
            return res.status(200).json({ records: response });
        } catch (error) { return res.status(500).json({ message: 'Error fetching records' }); }
    } else if (req.method === 'POST') {
        const { babyId, time, height, weight, headCircumference, note } = req.body;
        try {
            const record = await prisma.growthRecord.create({
                data: {
                    babyId: BigInt(babyId),
                    time: new Date(time),
                    height, weight, headCircumference, note,
                    createdBy: BigInt(user.userId)
                }
            });
            const response = JSON.parse(JSON.stringify(record, (key, value) => typeof value === 'bigint' ? value.toString() : value));
            return res.status(201).json(response);
        } catch (error) { return res.status(500).json({ message: 'Error creating record' }); }
    }
    return res.status(405).json({ message: 'Method Not Allowed' });
}
