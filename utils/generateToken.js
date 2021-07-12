import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            name: user.name,
            username: user.username,
        },
        process.env.JWT_ACCESS_TOKEN,
        {
            expiresIn: '1s',
        }
    );
};

export const generatePasswordResetToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            name: user.name,
            username: user.username,
        },
        process.env.JWT_ACCESS_TOKEN,
        {
            expiresIn: '10m',
        }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            name: user.name,
            username: user.username,
        },
        process.env.JWT_REFRESH_TOKEN,
        {
            expiresIn: '1d',
        }
    );
};
