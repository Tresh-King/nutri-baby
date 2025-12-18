import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import { getUserFromRequest } from '../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const user = await getUserFromRequest(req);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.method === 'GET') {
        // List Babies
        try {
            const babies = await prisma.baby.findMany({
                where: { userId: BigInt(user.userId) },
                orderBy: { createdAt: 'desc' }
            });

            const response = JSON.parse(JSON.stringify(babies, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ));

            return res.status(200).json(response);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'POST') {
        // Create Baby
        const { name, nickname, gender, birthDate, avatarUrl } = req.body;

        // Simple validation
        if (!name || !gender || !birthDate) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        try {
            const baby = await prisma.baby.create({
                data: {
                    name,
                    nickname,
                    gender,
                    birthDate,
                    avatarUrl,
                    userId: BigInt(user.userId)
                }
            });

            const response = JSON.parse(JSON.stringify(baby, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ));

            return res.status(201).json(response);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
