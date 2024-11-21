import mongoose from 'mongoose';

const existingPetSchema = new mongoose.Schema({
  petType: {
    type: String,
    enum: ['dog', 'cat', 'other'],
    required: true
  },
  otherPetType: String,
  count: Number,
  ages: String,
  genders: [{
    type: String,
    enum: ['male', 'male_neutered', 'female', 'female_spayed']
  }],
  characterDescription: String,
  compatibility: {
    type: String,
    enum: ['compatible_same_species', 'compatible_other_species', 'not_compatible', 'unknown']
  }
});

const questionnaireSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  housingSituation: {
    type: String,
    enum: ['apartment_shared_entrance', 'apartment_separate_entrance', 'house', 'mostly_outdoors'],
    required: true
  },

  dailyAloneHours: {
    type: Number,
    required: true
  },

  adaptationPeriodDays: {
    type: Number,
    required: true
  },

  workplaceAccommodation: {
    canTakePet: {
      type: String,
      enum: ['yes', 'no', 'not_necessary'],
      required: true
    },
    workplaceHousingDetails: String
  },

  emergencyCare: {
    type: String,
    enum: ['yes', 'will_find_upon_adoption'],
    required: true
  },

  householdComposition: {
    type: String,
    required: true
  },

  canSeparatePetDuringVisits: {
    type: Boolean,
    required: true
  },

  currentPets: {
    hasPets: {
      type: Boolean,
      required: true
    },
    pets: [existingPetSchema]
  },

  petExperience: {
    hasPreviousExperience: Boolean,
    confidenceLevels: [{
      type: String,
      enum: [
        'previous_ownership',
        'multiple_pets_experience',
        'confident_with_challenging_pets',
        'understand_serious_behavioral_management'
      ]
    }]
  },

  specialRequirements: {
    hasExperience: Boolean,
    types: [{
      type: String,
      enum: [
        'nervousness_restlessness',
        'separation_anxiety',
        'self_harming',
        'fearfulness',
        'strong_prey_drive',
        'resource_guarding',
        'aggression_humans',
        'aggression_strangers',
        'aggression_family',
        'aggression_animals',
        'other'
      ]
    }]
  },

  healthIssues: {
    hasExperience: Boolean,
    conditions: [{
      type: String,
      enum: [
        'joint_issues',
        'gastrointestinal',
        'heart_disease',
        'thyroid',
        'kidney_disease',
        'liver_disease',
        'allergies',
        'diabetes',
        'other'
      ]
    }]
  },

  medicationAdministration: {
    type: String,
    enum: ['yes', 'need_consultation'],
    required: true
  },

  trainingPlans: {
    type: String,
    enum: ['yes', 'no', 'depends'],
    required: true
  },

  trainingMethodKnowledge: {
    type: String,
    enum: ['familiar', 'need_consultation'],
    required: true
  },

  previousAdoption: {
    hasAdopted: Boolean,
    adoptedAnimals: String
  },

  petSurrender: {
    hasSurrendered: Boolean,
    surrenderReason: String
  },

  livingConditionsDescription: {
    type: String,
    required: true
  },

  additionalInformation: String,

  legalConsiderations: {
    rentalAgreementAcknowledged: {
      type: Boolean,
      required: true
    },
    allergyAcknowledged: {
      type: Boolean,
      required: true
    }
  }
}, {
  collection: 'Questionnaires',
  timestamps: true,
  versionKey: false
});

export default mongoose.model('Questionnaire', questionnaireSchema);