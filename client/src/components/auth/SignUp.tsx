import { useState } from "react";
import axios from "axios";
import CreateAccount from "./CreateAccount";
import PersonalInfo from "./PersonalInfo";
import Login from "./Login";

/**
 * SignUp component handling user registration.
 * It consists of multiple steps for account creation and personal details entry.
 */
const SignUp = () => {
  // State for storing account details from the first step of the form
  const [accountDetails, setAccountDetails] = useState({});

  // State for storing personal details from the second step of the form
  const [personalDetails, setPersonalDetails] = useState({});

  // State for tracking the current step of the form
  const [step, setStep] = useState(1);

  /**
   * Handles the creation of account details.
   * @param {Object} inputs - The user inputs for account creation.
   */
  const handleCreateAccount = (inputs) => {
    setAccountDetails(inputs);
    setStep(step + 1);
  };

  /**
   * Handles the entry of personal details and triggers the signup process.
   * @param {Object} inputs - The user inputs for personal details.
   */
  const handlePersonalInfo = (inputs) => {
    setPersonalDetails(inputs);
    postSignup(accountDetails, inputs);
  };

  /**
   * Sends a POST request to the server with the combined account and personal details.
   * @param {Object} accountDetails - User's account details.
   * @param {Object} personalDetails - User's personal details.
   */
  const postSignup = (accountDetails, personalDetails) => {
    const completedDetails = {
      ...accountDetails,
      ...personalDetails,
    };

    // POST request to the server
    axios
      .post("http://localhost:8080/signup", completedDetails, {
        withCredentials: true,
      })
      .then(() => setStep(step + 1))
      .catch((err) => {
        console.error(err);
        alert("Whoops! Something went wrong. Try again in a few moments.");
      });
  };

  return (
    <div>
      {step === 1 ? (
        <CreateAccount handleCreateAccount={handleCreateAccount} />
      ) : step == 2 ? (
        <PersonalInfo handlePersonalInfo={handlePersonalInfo} />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default SignUp;
