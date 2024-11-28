import { OpenAI } from 'openai';
import { encode } from 'gpt-tokenizer';
import Pet from '../models/petsModel.js';
import User from '../models/usersModel.js';
import MatchResult from '../models/matchResultModel.js';
import { CustomError } from '../utils/errorHandler.js';
import mongoose from 'mongoose';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MAX_TOKENS = 100000;

export const calculateMatch = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || !user.petPreferences || !user.questionnaire) {
      throw new CustomError('User not found or preferences/questionnaire not completed', 400);
    }

    const pet = await Pet.findById(req.params.petId);
    if (!pet) {
      throw new CustomError('Pet not found', 404);
    }

    // const prompt = `
    //   As an expert in pet adoption matching, analyze the compatibility between this potential adopter and pet.
    //   Provide a matching score (0-100) and detailed explanations.

    //   Pet Information:
    //   - Name: ${pet.name}
    //   - Type: ${pet.animalType}
    //   - Breed: ${pet.breed}
    //   - Age: ${pet.age} months
    //   - Gender: ${pet.gender}
    //   - Energy Level: ${pet.energyLevel}
    //   - Description: ${pet.description}
    //   - Temperament: ${pet.temperament}
    //   - Sociable with other pets: ${pet.sociableWithOtherPets}
    //   - Sociable with kids: ${pet.sociableWithKids}
    //   - Exercise needs: ${pet.exerciseNeeds}

    //   Adopter Preferences:
    //   - Preferred pet type: ${user.petPreferences.petType}
    //   - Preferred age range: ${user.petPreferences.ageRange.min}-${user.petPreferences.ageRange.max} months
    //   - Preferred size: ${user.petPreferences.size.join(', ')}
    //   - Preferred gender: ${user.petPreferences.gender.join(', ')}
    //   - Desired characteristics: ${user.petPreferences.character.join(', ')}

    //   Adopter Living Situation:
    //   - Housing: ${user.questionnaire.housingSituation}
    //   - Daily alone hours: ${user.questionnaire.dailyAloneHours}
    //   - Workplace accommodation: ${user.questionnaire.workplaceAccommodation}
    //   - Household: ${user.questionnaire.householdComposition}
    //   - Pet experience: ${user.questionnaire.hasPetExperience}
    //   - Current pets: ${user.questionnaire.currentPets.hasPets ? user.questionnaire.currentPets.petDetails : 'None'}
    //   - Previous adoption experience: ${user.questionnaire.previousAdoption.hasAdopted}
    //   - Additional information: ${user.questionnaire.additionalInformation || 'None provided'}

    //   Please provide:
    //   1. A matching score (0-100)
    //   2. Limited to 600 characters. A detailed explanation for the potential adopter about why this score was given, mentioning specific matching points and potential concerns. Use the pet's name in the explanation.
    //   3. Limited to 600 characters. A detailed explanation for the shelterabout why this score was given, mentioning specific matching points and potential concerns.
      
    //   Format the response as a JSON object with these keys: "score", "adopterExplanation", "shelterAssessment"
    // `;

    const prompt = `
    As an expert in pet adoption matching, analyze the compatibility between this potential adopter and pet.
    Provide a matching score (0-100) and detailed explanations.

    Pet Information:
    - Name: ${pet.name}
    - Type: ${pet.animalType}
    - Breed: ${pet.breed}
    - Age: ${pet.age} months
    - Gender: ${pet.gender}
    - Energy Level: ${pet.energyLevel}
    - Description: ${pet.description}
    - Temperament: ${pet.temperament}
    - Sociable with other pets: ${pet.sociableWithOtherPets}
    - Sociable with kids: ${pet.sociableWithKids}
    - Exercise needs: ${pet.exerciseNeeds}

    Adopter Living Situation:
    - Housing: ${user.questionnaire.housingSituation}
    - Daily alone hours: ${user.questionnaire.dailyAloneHours}
    - Workplace accommodation: ${user.questionnaire.workplaceAccommodation}
    - Household: ${user.questionnaire.householdComposition}
    - Pet experience: ${user.questionnaire.hasPetExperience}
    - Current pets: ${user.questionnaire.currentPets.hasPets ? user.questionnaire.currentPets.petDetails : 'None'}
    - Previous adoption experience: ${user.questionnaire.previousAdoption.hasAdopted}
    - Additional information: ${user.questionnaire.additionalInformation || 'None provided'}

    Please provide:
    1. A matching score (0-100)
    2. Limited to 600 characters. A detailed explanation for the potential adopter about why this score was given, mentioning specific matching points and potential concerns. Use the pet's name in the explanation.
    3. Limited to 600 characters. A detailed explanation for the shelterabout why this score was given, mentioning specific matching points and potential concerns.
    
    Format the response as a JSON object with these keys: "score", "adopterExplanation", "shelterAssessment"
  `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const matchingResult = JSON.parse(completion.choices[0].message.content);

    const matchResult = await MatchResult.create({
      petId: pet._id,
      userId: user._id,
      shelterId: pet.ownerId,
      score: matchingResult.score,
      adopterExplanation: matchingResult.adopterExplanation,
      shelterAssessment: matchingResult.shelterAssessment
    });

    res.json({
      petId: pet._id,
      petName: pet.name,
      userId: user._id,
      userName: user.fullName,
      ...matchingResult
    });

  } catch (error) {
    next(new CustomError(error.message || 'Error calculating match score', 500));
  }
};


