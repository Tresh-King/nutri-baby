import { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from '../../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { phone, password } = req.body;

    if (!phone || !password) {
        return res.status(400).json({ message: 'Phone and password are required' });
    }

    try {
        // Find user
        const user = await prisma.user.findUnique({
            where: { phone }
        });

        if (!user || !user.password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Update login time
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLoginTime: new Date() }
        })

        // Sign Token
        const token = jwt.sign({ userId: user.id.toString(), phone: user.phone }, JWT_SECRET, {
            expiresIn: '7d',
        });

        // Safe Response
        const userResponse = JSON.parse(JSON.stringify(user, (key, value) =>
            typeof value === 'bigint' ? value.toString() : (key === 'password' ? undefined : value)
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
