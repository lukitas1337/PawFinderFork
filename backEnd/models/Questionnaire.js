import mongoose from 'mongoose';

const questionnaireSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
  }
}, {
  collection: 'Questionnaires',
  versionKey: false,
  timestamps: true
});

export default mongoose.model('Questionnaire', questionnaireSchema);