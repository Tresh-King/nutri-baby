import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import { getUserFromRequest } from '../../lib/auth';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// POST /api/baby/invite
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const user = await getUserFromRequest(req);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { babyId, role = 'editor' } = req.body; // role: admin, editor, viewer

    if (!babyId) {
        return res.status(400).json({ message: 'Baby ID is required' });
    }

    try {
        const bId = BigInt(babyId);

        // Verify ownership/admin rights
        const baby = await prisma.baby.findFirst({
            where: { id: bId, userId: BigInt(user.userId) }
        });

        // Check if user is an admin collaborator if not owner (TODO: Add granular permission check logic if needed)
        // For now, only owner can invite
        if (!baby) {
            return res.status(403).json({ message: 'Only the owner can invite family members' });
        }

        // Generate Invitation Token
        // Payload: { babyId, inviterId, role, type: 'invite' }
        const token = jwt.sign({
            babyId: babyId.toString(),
            inviterId: user.userId,
            role,
            type: 'invite'
        }, JWT_SECRET, {
            expiresIn: '24h' // Invite valid for 24 hours
        });

        const inviteLink = `${process.env.VITE_APP_URL || 'http://localhost:3000'}/join?token=${token}`;

        return res.status(200).json({
            token,
            expiry: '24h',
            url: inviteLink
        });

    } catch (error) {
        console.error('Invite generation failed', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
