import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/userModel';
import bcrypt from 'bcryptjs';
import cookie from 'cookie';
import {
    generateRefreshToken,
    generateToken,
} from '../../../utils/generateToken';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await dbConnect();

            let user = await User.findOne({ email: req.body.email });

            if (!user)
                throw new Error(
                    'Sorry, your password was incorrect. Please double-check your password.'
                );

            if (!(await bcrypt.compare(req.body.password, user.password)))
                throw new Error(
                    'Sorry, your password was incorrect. Please double-check your password.'
                );

            const token = generateToken(user);
            const refreshToken = generateRefreshToken(user);

            res.setHeader(
                'Set-Cookie',
                cookie.serialize('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 60 * 60 * 24,
                    sameSite: 'strict',
                    path: '/',
                })
            );

            user.password = undefined;
            user.token = token;

            res.status(200).send(user);
        } catch (error) {
            res.status(404).send(error.message);
        }
    } else {
        res.status(400).send({
            message: 'This is not a POST request.',
        });
    }
}
