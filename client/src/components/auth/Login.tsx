import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";

interface LoginInputs {
  username?: string;
  password?: string;
}

export default function Login() {
  const { setAuth } = useContext(AuthContext);
  const [inputs, setInputs] = useState<LoginInputs>({});
  const navigate = useNavigate();

  /**
   * Navigate to the signup page.
   */
  const handleSignupClick = () => {
    navigate("/signup");
  };

  /**
   * Update state on input change.
   * @param {ChangeEvent<HTMLInputElement>} e - The event triggered on input change.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  /**
   * Handle form submission to log in the user.
   * @param {FormEvent<HTMLFormElement>} e - The event triggered on form submission.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = inputs;

    try {
      const resp = await axios.post(
        "http://localhost:8080/auth",
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const { accessToken, id } = resp.data;
      setAuth({ username, accessToken, id });

      // Navigate to the planner page
      navigate("/planner");
    } catch (err) {
      console.error(err);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-primary">
      <div className="w-full max-w-xs">
        <h2 className="text-center py-5 text-lg font-semibold text-secondary">
          Login Below
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-secondary text-sm font-bold mb-2">
              Username:
            </label>
            <input
              required
              type="text"
              name="username"
              value={inputs.username || ""}
              placeholder="Enter username here"
              className="input input-bordered w-full text-secondary"
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="block text-secondary text-sm font-bold mb-2">
              Password:
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

          <div className="flex items-center justify-between mt-4">
            <span className="inline-block align-baseline font-bold text-sm text-secondary">
              Need an account?
            </span>
            <a
              href="#signup"
              onClick={handleSignupClick}
              className="inline-block align-baseline font-bold text-sm text-accent hover:text-accent-hover">
              Sign Up
            </a>
          </div>

          <div className="mt-8">
            <input
              type="submit"
              value="Login"
              className="btn block w-full bg-accent text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
