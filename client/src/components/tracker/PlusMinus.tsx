import React from "react";

interface PlusMinusProps {
  setter: React.Dispatch<React.SetStateAction<number>>;
  mainValue: number;
}

/**
 * PlusMinus component allows users to increment or decrement a numerical value.
 * @param {PlusMinusProps} props - Properties include a setter function for updating the value and the main value to display.
 */
const PlusMinus: React.FC<PlusMinusProps> = ({ setter, mainValue }) => {
  /**
   * Decrements the value, ensuring it doesn't go below zero.
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e - The event object.
   */
  const minus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (mainValue > 0) {
      setter(mainValue - 1);
    }
  };

  /**
   * Increments the value.
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e - The event object.
   */
  const plus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setter(mainValue + 1);
  };

  return (
    <>
      <button
        className="btn btn-sm m-2"
        onClick={minus}>
        -
      </button>
      {mainValue}
      <button
        className="btn btn-sm m-2"
        onClick={plus}>
        +
      </button>
    </>
  );
};

export default PlusMinus;
