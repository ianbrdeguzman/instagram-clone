import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/userModel';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await dbConnect();

            const user = new User({
                email: req.body.emailRegister,
                name: req.body.name,
                username: req.body.username,
                password: await bcrypt.hash(req.body.passwordRegister, 6),
            });

            const createdUser = await user.save();

            if (!createdUser) throw new Error('Oops. Something went wrong.');

            res.status(200).send({
                message: 'Registration successful.',
            });
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
