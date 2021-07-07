import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            name: user.name,
            username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d',
        }
    );
};

export default generateToken;
