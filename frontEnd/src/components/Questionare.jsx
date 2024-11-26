import { useReducer, useState } from "react";

const initialState = {
  housingSituation: "apartment_shared_entrance",
  dailyAloneHours: 0,
  workplaceAccommodation: "",
  householdComposition: "",
  hasPetExperience: "",
  currentPets: { hasPets: false, petDetails: "" },
  previousAdoption: { hasAdopted: false },
  petSurrender: { hasSurrendered: false },
  additionalInformation: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setHousing":
      return { ...state, housingSituation: action.payload };
    case "setAloneHours":
      return { ...state, dailyAloneHours: Number(action.payload) };
    default:
      return { ...state };
  }
}

function Questionare() {
  const [{ housingSituation, dailyAloneHours }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [questionare, setQuestionare] = useState({});
  function handleSubmit(e) {
    e.preventDefault();
    const newQuestionare = { housingSituation, dailyAloneHours };
    setQuestionare(newQuestionare);
  }
  console.log(questionare);
  return (
    <div className="bg-light w-[40%] my-[10rem] mx-auto p-[8rem] flex flex-col gap-[5rem] items-center rounded-[10rem] shadow-2xl">
      <h2 className="text-[2.4rem] font-bold">
        Please Fill out the form below
      </h2>
      <form
        className="questionareForm flex flex-col gap-[5rem] w-[50%] mx-auto text-[1.6rem]"
        onSubmit={handleSubmit}
      >
        <div className="inputGroup flex flex-col gap-[1.5rem]">
          <label htmlFor="housing">Please Select Your Housing Situation</label>
          <select
            className="text-[1.4rem] border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            value={housingSituation}
            onChange={(e) =>
              dispatch({ type: "setHousing", payload: e.target.value })
            }
          >
            <option value="apartment_shared_entrance">
              Apartment (shared entrance)
            </option>
            <option value="apartment_separate_entrance">
              Apartment (separate entrance)
            </option>
            <option value="house">House</option>
            <option value="mostly_outdoors">Mostly Outdoors</option>
          </select>
        </div>
        <div className="inputGroup flex flex-col gap-[1.5rem]">
          <label htmlFor="dailyAloneHours">
            How many hours in a day the pet would be alone?
          </label>
          <input
            className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            type="text"
            placeholder="Please enter a number"
            value={dailyAloneHours}
            onChange={(e) =>
              dispatch({ type: "setAloneHours", payload: e.target.value })
            }
            required
          />
        </div>

        {/* <input
          className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            dispatch({ type: "setEmail", payload: e.target.value })
          }
          required
        /> */}
        {/* <input
          className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            dispatch({ type: "setPassword", payload: e.target.value })
          }
          required
        /> */}

        <button
          type="submit"
          className="text-[1.6rem] text-white bg-red w-[50%] py-[1rem] rounded-[4rem] mx-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Questionare;
