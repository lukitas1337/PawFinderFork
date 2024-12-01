import mongoose from "mongoose";

const adPetSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shelter",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    animalType: {
      type: String,
      enum: ["cat", "dog"],
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    petStory: {
      type: String,
    },

    vaccinated: {
      type: Boolean,
      default: false,
    },
    neutered: {
      type: Boolean,
      default: false,
    },
    microchipped: {
      type: Boolean,
      default: false,
    },
    sociableWithOtherPets: {
      type: Boolean,
    },
    sociableWithKids: {
      type: Boolean,
    },
    pictures: {
      type: String,
    },

    size: {
      type: String,
      enum: ["small", "medium", "large"],
    },
    hasPark: {
      type: Boolean,
      default: false,
      required: function () {
        return this.animalType === "dog";
      },
    },
    livesIndoors: {
      type: Boolean,
      default: false,
      required: function () {
        return this.animalType === "cat";
      },
    },
    specialNeeds: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "AdPets",
    versionKey: false,
    timestamps: true,
  }
);

const AdPet = mongoose.model("AdPet", adPetSchema);
export default AdPet;
