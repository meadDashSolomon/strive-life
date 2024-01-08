import React, { useState, useEffect } from "react";
import TrackerModal from "./TrackModal";
import Search from "./Search";
import axios from "axios";

interface TrackerProps {
  currentUsername: string;
}

const Tracker: React.FC<TrackerProps> = ({ currentUsername }) => {
  const [tracked, setTracked] = useState([]);

  const addWorkout = (input) => {
    if (input.length > 0) {
      let arr = [];
      tracked.forEach((val) => arr.push(val));
      const d = new Date();
      arr.push({
        workout: input,
        date: d,
      });
      setTracked(arr);
    }
  };

  const listWorkout = (wo) => {
    return wo.map((v, index) => (
      <div
        key={index}
        className="flex flex-col bg-gray-600 p-2 my-2 rounded-md">
        <div>{v.exercise.name}</div>
        <div>
          {v.set} x {v.rep}
        </div>
      </div>
    ));
  };

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
          {v.date.getMonth() + 1}/{v.date.getDate()}/{v.date.getFullYear()}
        </label>
        <div className="collapse-content">{listWorkout(v.workout)}</div>
      </div>
    ));
  };

  const reformWO = (val) => {
    let arr = [];
    let d = new Date(val.created_at);
    val.date = d;
    val.exercise.map((el) => {
      arr.push({
        exercise: {
          name: el.exercise_name,
        },
        set: el.set,
        rep: el.rep,
      });
    });
    return {
      date: d,
      workout: arr,
    };
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/tracker`, {
        params: { username: currentUsername },
        withCredentials: true,
      })
      .then((data) => {
        let arr = [];
        data.data.forEach((val) => {
          arr.push(reformWO(val));
        });
        setTracked(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
