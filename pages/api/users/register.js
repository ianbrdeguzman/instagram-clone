import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/userModel';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await dbConnect();

            const { email, name, username, password } = req.body;

            const sameEmail = await User.findOne({ email });

            if (sameEmail) throw new Error('Email address is already taken.');

            const sameUsername = await User.findOne({ username });

            if (sameUsername) throw new Error('Username is already taken.');

            const newUser = new User({
                email,
                name,
                username,
                password: await bcrypt.hash(password, 6),
            });

            await newUser.save();

            res.status(200).send({
                message: 'Registration successful.',
            });
        } catch (error) {
            res.status(422).send({
                message: error.message,
            });
        }
    } else {
        res.status(500).send({
            message: 'This is not a POST request.',
        });
    }
}
