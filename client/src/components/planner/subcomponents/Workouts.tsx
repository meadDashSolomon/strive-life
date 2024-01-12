import Exercises from "./Exercises.tsx";

/**
 * Workouts component serves as a container for rendering the Exercises component.
 * @param {Object} props - Includes exercises, workouts, and their respective setter functions, along with workoutCount.
 */
const Workouts = ({
  exercises,
  workouts,
  setWorkouts,
  workoutCount,
  setWorkoutCount,
}) => {
  return (
    <div
      className="max-h-full overflow-auto"
      style={{ width: "100%" }}>
      <Exercises
        exercises={exercises}
        workouts={workouts}
        setWorkouts={setWorkouts}
        workoutCount={workoutCount}
        setWorkoutCount={setWorkoutCount}
      />
    </div>
  );
};

export default Workouts;
