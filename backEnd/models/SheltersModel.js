import mongoose from "mongoose";

const shelterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactPerson: {
      type: String,
      required: true,
      },
    companyName: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    website: {
      type: String,
    },
    capacity: {
      type: Number, // Maximum number of animals the shelter can hold
      required: true,
    },
    availablePets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
      },
    ],
    description: {
      type: String,
    },
    companyImage: {
      type: String,
    },
  },
  {
    collection: "Shelters",
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Shelter", shelterSchema);
