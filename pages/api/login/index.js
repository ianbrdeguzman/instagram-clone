import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/userModel';
import bcrypt from 'bcryptjs';
import generateToken from '../../../utils/generateToken';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await dbConnect();

            const user = await User.findOne({ email: req.body.email });

            if (user) {
                if (await bcrypt.compare(req.body.password, user.password)) {
                    res.status(200).send({
                        email: user.email,
                        name: user.name,
                        username: user.username,
                        token: generateToken(user),
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