export const getMatchResult = async (req, res, next) => {
  try {
    const result = await MatchResult.findOne({
      userId: req.params.userId,
      petId: req.params.petId
    });
    if (!result) {
      throw new CustomError('Match result not found', 404);
    }
    res.json(result);
  } catch (error) {
    next(new CustomError('Error fetching match result', 500));
  }
};

export const getShelterMatches = async (req, res, next) => {
  try {
    const results = await MatchResult.find({
      shelterId: req.params.shelterId
    }).populate('petId userId');
    res.json(results);
  } catch (error) {
    next(new CustomError('Error fetching shelter match results', 500));
  }
};


export const calculateBulkMatches = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const pets = await Pet.find({ adopted: false });

    const allResults = [];
    let currentBatch = [];
    let currentTokens = 0;
    const basePrompt = createBulkMatchingPrompt(user, []);
    const baseTokenCount = encode(basePrompt).length;

    for (const pet of pets) {
      const testPrompt = createBulkMatchingPrompt(user, [...currentBatch, pet]);
      const newTokenCount = encode(testPrompt).length;

      if (newTokenCount > MAX_TOKENS && currentBatch.length > 0) {
        console.log(`Processing batch of ${currentBatch.length} pets`);
        const batchResults = await processBulkBatch(user, currentBatch);
        allResults.push(...batchResults);
        currentBatch = [pet];
        currentTokens = baseTokenCount;
      } else {
        currentBatch.push(pet);
        currentTokens = newTokenCount;
      }
    }

    if (currentBatch.length > 0) {
      const batchResults = await processBulkBatch(user, currentBatch);
      allResults.push(...batchResults);
    }

    res.json(allResults);
  } catch (error) {
    next(error);
  }
};

