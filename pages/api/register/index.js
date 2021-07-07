import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/userModel';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    try {
        await dbConnect();

        const user = new User({
            email: req.body.emailRegister,
            name: req.body.name,
            username: req.body.username,
            password: await bcrypt.hash(req.body.passwordRegister, 6),
        });

        const createdUser = await user.save();

        res.status(200).send(createdUser);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error,
        });
    }
}
