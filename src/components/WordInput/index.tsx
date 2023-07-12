import React from "react";
import { useScrabbleScore } from "../../context";

export const WordInput: React.FC = () => {
  const { dispatch } = useScrabbleScore();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newWord = event.target.value;
    dispatch({ type: "SET_WORD", payload: newWord });
  };

  return (
    <input
      className="border border-gray-300 rounded px-3 py-2 w-full"
      type="text"
      onChange={handleInputChange}
      placeholder="Enter a word..."
    />
  );
};
