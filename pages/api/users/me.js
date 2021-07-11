import withToken from '../../../middlewares/withToken';

const handler = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const currentUser = req.user;
            res.status(200).send(currentUser);
        } catch (error) {
            res.status(401).send({
                message: 'Unauthorized.',
            });
        }
    } else {
        res.status(400).send({
            message: 'This is not a GET request.',
        });
    }
};

export default withToken(handler);
