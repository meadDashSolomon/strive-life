import React, { useState, useEffect } from "react";
import TrackerModal from "./TrackModal";
import Search from "./Search";
import axios from "axios";

interface TrackerProps {
  currentUsername: string;
}

interface WorkoutDetail {
  exercise: {
    name: string;
  };
  set: number;
  rep: number;
}

interface WorkoutRecord {
  date: Date;
  workout: WorkoutDetail[];
}

/**
 * Tracker component for displaying and managing user workout records.
 * @param {TrackerProps} props - Properties including the current user's username.
 */
const Tracker: React.FC<TrackerProps> = ({ currentUsername }) => {
  const [tracked, setTracked] = useState<WorkoutRecord[]>([]);

  // Adds a new workout to the tracked list
  const addWorkout = (input: WorkoutDetail[]) => {
    if (input.length > 0) {
      const newRecord: WorkoutRecord = {
        workout: input,
        date: new Date(),
      };
      setTracked((prev) => [...prev, newRecord]);
    }
  };

  // Lists workouts in an accordion
  const listWorkout = (workouts: WorkoutDetail[]) => {
    return workouts.map((v, index) => (
      <div
        key={index}
        className="flex flex-col bg-neutral p-2 my-2 rounded-md">
        <div>{v.exercise.name}</div>
        <div>
          {v.set} x {v.rep}
        </div>
      </div>
    ));
  };

  // Renders the accordion for each tracked workout
  const renderAccordion = () => {
    return tracked.map((v, index) => (
      <div
        key={index}
        className="collapse collapse-arrow border border-base-300 mb-2 rounded-md">
        <input
          type="checkbox"
          className="peer"
          id={`accordion-item-${index}`}
        />
        <label
          htmlFor={`accordion-item-${index}`}
          className="collapse-title text-xl font-medium cursor-pointer">
          {v.date.toLocaleDateString()}
        </label>
        <div className="collapse-content">{listWorkout(v.workout)}</div>
      </div>
    ));
  };

  // Reformats the workout data fetched from the server
  const reformWO = (val: any) => {
    const workoutDetails: WorkoutDetail[] = val.exercise.map((el: any) => ({
      exercise: { name: el.exercise_name },
      set: el.set,
      rep: el.rep,
    }));

    return {
      date: new Date(val.created_at),
      workout: workoutDetails,
    };
  };

  // Fetches workout records on component mount
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/tracker`, {
        params: { username: currentUsername },
        withCredentials: true,
      })
      .then((data) => setTracked(data.data.map(reformWO)))
      .catch(console.error);
  }, [currentUsername]);
  return (
    <>
      <div className="m-4">
        <TrackerModal
          addWorkout={addWorkout}
          currentUsername={currentUsername}
        />
      </div>
      <div className="overflow-auto h-[500px]">
        <div className="join join-vertical w-[500px]">{renderAccordion()}</div>
      </div>
    </>
  );
};

export default Tracker;
