import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

const dbConnect = async () => {
    try {
        if (mongoose.connection.readyState === 1) return;
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
};

export default dbConnect;
