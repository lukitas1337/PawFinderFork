import { useReducer } from "react";

import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const initialState = {
  fullName: "",
  password: "",
  email: "",
};
const reducer = (state, action) => {
  switch (action.type) {
    case "setFullName":
      return { ...state, fullName: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    case "setEmail":
      return { ...state, email: action.payload };
    default:
      return state;
  }
};
function Registration() {
  const [{ fullName, password, email }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const newUser = { fullName, email, password };
    navigate("/");
  }
  return (
    <main>
      <div className="bg-light w-[40%] my-[10rem] mx-auto p-[8rem] flex flex-col gap-[5rem] items-center rounded-[10rem] shadow-2xl">
        <h2 className="text-[2.4rem] font-bold">Create your account</h2>
        <form
          className="registerForm flex flex-col gap-[5rem] w-[50%] mx-auto text-[1.6rem]"
          onSubmit={handleSubmit}
        >
          <input
            className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              dispatch({ type: "setFullName", payload: e.target.value })
            }
            required
          />

          <input
            className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              dispatch({ type: "setEmail", payload: e.target.value })
            }
            required
          />
          <input
            className="border-b-2 border-dark text-dark bg-transparent border-dashed py-[1rem]"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              dispatch({ type: "setPassword", payload: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="text-[1.6rem] text-white bg-red w-[50%] py-[1rem] rounded-[4rem] mx-auto"
          >
            Sign up
          </button>
        </form>
        <h2 className="text-[2.4rem] font-bold">Or</h2>
        <button className="btn flex items-center gap-[1rem] bg-white py-[1rem] px-[2rem] text-[1.6rem] rounded-[1.5rem] hover:bg-light hover:border-2 hover:border-dark">
          <span>
            <FcGoogle className="text-[2.4rem]" />
          </span>
          <span>Sign up with Google</span>
        </button>
      </div>
    </main>
  );
}

export default Registration;
