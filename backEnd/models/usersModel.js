import mongoose from "mongoose";

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
  phoneNumber: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
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
  },
  {
    timestamps: true,
    collection: "Users",
    versionKey: false
  }, { 
  timestamps: true,
  collection: 'Users',
  versionKey: false
});

export default mongoose.model("User", userSchema, "Users");
