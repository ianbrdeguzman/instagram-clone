import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        website: { type: String },
        bio: { type: String },
        phone: { type: String },
        gender: { type: String },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
