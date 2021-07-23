import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/userModel';
import bcrypt from 'bcryptjs';
import withToken from '../../../middlewares/withToken';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await dbConnect();

            const user = await User.findOne({ email: req.body.email });

            if (!user) throw new Error('User not found.');

            if (!(await bcrypt.compare(req.body.oldPassword, user.password)))
                throw new Error('Your old password is incorrect.');

            const newPassword = await bcrypt.hash(req.body.newPassword, 6);

            let updatedUser = await User.findOneAndUpdate(
                { email: req.body.email },
                { password: newPassword },
                { new: true }
            );

            updatedUser.password = undefined;

            res.status(200).send(updatedUser);
        } catch (error) {
            res.status(404).send({
                message: error.message,
            });
        }
    } else {
        res.status(400).send({
            message: 'This is not a POST request.',
        });
    }
};

export default withToken(handler);
