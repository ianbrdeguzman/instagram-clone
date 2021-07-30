import Post from '../../../models/postModel';
import withToken from '../../../middlewares/withToken';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        Post.find()
            .populate('user', '_id name username image')
            .populate({
                path: 'comments',
                populate: { path: 'user', select: '_id username' },
            })
            .sort({ createdAt: 'desc' })
            .then((posts) => {
                res.status(200).send(posts);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message,
                });
            });
    } else {
        res.status(400).send({
            message: 'This is not a GET request.',
        });
    }
};

export default withToken(handler);
