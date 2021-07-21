import Post from '../../../models/postModel';
import withToken from '../../../middlewares/withToken';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { caption, image } = req.body;

            if (!caption || !image) throw new Error('Bad request.');

            const post = new Post({
                caption,
                image,
                user: req.user._id,
            });

            const createdPost = await post.save();

            const populatedPost = await Post.findOne({
                _id: createdPost._id,
            }).populate('user', '_id name username');

            res.status(200).send(populatedPost);
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
