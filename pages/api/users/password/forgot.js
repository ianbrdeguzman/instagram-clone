import User from '../../../../models/userModel';
import dbConnect from '../../../../utils/dbConnect';
import { generatePasswordResetToken } from '../../../../utils/generateToken';
import { sendForgotPasswordMail } from '../../../../utils/mailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            await dbConnect();

            const user = await User.findOne({ email: req.body.email });

            if (!user) throw new Error('Email address does not exist.');

            const token = generatePasswordResetToken(user);

            const url = `http://localhost:3000/accounts/forgotpassword/${token}`;

            const info = await sendForgotPasswordMail(user, url);

            res.status(200).send(info);
        } catch (error) {
            res.status(404).send(error.message);
        }
    } else {
        res.status(400).send({
            message: 'This is not a POST request.',
        });
    }
}
