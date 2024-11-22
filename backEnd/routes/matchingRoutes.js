import express from 'express';
import { OpenAI } from 'openai';
import Pet from '../models/petsModel.js';
import User from '../models/usersModel.js';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/calculate-match/:userId/:petId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || !user.petPreferences || !user.questionnaire) {
      return res.status(400).json({ 
        message: 'User not found or preferences/questionnaire not completed' 
      });
    }

    const pet = await Pet.findById(req.params.petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

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

      Adopter Preferences:
      - Preferred pet type: ${user.petPreferences.petType}
      - Preferred age range: ${user.petPreferences.ageRange.min}-${user.petPreferences.ageRange.max} months
      - Preferred size: ${user.petPreferences.size.join(', ')}
      - Preferred gender: ${user.petPreferences.gender.join(', ')}
      - Desired characteristics: ${user.petPreferences.character.join(', ')}

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
      2. A detailed explanation for the potential adopter about why this score was given, mentioning specific matching points and potential concerns. Use the pet's name in the explanation.
      3. A separate professional assessment for the shelter staff about this match, including any specific recommendations or concerns they should consider.

      Format the response as a JSON object with these keys: "score", "adopterExplanation", "shelterAssessment"
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const matchingResult = JSON.parse(completion.choices[0].message.content);

    res.json({
      petId: pet._id,
      petName: pet.name,
      userId: user._id,
      userName: user.fullName,
      ...matchingResult
    });

  } catch (error) {
    console.error('Matching error:', error);
    res.status(500).json({ 
      message: 'Error calculating match score',
      error: error.message 
    });
  }
});

export default router;