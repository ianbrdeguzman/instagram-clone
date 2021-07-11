import cookie from 'cookie';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('refreshToken', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/',
            })
        );
        res.status(200).send({
            message: 'Signed Out.',
        });
    } else {
        res.status(500).send({
            message: 'This is not a POST request.',
        });
    }
}
