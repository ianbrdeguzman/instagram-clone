import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        caption: { type: String, required: true },
        image: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        comments: [
            {
                type: new mongoose.Schema(
                    {
                        text: { type: String },
                        user: {
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'User',
                        },
                    },
                    {
                        timestamps: true,
                    }
                ),
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Post || mongoose.model('Post', postSchema);
