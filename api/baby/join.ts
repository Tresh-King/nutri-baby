import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import { getUserFromRequest } from '../../lib/auth';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

// POST /api/baby/join
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const user = await getUserFromRequest(req);
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        // Verify Token
        const decoded: any = jwt.verify(token, JWT_SECRET);

        if (decoded.type !== 'invite' || !decoded.babyId) {
            return res.status(400).json({ message: 'Invalid invitation token' });
        }

        const babyId = BigInt(decoded.babyId);
        const userId = BigInt(user.userId);

        // Check if already a collaborator or owner
        const existing = await prisma.babyCollaborator.findUnique({
            where: {
                babyId_userId: {
                    babyId,
                    userId
                }
            }
        });

        const owner = await prisma.baby.findFirst({
            where: { id: babyId, userId: userId }
        });

        if (existing || owner) {
            return res.status(200).json({ message: 'You are already a member of this family', babyId: decoded.babyId });
        }

        // Create Collaborator Record
        await prisma.babyCollaborator.create({
            data: {
                babyId,
                userId,
                role: decoded.role || 'viewer',
                relationship: 'family', // Default relationship
                accessType: 'permanent'
            }
        });

        return res.status(200).json({
            message: 'Successfully joined family!',
            babyId: decoded.babyId
        });

    } catch (error) {
        console.error('Join failed', error);
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(400).json({ message: 'Invitation link has expired' });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
