import Post from '../../../models/postModel';
import withToken from '../../../middlewares/withToken';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const posts = await Post.find({});

            res.status(200).send(posts);
        } catch (error) {
            res.status(400).send({
                message: error.message,
            });
        }
    } else {
        res.status(400).send({
            message: 'This is not a GET request.',
        });
    }
};

export default withToken(handler);
