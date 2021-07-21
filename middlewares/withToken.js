import cookie from 'cookie';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import { generateRefreshToken, generateToken } from '../utils/generateToken';
import dbConnect from '../utils/dbConnect';

const withToken = (handler) => {
    return async (req, res) => {
        try {
            dbConnect();
            // get access token from headers
            const accessToken = req.headers.authorization.split(' ')[1];

            let accessTokenUser;

            // verify access token
            jwt.verify(
                accessToken,
                process.env.JWT_ACCESS_TOKEN,
                (error, decoded) => {
                    if (error) {
                        // if access token is expired
                        // get the refresh token
                        const { refreshToken } = cookie.parse(
                            req.headers.cookie
                        );

                        // verify the refresh token
                        jwt.verify(
                            refreshToken,
                            process.env.JWT_REFRESH_TOKEN,
                            (error, decoded) => {
                                if (error) {
                                    // if refresh token is expired
                                    res.setHeader(
                                        'Set-Cookie',
                                        cookie.serialize('refreshToken', '', {
                                            httpOnly: true,
                                            secure:
                                                process.env.NODE_ENV !==
                                                'development',
                                            expires: new Date(0),
                                            sameSite: 'strict',
                                            path: '/',
                                        })
                                    );
                                } else {
                                    accessTokenUser = decoded;
                                }
                            }
                        );
                    } else {
                        accessTokenUser = decoded;
                    }
                }
            );

            // check if user is db
            let currentUser = await User.findById(accessTokenUser._id);

            if (!currentUser) throw new Error('User not found.');

            if (currentUser) {
                // generate new tokens
                const newAccessToken = generateToken(currentUser);
                const newRefreshToken = generateRefreshToken(currentUser);

                // set httpOnly cookie
                res.setHeader(
                    'Set-Cookie',
                    cookie.serialize('refreshToken', newRefreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 60 * 24,
                        sameSite: 'strict',
                        path: '/',
                    })
                );

                const user = {
                    _id: currentUser._id,
                    email: currentUser.email,
                    name: currentUser.name,
                    username: currentUser.username,
                    image: currentUser.image,
                    website: currentUser.website,
                    bio: currentUser.bio,
                    phone: currentUser.phone,
                    gender: currentUser.gender,
                };

                req.user = { ...user, token: newAccessToken };
            }

            return handler(req, res);
        } catch (error) {
            res.status(400).send({
                message: 'Unauthorized.',
            });
        }
    };
};

export default withToken;
