import dbConnect from '../../../utils/dbConnect';
import Post from '../../../models/postModel';
import withToken from '../../../middlewares/withToken';

const handler = async (req, res) => {
    if (req.method === 'PUT') {
        try {
            await dbConnect();

            const response = await Post.findByIdAndUpdate(
                req.body.postId,
                {
                    $pull: { likes: req.user._id },
                },
                {
                    new: true,
                }
            );

            res.status(200).send(response);
        } catch (error) {
            throw new Error('Oops! Something went wrong.');
        }
    } else {
        res.status(400).send({
            message: 'This is not a PUT request.',
        });
    }
};

export default withToken(handler);
