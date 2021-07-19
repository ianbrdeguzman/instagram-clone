import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        photo: { type: String, default: 'no photo' },
        user: {
            id: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
            username: { type: String, required: true },
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Post || mongoose.model('Post', postSchema);
