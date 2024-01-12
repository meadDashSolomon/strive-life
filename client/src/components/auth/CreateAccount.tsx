import React, { useState, ChangeEvent, FormEvent } from "react";

interface CreateAccountProps {
  handleCreateAccount: (inputs: {
    username?: string;
    password?: string;
    email?: string;
  }) => void;
}

/**
 * Component for creating a new account.
 * @param {CreateAccountProps} props - Component props
 */
const CreateAccount: React.FC<CreateAccountProps> = ({
  handleCreateAccount,
}) => {
  const [inputs, setInputs] = useState<{
    username?: string;
    password?: string;
    email?: string;
  }>({});

  /**
   * Handles input changes and updates the state.
   * @param {ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  /**
   * Handles the submission of the form.
   * @param {FormEvent<HTMLFormElement>} e - Form event
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateAccount(inputs);
  };

  return (
    <div className="flex flex-col items-center py-5 min-h-screen bg-primary">
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-secondary text-sm font-bold mb-2">
              Enter a username:
            </label>
            <input
              required
              type="text"
              name="username"
              value={inputs.username || ""}
              placeholder="ex: mrOlympia2023"
              className="input input-bordered w-full text-secondary"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-secondary text-sm font-bold mb-2">
              Create a password:
            </label>
            <input
              required
              type="password"
              name="password"
              value={inputs.password || ""}
              placeholder="Enter password here"
              className="input input-bordered w-full text-secondary"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-secondary text-sm font-bold mb-2">
              Enter your email address:
            </label>
            <input
              required
              type="text"
              name="email"
              value={inputs.email || ""}
              placeholder="ex: mrOlympia@gmail.com"
              className="input input-bordered w-full text-secondary"
              onChange={handleChange}
            />
          </div>

          <div className="mt-8">
            <input
              type="submit"
              value="Submit"
              className="btn block w-full bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
        </form>
      </div>

      <div className="w-full max-w-xs my-8">
        <ul className="steps">
          <li className="step step-accent">Create Account</li>
          <li className="step">Personal Info</li>
          <li className="step">Login</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateAccount;
