import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/userModel';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await dbConnect();

            const { emailRegister, name, username, passwordRegister } =
                req.body;

            const userEmail = await User.findOne({ email: emailRegister });

            if (userEmail) throw new Error('Email address is already taken.');

            const userHandle = await User.findOne({ username });

            if (userHandle) throw new Error('Username is already taken.');

            const newUser = new User({
                email: emailRegister,
                name,
                username,
                password: await bcrypt.hash(passwordRegister, 6),
            });

            const createdUser = await newUser.save();

            if (!createdUser) throw new Error('Oops. Something went wrong.');

            res.status(200).send({
                message: 'Registration successful.',
            });
        } catch (error) {
            res.status(500).send({
                message: error.message,
            });
        }
    } else {
        res.status(500).send({
            message: 'This is not a POST request.',
        });
    }
}
