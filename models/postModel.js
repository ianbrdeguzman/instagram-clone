import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        photo: { type: String, default: 'no photo' },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Post || mongoose.model('Post', postSchema);
