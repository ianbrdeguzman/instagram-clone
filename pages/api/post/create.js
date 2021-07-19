import Post from '../../../models/postModel';
import withToken from '../../../middlewares/withToken';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { title, body } = req.body;
            // check post title and body
            if (!title || !body) throw new Error('Bad request.');

            // get user from withToken middleware
            const currentUser = req.user;

            const post = new Post({
                title,
                body,
                user: currentUser._id,
            });

            const createdPost = await post.save();

            res.status(200).send(createdPost);
        } catch (error) {
            res.status(400).send({
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
