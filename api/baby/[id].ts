import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import { getUserFromRequest } from '../../lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const user = await getUserFromRequest(req);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.query;
    if (!id || Array.isArray(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    let babyId: bigint;
    try {
        babyId = BigInt(id as string);
    } catch {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Verify ownership (simplified, ignoring collaborators for now)
    const existing = await prisma.baby.findFirst({
        where: { id: babyId, userId: BigInt(user.userId) }
    });

    if (!existing && req.method !== 'GET') { // Allow GET if we add collaboration later, but for now strict
        return res.status(404).json({ message: 'Baby not found' });
    }

    if (req.method === 'GET') {
        const baby = await prisma.baby.findUnique({ where: { id: babyId } });
        if (!baby) return res.status(404).json({ message: 'Not Found' });

        const response = JSON.parse(JSON.stringify(baby, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));
        return res.status(200).json(response);

    } else if (req.method === 'PUT') {
        const { name, nickname, gender, birthDate, avatarUrl } = req.body;

        try {
            const updated = await prisma.baby.update({
                where: { id: babyId },
                data: { name, nickname, gender, birthDate, avatarUrl }
            });

            const response = JSON.parse(JSON.stringify(updated, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value
            ));
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({ message: 'Update failed' });
        }

    } else if (req.method === 'DELETE') {
        try {
            await prisma.baby.delete({ where: { id: babyId } });
            return res.status(200).json({ message: 'Deleted' });
        } catch (error) {
            return res.status(500).json({ message: 'Delete failed' });
        }
    }

    return res.status(405).json({ message: 'Method Not Allowed' });
}
