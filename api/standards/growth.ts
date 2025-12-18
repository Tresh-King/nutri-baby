import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import { getUserFromRequest } from '../../lib/auth';

// GET /api/standards/growth
export default async function handler(req: VercelRequest, res: VercelResponse) {
    const user = await getUserFromRequest(req);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { type, gender, source = 'WHO' } = req.query;

    if (!type || !gender) {
        return res.status(400).json({ message: 'Type and gender are required' });
    }

    try {
        const standards = await prisma.growthStandard.findMany({
            where: {
                source: source as string,
                type: type as string,
                gender: gender as string,
            },
            orderBy: {
                month: 'asc'
            }
        });

        // Convert Decimals to Number for JSON safety
        const response = standards.map(s => ({
            month: s.month,
            p3: Number(s.p3),
            p15: Number(s.p15),
            p50: Number(s.p50),
            p85: Number(s.p85),
            p97: Number(s.p97),
        }));

        return res.status(200).json(response);

    } catch (error) {
        console.error('Fetch standards fetch failed', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
