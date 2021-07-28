import withToken from '../../../../middlewares/withToken';
import User from '../../../../models/userModel';
import dbConnect from '../../../../utils/dbConnect';

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
    } else if (req.method === 'GET') {
        try {
            await dbConnect();

            let user = await User.findOneAndUpdate(
                { email: req.user.email },
                {
                    image: 'https://res.cloudinary.com/ianbrdeguzman/image/upload/v1626895563/default-avatar_mqgoug.png',
                },
                {
                    new: true,
                }
            );

            user.password = undefined;

            res.status(200).send(user);
        } catch (error) {
            res.status(404).send({
                message: error.message,
            });
        }
    } else {
        res.status(400).send({
            message: 'This is not a POST or GET request.',
        });
    }
};

export default withToken(handler);
