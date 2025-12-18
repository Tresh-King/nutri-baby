import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ message: 'Code is required' });
    }

    try {
        // Mock login logic for now
        // In production, exchange code for openid with Wechat API
        let openid = '';

        if (code.startsWith('mock-')) {
            openid = code; // Use the code as openid for mocks
        } else {
            // Assume successful wechat login for dev
            openid = 'wechat-openid-' + Math.random().toString(36).substring(7);
        }

        // Find or create user
        let user = await prisma.user.findUnique({
            where: { openid },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    openid,
                    nickname: 'New User',
                    avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                    lastLoginTime: new Date(),
                },
            });
        } else {
            // Update last login
            await prisma.user.update({
                where: { id: user.id },
                data: { lastLoginTime: new Date() }
            })
        }

        // Sign Token
        const token = jwt.sign({ userId: user.id.toString(), openid: user.openid }, JWT_SECRET, {
            expiresIn: '7d',
        });

        // Handle BigInt serialization
        const userResponse = JSON.parse(JSON.stringify(user, (key, value) =>
            typeof value === 'bigint'
                ? value.toString()
                : value // return everything else unchanged
        ));

        return res.status(200).json({
            token,
            userInfo: userResponse
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
