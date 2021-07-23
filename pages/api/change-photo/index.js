import withToken from '../../../middlewares/withToken';
import User from '../../../models/userModel';
import dbConnect from '../../../utils/dbConnect';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await dbConnect();

            let updatedUser = await User.findOneAndUpdate(
                { email: req.user.email },
                { image: req.body.image },
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
