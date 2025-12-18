import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { phone, password, nickname } = req.body;

    if (!phone || !password) {
        return res.status(400).json({ message: 'Phone and password are required' });
    }

    try {
        // Check existing
        const existing = await prisma.user.findUnique({
            where: { phone }
        });
        if (existing) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                phone,
                password: hashedPassword,
                nickname: nickname || `User-${phone.slice(-4)}`,
                avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                lastLoginTime: new Date()
            }
        });

        // Sign Token
        const token = jwt.sign({ userId: user.id.toString(), phone: user.phone }, JWT_SECRET, {
            expiresIn: '7d', // 7 days
        });

        // Safe Response
        const userResponse = JSON.parse(JSON.stringify(user, (key, value) =>
            typeof value === 'bigint' ? value.toString() : (key === 'password' ? undefined : value)
        ));

        return res.status(201).json({
            token,
            userInfo: userResponse
        });

    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
