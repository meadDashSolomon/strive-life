import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import Workouts from "./subcomponents/Workouts.jsx";
import AuthContext from "../auth/context/AuthProvider.js";
interface PlannerProps {
  currentUsername: string;
}

/**
 * Planner component for creating and managing workout plans.
 * @param {PlannerProps} props - Component props including the current user's username.
 */
const Planner: React.FC<PlannerProps> = ({ currentUsername }) => {
  const [exercises, setExercises] = useState([]); // List of exercises based on workout type
  const [workouts, setWorkouts] = useState([]); // List of selected workouts
  const [workoutCount, setWorkoutCount] = useState(0); // Counter for workouts
  const [workoutType, setWorkoutType] = useState("SELECT WORKOUT TYPE"); // Current workout type
  const exModalRef = useRef(null); // Ref for the exercise modal
  const user = useContext(AuthContext); // Current user context

  // Fetches exercises based on the selected workout type
  const getExercises = () => {
    axios
      .get(`https://api.api-ninjas.com/v1/exercises?type=${workoutType}`, {
        headers: { "X-Api-Key": import.meta.env.VITE_EXERCISE_API },
      })
      .then((response) => setExercises(response.data))
      .catch((err) => console.error(err));
  };

  // Handles workout type selection
  const handleSelect = (e) => {
    setWorkoutType(e.target.value);
    getExercises();
  };

  // Fetch exercises when the workout type changes
  useEffect(() => getExercises(), [workoutType]);

  // Shows exercise modal
  const showExModal = () => {
    if (workouts.length && exModalRef.current) exModalRef.current.showModal();
  };

  // Posts a new workout to the server
  const postWorkout = () => {
    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/tracker`,
        {
          username: currentUsername,
          exercises: workouts,
        },
        { withCredentials: true }
      )
      .then((data) => console.log("Posting new workout", data))
      .catch((err) => console.error("Error posting new workout", err));
  };

  // Adds a workout and resets the workouts state
  const addWorkout = () => {
    postWorkout();
    setWorkouts([]);
    setWorkoutCount(0);
  };

  return (
    <React.Fragment>
      <div
        className="flex items-center py-5 overflow-hidden"
        style={{ maxHeight: "90vh" }}>
        <div className="py-5 m-auto space-x-4 space-y-2">
          {/* Workout type selection dropdown */}
          <select
            className="select select-bordered w-full max-w-xs"
            value={workoutType}
            onChange={handleSelect}>
            <option disabled>SELECT WORKOUT TYPE</option>
            {/* Workout type options */}
            <option value="cardio">CARDIO</option>
            <option value="olympic_weightlifting">OLYMPIC WEIGHTLIFTING</option>
            <option value="plyometrics">PLYOMETRICS</option>
            <option value="powerlifting">POWERLIFTING</option>
            <option value="strength">STRENGTH</option>
            <option value="stretching">STRETCHING</option>
            <option value="strongman">STRONGMAN</option>
          </select>

          {/* Button to show exercises modal */}
          <button
            className="btn btn-accent border-2"
            onClick={showExModal}>
            Exercises
            <div className="badge badge-secondary">{workoutCount}</div>
          </button>

          {/* Exercises modal */}
          <dialog
            ref={exModalRef}
            className="modal">
            <form
              method="dialog"
              className="modal-box">
              <div className="py-4">
                {/* List of selected workouts */}
                {workouts.map((workout, i) => (
                  <p key={i}>{workout.exercise.name}</p>
                ))}
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => exModalRef.current.close()}>
                  Close
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={addWorkout}>
                  Add Workout
                </button>
              </div>
            </form>
          </dialog>

          {/* Workouts component */}
          <div
            className="flex items-center py-5"
            style={{ width: "65vw" }}>
            <Workouts
              exercises={exercises}
              workouts={workouts}
              setWorkouts={setWorkouts}
              workoutCount={workoutCount}
              setWorkoutCount={setWorkoutCount}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Planner;
