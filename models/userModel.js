import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        name: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        website: { type: String, default: '' },
        bio: { type: String, default: '' },
        phone: { type: String, default: '' },
        gender: { type: String, default: '' },
        image: {
            type: String,
            default:
                'https://res.cloudinary.com/ianbrdeguzman/image/upload/v1626895563/default-avatar_mqgoug.png',
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
