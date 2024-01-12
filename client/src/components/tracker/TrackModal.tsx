import React, { useState, useEffect, useRef } from "react";
import { Exercise } from "./exerciseInterface.ts";
import Search from "./Search.tsx";
import PlusMinus from "./PlusMinus.tsx";
import axios from "axios";

interface exercisePlus {
  exercise: Exercise;
  set: number;
  rep: number;
}

interface TrackerModalProps {
  addWorkout: (workouts: ExercisePlus[]) => void;
  currentUsername: string;
}

/**
 * TrackerModal component for adding new workouts.
 * @param {TrackerModalProps} props - Includes addWorkout function and the current user's username.
 */
const TrackerModal: React.FC<TrackerModalProps> = ({
  addWorkout,
  currentUsername,
}) => {
  const [currSets, setCurrSets] = useState<number>(0);
  const [currReps, setCurrReps] = useState<number>(0);
  const [currExercise, setCurrExercise] = useState<Exercise | undefined>();
  const [exerciseList, setExerciseList] = useState<exercisePlus[]>([]);

  const addExercise = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (currExercise) {
      setExerciseList((prev) => [
        ...prev,
        { exercise: currExercise, set: currSets, rep: currReps },
      ]);
    }
  };

  const postWorkout = () => {
    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/tracker`,
        {
          username: currentUsername,
          exercises: exerciseList,
        },
        { withCredentials: true }
      )
      .then((data) => console.log(data))
      .catch((err) => console.error("Tracker getWorkouts error:", err));
  };

  return (
    <>
      <button
        className="btn"
        onClick={() => window.my_modal_3.showModal()}>
        Add Workout
      </button>
      <dialog
        id="my_modal_3"
        className="modal">
        <form
          method="dialog"
          className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div className="flex flex-row">
            <div className="flex-col w-2/5">
              <div>
                <Search setter={setCurrExercise}></Search>
              </div>
              <div>
                Sets:{" "}
                <PlusMinus
                  setter={setCurrSets}
                  mainValue={currSets}></PlusMinus>
              </div>
              <div>
                Reps:{" "}
                <PlusMinus
                  setter={setCurrReps}
                  mainValue={currReps}></PlusMinus>
              </div>
              <div className="flex flex-row">
                <div></div>
                <button
                  onClick={addExercise}
                  className="m-2 bg-neutral">
                  Add Exercise
                </button>
              </div>
            </div>
            <div className="text-left pl-4 overflow-auto h-[200px] w-3/5">
              {exerciseList.map((val, index) => (
                <div key={index}>
                  {val.exercise.name} : {val.set} x {val.rep}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              addWorkout(exerciseList);
              postWorkout();
              setExerciseList([]);
              window.my_modal_3.close();
            }}
            disabled={exerciseList.length === 0}
            className="bg-neutral">
            Confirm Workout
          </button>
        </form>
      </dialog>
    </>
  );
};

export default TrackerModal;
