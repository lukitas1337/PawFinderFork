import express from 'express';
import Questionnaire from '../models/Questionnaire.js';
import Pet from '../models/Pet.js';
import openai from '../config/openaiConfig.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// route to submit questionnaire and get matching results, needs to be adjusted later
router.post('/questionnaire', auth, async (req, res) => {
  try {
    const questionnaire = new Questionnaire({
      ...req.body,
      userId: req.user.userId
    });
    await questionnaire.save();

    const pets = await Pet.find({ adopted: false });

    // prompt to send to openai
    const matchingPrompt = `
      As a pet matching expert, analyze the compatibility between the user's preferences and available pets.
      Calculate a matching score (0-100) for each pet based on the following criteria:
      
      User Questionnaire:
      - Preferred Animal Type: ${questionnaire.preferredAnimalType}
      - Preferred Age Range: ${questionnaire.preferredAgeRange.min} to ${questionnaire.preferredAgeRange.max} years
      - Home Type: ${questionnaire.homeType}
      - Has Children: ${questionnaire.hasChildren}
      - Has Other Pets: ${questionnaire.hasOtherPets}
      - Hours Home Per Day: ${questionnaire.hoursHome}
      
      Available Pets:
      ${pets.map(pet => `
        Pet ID: ${pet._id}
        - Type: ${pet.animalType}
        - Age: ${pet.age}
        - Breed: ${pet.breed}
        - Description: ${pet.description}
      `).join('\n')}
      
      For each pet, provide:
      1. A matching score (0-100)
      2. A brief explanation of the score
      3. Key compatibility factors
      4. A short story about the pet and the potential new owner so that the user gets inspired to adopt the pet. Describe a typical nice day in the life of the pet with its new owner. Use the pets and the owners name and references to the location where the owner lives and close by parks and other places.
      
      Return the response as a JSON array of objects with pet_id, matching_score, and reasoning.
    `;

    const completion = await openai.chat.completions.create({
      messages: [
        { 
          // sets behavior of the AI
          role: "system", 
          content: "You are an expert pet matching assistant that helps match potential adopters with pets." 
        },
        { 
          // user input to be our matching prompt
          role: "user", 
          content: matchingPrompt 
        }
      ],
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" }
    });
// we parse the response
    const matches = JSON.parse(completion.choices[0].message.content);
// the response is made up of the questionnaire and the matches and we send it back to the user
    res.json({
      questionnaire,
      matches
    });

  } catch (error) {
    console.error('Matching error:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const questionnaires = await Questionnaire.find({ 
      userId: req.user.userId 
    }).sort({ createdAt: -1 });
    
    res.json(questionnaires);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;