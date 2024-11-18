import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  animalType: {
    type: String,
    enum: ['cat', 'dog'],
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  adopted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'Pets',
  versionKey: false
});

export default mongoose.model('Pet', petSchema);