import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/userModel';
import withToken from '../../../middlewares/withToken';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            await dbConnect();

            const { email, name, username, bio, gender, phone, website } =
                req.body;

            const user = await User.findOne({ email: req.user.email });

            if (!user) throw new Error('User not found.');

            const updatedUser = await User.findOneAndUpdate(
                { email: req.user.email },
                {
                    email: email || user.email,
                    name: name || user.name,
                    username: username || user.username,
                    password: user.password,
                    bio: bio,
                    gender: gender,
                    phone: phone,
                    website: website,
                },
                { new: true }
            );

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
