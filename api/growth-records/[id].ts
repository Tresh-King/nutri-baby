import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import { getUserFromRequest } from '../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const user = await getUserFromRequest(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    const { id } = req.query;
    const recordId = BigInt(id as string);

    if (req.method === 'GET') {
        const record = await prisma.growthRecord.findUnique({ where: { id: recordId } });
        if (!record) return res.status(404).json({ message: 'Not Found' });
        const response = JSON.parse(JSON.stringify(record, (key, value) => typeof value === 'bigint' ? value.toString() : value));
        return res.status(200).json(response);
    } else if (req.method === 'PUT') {
        const { time, height, weight, headCircumference, note } = req.body;
        try {
            const updated = await prisma.growthRecord.update({
                where: { id: recordId },
                data: { time: time ? new Date(time) : undefined, height, weight, headCircumference, note }
            });
            const response = JSON.parse(JSON.stringify(updated, (key, value) => typeof value === 'bigint' ? value.toString() : value));
            return res.status(200).json(response);
        } catch (error) { return res.status(500).json({ message: 'Update failed' }); }
    } else if (req.method === 'DELETE') {
        try {
            await prisma.growthRecord.delete({ where: { id: recordId } });
            return res.status(200).json({ message: 'Deleted' });
        } catch (error) { return res.status(500).json({ message: 'Delete failed' }); }
    }
    return res.status(405).json({ message: 'Method Not Allowed' });
}
