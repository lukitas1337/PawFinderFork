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
    userType: {
      type: String,
      enum: ['user', 'admin', 'shelter'],
      default: 'user',
      required: true,
    },
    companyName: {
      type: String,
      required: function() { return this.userType === 'shelter'; },
    },
    registrationNumber: {
      type: String,
      required: function() { return this.userType === 'shelter'; },
    },
    contactPerson: {
      type: String,
      required: function() { return this.userType === 'shelter'; },
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    }
  }, { 
    collection: 'Users',
    versionKey: false,
    timestamps: true
  }
);

export default mongoose.model("User", userSchema, "Users");