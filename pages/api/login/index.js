import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/userModel';
import bcrypt from 'bcryptjs';
import generateToken from '../../../utils/generateToken';
import cookie from 'cookie';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await dbConnect();

            const user = await User.findOne({ email: req.body.email });

            if (user) {
                if (await bcrypt.compare(req.body.password, user.password)) {
                    const token = generateToken(user);

                    res.setHeader(
                        'Set-Cookie',
                        cookie.serialize('token', token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            maxAge: 60 * 60,
                            sameSite: 'strict',
                            path: '/',
                        })
                    );
                    res.status(200).send({
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                        username: user.username,
                    });
                } else {
                    res.status(404).send({
                        message:
                            'Sorry, your password was incorrect. Please double-check your password.',
                    });
                }
            } else {
                res.status(404).send({
                    message:
                        'Sorry, your password was incorrect. Please double-check your password.',
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    } else {
        res.status(500).send({
            message: 'This is not a POST request.',
        });
    }
}
