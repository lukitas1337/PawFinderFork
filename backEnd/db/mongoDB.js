import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME
  })
    .then(() => console.log(`Connected to MongoDB - ${process.env.DB_NAME} database`))
    .catch((err) => console.error('MongoDB connection error:', err));

export default mongoose;