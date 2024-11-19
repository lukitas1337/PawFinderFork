import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import passport from 'passport';
import authRoutes from './routes/auth.js';
import './config/passport.js';
import petRoutes from './routes/pets.js';
import matchingRoutes from './routes/matching.js';
import { errorHandler } from './utils/errorHandler.js';
import mongoose from './db/mongoDB.js';

const app = express();

app.use(cors({
    origin: process.env.ROOT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/matching', matchingRoutes);

app.use(errorHandler);
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

