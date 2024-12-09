import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI);
        console.log(`DB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("DB Connection error", error);
    }
}