import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { token } = cookie.parse(req.headers.cookie);

            const user = jwt.verify(token, process.env.JWT_SECRET);

            res.status(200).send(user);
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
}
