import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { connectDB } from './lib/db.js';
import cors from 'cors';
import { app, server } from './lib/socket.js';

import path from "path"

dotenv.config();
const PORT = process.env.PORT
const __dirname = path.resolve();

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,

}))

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.htmla"))
    })
}

server.listen(PORT, () => {
    console.log("server running on Port:" + PORT)
    connectDB();
})