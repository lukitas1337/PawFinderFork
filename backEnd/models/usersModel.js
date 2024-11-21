import mongoose from "mongoose";

// New Pet Preferences Schema
const petPreferencesSchema = new mongoose.Schema({
  petType: {
    type: String,
    enum: ['cat', 'dog', 'both'],
    required: true
  },
  maxDistance: {
    type: Number,  // in kilometers
    min: 0,
    required: true
  },
  ageRange: {
    min: {
      type: Number,  // in months
      min: 0,
      required: true
    },
    max: {
      type: Number,  // in months
      min: 0,
      required: true
    }
  },
  size: [{
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true
  }],
  gender: [{
    type: String,
    enum: ['male', 'male_neutered', 'female', 'female_spayed'],
    required: true
  }],
  character: [{
    type: String,
    enum: [
      'playful_energetic',    // Happy, always ready for activities
      'calm_gentle',          // Peaceful and easy-going
      'shy_reserved',         // Needs time to warm up
      'independent_confident', // Self-assured, does well alone
      'affectionate_cuddly',  // Loves physical contact
      'social_friendly'       // Great with other animals/people
    ],
    required: true
  }]
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function() { return !this.googleId; },
    },
    fullName: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ['user', 'admin', 'shelter'],
      default: 'user',
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    petPreferences: petPreferencesSchema,  // Added pet preferences
    adoptionApplications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
    questionnaires: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questionnaire",
      },
    ],
    myFavorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
  },
  {
    collection: "Users",
    versionKey: false,
    timestamps: true,
    transform: (doc, ret) => {
      delete ret.password;
      return ret;
    },
  }
);

export default mongoose.model("User", userSchema, "Users");