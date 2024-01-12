import React, { useState, ChangeEvent, FormEvent } from "react";

interface PersonalInfoProps {
  handlePersonalInfo: (info: PersonalInfoState) => void;
}

interface PersonalInfoState {
  experience: string;
  equipment: boolean;
  trainer: boolean;
  age: string;
  weight: string;
  sex: "male" | "female";
  name?: string;
  heightInFeet?: number;
  heightInInches?: number;
  goals?: string;
}

/**
 * Component for capturing and submitting personal information of a user.
 * @param {PersonalInfoProps} props - Component props with a handler for submitting personal information.
 */
const PersonalInfo: React.FC<PersonalInfoProps> = ({ handlePersonalInfo }) => {
  // State for managing form inputs
  const [inputs, setInputs] = useState<PersonalInfoState>({
    experience: "1",
    equipment: true,
    trainer: false,
    age: "18",
    weight: "150",
    sex: "male",
  });

  // State for managing checkbox states
  const [equipmentChecked, setEquipmentChecked] = useState(true);
  const [trainerChecked, setTrainerChecked] = useState(false);
  const [sexChecked, setSexChecked] = useState("male");

  /**
   * Toggles the sex state between 'male' and 'female' and updates the inputs state.
   */
  const HandleSexChecked = () => {
    const newSex = sexChecked === "male" ? "female" : "male";
    setSexChecked(newSex);
    setInputs((values) => ({ ...values, sex: newSex }));
  };

  /**
   * Toggles the trainer state and updates the inputs state.
   */
  const handleTrainerChecked = () => {
    setTrainerChecked(!trainerChecked);
    setInputs((values) => ({ ...values, trainer: !trainerChecked }));
  };

  /**
   * Toggles the equipment state and updates the inputs state.
   */
  const handleEquipmentChecked = () => {
    setEquipmentChecked(!equipmentChecked);
    setInputs((values) => ({ ...values, equipment: !equipmentChecked }));
  };

  /**
   * Updates the inputs state based on the current value of form elements.
   * @param {ChangeEvent<HTMLInputElement>} e - Event triggered on form element change.
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  /**
   * Handles form submission, computes height, and constructs the user info object.
   * @param {FormEvent<HTMLFormElement>} e - Event triggered on form submission.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Calculate height based on feet and inches input
    const height =
      Number(inputs.heightInFeet) * 12 + Number(inputs.heightInInches);

    // Construct the user info object based on the form inputs
    const resultingInfo = {
      name: inputs.name,
      age: Number(inputs.age),
      sex: inputs.sex,
      height: height,
      weight: Number(inputs.weight),
      experience: Number(inputs.experience),
      goals: inputs.goals,
      equipment: inputs.equipment,
      trainer: inputs.trainer,
    };

    // Call the passed-in handler function with the constructed user info object
    handlePersonalInfo(resultingInfo);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-primary">
      <div className="w-full max-w-xs">
        <h2 className="text-center py-5 text-lg font-semibold text-secondary">
          Create Your Account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-base-100 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="label">
              <span className="label-text text-secondary">
                Enter your name:{" "}
              </span>
            </label>
            <input
              required
              type="text"
              name="name"
              value={inputs.name || ""}
              placeholder="ex: Arnold Schwarzenegger"
              className="input input-bordered w-full max-w-xs text-secondary bg-base-100"
              onChange={handleChange}
            />
          </div>

          {/* Age Input */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text text-secondary">
                Enter your age:{" "}
              </span>
            </label>
            <input
              required
              type="number"
              name="age"
              min={16}
              max={120}
              value={inputs.age || 18}
              className="input input-bordered w-full text-secondary bg-base-100"
              onChange={handleChange}
            />
          </div>

          {/* Sex Radio Buttons */}
          <div className="mb-4">
            <span className="label-text text-secondary">What is your sex?</span>
            <div className="flex gap-4">
              <label className="label cursor-pointer flex items-center">
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  className="radio checked:bg-accent"
                  checked={sexChecked === "male"}
                  onChange={HandleSexChecked}
                />
                <span className="label-text ml-2">Male</span>
              </label>
              <label className="label cursor-pointer flex items-center">
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  className="radio checked:bg-accent"
                  checked={sexChecked === "female"}
                  onChange={HandleSexChecked}
                />
                <span className="label-text ml-2">Female</span>
              </label>
            </div>
          </div>

          {/* Height Inputs */}
          <div className="mb-4 flex gap-4">
            <input
              required
              type="number"
              name="heightInFeet"
              min={4}
              max={7}
              value={inputs.heightInFeet || ""}
              placeholder="Ft."
              className="input input-bordered w-20 text-secondary bg-base-100"
              onChange={handleChange}
            />
            <input
              required
              type="number"
              name="heightInInches"
              min={0}
              max={11}
              value={inputs.heightInInches || ""}
              placeholder="In."
              className="input input-bordered w-20 text-secondary bg-base-100"
              onChange={handleChange}
            />
          </div>

          {/* Weight Input */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text text-secondary">
                Enter your weight:
              </span>
            </label>
            <input
              required
              type="number"
              name="weight"
              min={70}
              max={500}
              value={inputs.weight || "150"}
              className="input input-bordered w-full text-secondary bg-base-100"
              onChange={handleChange}
            />
          </div>

          {/* Experience Range Input */}
          <div className="mb-4">
            <label className="label">
              <span className="label-text text-secondary">
                How experienced are you?
              </span>
            </label>
            <input
              type="range"
              name="experience"
              min={0}
              max={2}
              defaultValue={1}
              className="range range-accent"
              step={1}
              onChange={handleChange}
            />
            <div className="w-full flex justify-between text-xs px-2">
              <span className="text-secondary">Scrub</span>
              <span className="text-secondary">Bro</span>
              <span className="text-secondary">Gym Bro</span>
            </div>
          </div>

          {/* Equipment Checkbox */}
          <div className="mb-4 form-control">
            <label className="label cursor-pointer flex items-center">
              <input
                type="checkbox"
                name="equipment"
                className="toggle toggle-accent"
                checked={equipmentChecked}
                onChange={handleEquipmentChecked}
              />
              <span className="label-text ml-2 text-secondary">
                I have equipment / gym
              </span>
            </label>
          </div>

          {/* Goals Select */}
          <div className="mb-4 form-control w-full">
            <label className="label">
              <span className="label-text text-secondary">
                What is your primary goal at the gym?
              </span>
            </label>
            <select
              required
              className="select select-bordered w-full text-secondary bg-base-100"
              name="goals"
              onChange={handleChange}>
              <option
                disabled
                selected>
                Pick one
              </option>
              <option>Lose weight</option>
              <option>Gain muscle mass</option>
              <option>Improve muscle tonality</option>
              <option>Improve cardio</option>
            </select>
          </div>

          {/* Trainer Checkbox */}
          <div className="mb-4 form-control">
            <label className="label cursor-pointer flex items-center">
              <input
                type="checkbox"
                name="trainer"
                className="toggle toggle-accent"
                checked={trainerChecked}
                onChange={handleTrainerChecked}
              />
              <span className="label-text ml-2 text-secondary">
                Yes, I am a trainer
              </span>
            </label>
          </div>

          <div className="mt-8">
            <input
              type="submit"
              value="Submit"
              className="btn w-full bg-accent text-base-100 font-bold py-2 px-4 rounded"
            />
          </div>
        </form>
      </div>

      <div className="w-full max-w-xs my-8">
        <ul className="steps">
          <li className="step step-accent">Create Account</li>
          <li className="step step-accent">Personal Info</li>
          <li className="step">Login</li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalInfo;
