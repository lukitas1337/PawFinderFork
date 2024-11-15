import mongoose from 'mongoose';

const questionnaireSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Basic preferences
  preferredAnimalType: {
    type: String,
    enum: ['cat', 'dog', 'both'],
    required: true
  },
  preferredAgeRange: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  // Living situation
  homeType: {
    type: String,
    enum: ['apartment', 'house', 'house_with_yard'],
    required: true
  },
  hasChildren: {
    type: Boolean,
    required: true
  },
  hasOtherPets: {
    type: Boolean,
    required: true
  },
  hoursHome: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'Questionnaires',
  versionKey: false
});

export default mongoose.model('Questionnaire', questionnaireSchema);