export const getMatchResultWithDetails = async (req, res, next) => {
  try {
    const result = await MatchResult.findOne({
      userId: req.params.userId,
      petId: req.params.petId
    });

    if (!result) {
      throw new CustomError('Match result not found', 404);
    }

    if (!result.adopterExplanation || !result.shelterAssessment) {
      const user = await User.findById(req.params.userId);
      const pet = await Pet.findById(req.params.petId);
      
      const prompt = `
        As a pet adoption expert, explain this ${result.score}/100 compatibility score between:

        Pet:
        - Name: ${pet.name}
        - Type: ${pet.animalType}
        - Age: ${pet.age} months
        - Gender: ${pet.gender}
        - Energy: ${pet.energyLevel}
        - Temperament: ${pet.temperament}
        - Sociability: Pets: ${pet.sociableWithOtherPets}, Kids: ${pet.sociableWithKids}

        Adopter:
        - Housing: ${user.questionnaire.housingSituation}
        - Hours alone: ${user.questionnaire.dailyAloneHours}
        - Experience: ${user.questionnaire.hasPetExperience}
        - Current pets: ${user.questionnaire.currentPets.hasPets ? user.questionnaire.currentPets.petDetails : 'None'}

        Provide:
        1. A detailed explanation for the adopter (use pet's name)
        2. A professional assessment for shelter staff

        Format as JSON with keys: "adopterExplanation", "shelterAssessment"
      `;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4-turbo-preview",
        response_format: { type: "json_object" },
        temperature: 0.7,
      });

      const explanations = JSON.parse(completion.choices[0].message.content);
      
      result.adopterExplanation = explanations.adopterExplanation;
      result.shelterAssessment = explanations.shelterAssessment;
      await result.save();
    }

    res.json(result);
  } catch (error) {
    next(new CustomError('Error fetching match details', 500));
  }
};

export const getUserMatchScores = async (req, res, next) => {
  try {
    const { userId } = req.params;
    
    const matchResults = await MatchResult.find({ 
      userId: userId 
    }).select('petId score -_id');
    
    res.json(matchResults);
  } catch (error) {
    next(new CustomError('Error fetching user match scores', 500));
  }
};

// - Type: ${user.petPreferences.petType}
// - Age range: ${user.petPreferences.ageRange.min}-${user.petPreferences.ageRange.max} months
// - Size: ${user.petPreferences.size.join(', ')}

function createBulkMatchingPrompt(user, pets) {
  return `
    As a pet adoption expert, provide numerical compatibility scores (0-100) for these matches.
    Consider the adopter's preferences and each pet's characteristics carefully.
    Scores should reflect genuine compatibility - use the full range from 0 to 100.

    Adopter:
    - Housing: ${user.questionnaire.housingSituation}
    - Hours alone: ${user.questionnaire.dailyAloneHours}
    - Experience: ${user.questionnaire.hasPetExperience}
    - Current pets: ${user.questionnaire.currentPets.hasPets ? 'Yes' : 'No'}

    Pets to Score:
    ${pets.map(pet => `
    ID: "${pet._id}"
    ${pet.name}: ${pet.animalType}, ${pet.breed}, ${pet.age}mo, ${pet.gender}
    Energy: ${pet.energyLevel}, Temperament: ${pet.temperament}
    Good with: Pets: ${pet.sociableWithOtherPets}, Kids: ${pet.sociableWithKids}
    Exercise needs: ${pet.exerciseNeeds}
    `).join('\n')}

    Respond with a JSON object using the exact pet IDs as keys, each containing a "score" value (0-100).
    Higher scores (70-100) indicate better matches based on preferences and compatibility.
    Example format: { "actual-pet-id-here": { "score": 85 }, "another-pet-id": { "score": 72 } }
  `;
}

async function processBulkBatch(user, pets) {
  const prompt = createBulkMatchingPrompt(user, pets);

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4-turbo-preview",
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const batchResults = JSON.parse(completion.choices[0].message.content);
  
  
  const results = await Promise.all(
    Object.entries(batchResults).map(async ([petId, result]) => {
      const cleanPetId = petId.replace(/"/g, '');
      const pet = pets.find(p => p._id.toString() === cleanPetId);
      
      if (!pet) {
        return null;
      }

      try {
        const existingMatch = await MatchResult.findOneAndUpdate(
          { petId: pet._id, userId: user._id },
          { 
            $set: { 
              score: result.score,
              shelterId: pet.ownerId,
              status: 'pending'
            }
          },
          { upsert: true, new: true }
        );
        return existingMatch;
      } catch (error) {
        console.error(`Error updating match for pet ${pet._id}:`, error);
        return null;
      }
    })
  );

  return results.filter(Boolean);
}