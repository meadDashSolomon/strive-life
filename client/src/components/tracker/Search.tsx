import React, { useState } from "react";
import axios from "axios";
import { Exercise } from "./exerciseInterface";

interface SearchProps {
  setter: React.Dispatch<React.SetStateAction<Exercise>>;
}

/**
 * Performs an API call to fetch exercises based on the search query.
 * @param {string} query - The search query.
 * @returns Promise containing the search results.
 */
function apiCall(query: string) {
  return axios.get(`https://api.api-ninjas.com/v1/exercises?name=${query}`, {
    headers: { "X-Api-Key": import.meta.env.VITE_EXERCISE_API },
  });
}

/**
 * Search component for finding and selecting exercises.
 * @param {SearchProps} props - Includes a setter function to update the selected exercise.
 */
const Search: React.FC<SearchProps> = ({ setter }) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [exList, setExList] = useState<Exercise[]>([]);

  /**
   * Handles change in the search input field.
   * @param {React.FormEvent<HTMLInputElement>} evt - The event object.
   */
  function inputChange(evt: React.FormEvent<HTMLInputElement>) {
    setSearchVal(evt.currentTarget.value);
  }

  /**
   * Handles the 'Enter' key event in the search input field to trigger the search.
   * @param {React.KeyboardEvent<HTMLInputElement>} evt - The keyboard event object.
   */
  function enterHit(evt: React.KeyboardEvent<HTMLInputElement>) {
    if (evt.key === "Enter") {
      evt.preventDefault();
      const trimmedSearchVal = searchVal.trim();
      if (trimmedSearchVal.length > 0) {
        apiCall(trimmedSearchVal)
          .then((data) => setExList(data.data))
          .catch((err) => console.error("apiCall error", err));
        evt.currentTarget.value = "";
        setSearchVal("");
      }
    }
  }

  /**
   * Handles changes in the dropdown menu for selecting an exercise.
   * @param {React.ChangeEvent<HTMLSelectElement>} evt - The change event object.
   */
  function dropdownChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    setter(exList[Number(evt.currentTarget.value)]);
  }

  /**
   * Renders the dropdown menu with search results.
   * @returns JSX element containing the dropdown options.
   */
  function renderDropdown() {
    return exList.map((ex, index) => (
      <option
        key={index}
        value={index}>
        {ex.name}
      </option>
    ));
  }

  return (
    <div className="m-auto">
      <input
        type="search"
        placeholder="Search Exercise Name"
        onChange={inputChange}
        onKeyDown={enterHit}
        className="w-full mb-2 p-1 bg-neutral"
      />
      <select
        onChange={dropdownChange}
        className="w-full mb-2 bg-neutral">
        {renderDropdown()}
      </select>
    </div>
  );
};

export default Search;
