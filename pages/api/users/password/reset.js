import dbConnect from '../../../../utils/dbConnect';
import User from '../../../../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await dbConnect();

            // get query token
            const { token, password } = req.body;

            // verify token
            const decodedUser = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);

            // get user from db
            const user = await User.findById(decodedUser._id);

            if (!user) throw new Error('User not found.');

            // update user password
            user.password = await bcrypt.hash(password, 6);

            // save updated user with new password
            const updatedUser = await user.save();

            if (!updatedUser) throw new Error('Oops. Something went wrong.');

            // return success
            res.status(200).send({
                message: 'Successfully reset password.',
            });
        } catch (error) {
            res.status(400).send({
                message: 'Password reset link expired.',
            });
        }
    } else {
        res.status(500).send({
            message: 'This is not a POST request.',
        });
    }
}
