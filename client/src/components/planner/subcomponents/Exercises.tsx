import React from "react";
import Exercise from "./Exercise.tsx";

/**
 * Exercises component renders a list of individual Exercise components.
 * @param {Object} props - Includes exercises, workouts, and their respective setter functions, along with workoutCount.
 */
const Exercises = ({
  exercises,
  workouts,
  setWorkouts,
  workoutCount,
  setWorkoutCount,
}) => {
  return (
    <React.Fragment>
      <div className="flex items-left py-5 bg-neutral">
        <div className="pr-4 pl-2 w-2/3 text-left cursor-pointer font-bold">
          EXERCISE
        </div>
        <div className="pr-4 w-1/3 text-center font-bold">EQUIPMENT</div>
        <div className="pr-4 w-1/4 text-left font-bold">SETS</div>
        <div className="pr-2 w-1/4 text-left font-bold">REPS</div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {exercises.map((exercise, i) => (
          <Exercise
            key={i}
            exercise={exercise}
            setWorkouts={setWorkouts}
            workouts={workouts}
            workoutCount={workoutCount}
            setWorkoutCount={setWorkoutCount}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Exercises;
