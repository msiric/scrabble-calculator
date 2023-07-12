import React, { useEffect } from "react";
import { ScoreDisplay } from "./components/ScoreDisplay";
import { WordInput } from "./components/WordInput";
import { useScrabbleScore } from "./context";
import dictionary from "./data/dictionary.json";
import { isValidWord } from "./utils/helpers";

export type Scoring = {
  [key: string]: number;
};

export type State = {
  word: string;
  score: number;
  isValid: boolean;
  scoreBreakdown: string;
  longestWord: string;
  wordHistory: string[];
  highestScore: number;
};

export type Action =
  | { type: "SET_WORD"; payload: string }
  | { type: "SET_SCORE"; payload: string }
  | { type: "SET_VALIDITY"; payload: boolean }
  | { type: "UPDATE_HISTORY_AND_LONGEST"; payload: { word: string } }
  | { type: "DELETE_HISTORY" };

const App: React.FC = () => {
  const { state, dispatch } = useScrabbleScore();

  const { word } = state;

  useEffect(() => {
    dispatch({ type: "SET_SCORE", payload: word });
    const isValid = isValidWord(word, dictionary as string[]);
    dispatch({ type: "SET_VALIDITY", payload: isValid });
    if (isValid) {
      dispatch({ type: "UPDATE_HISTORY_AND_LONGEST", payload: { word } });
    }
  }, [word, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full pb-12">
      <div className="max-w-md w-full mx-auto px-4">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Scrabble Score Calculator
        </h1>
        <p className="text-center mx-auto my-2">
          The dictionary used for word validation can be found&nbsp;
          <a
            className="font-bold"
            href="https://raw.githubusercontent.com/benjamincrom/scrabble/master/scrabble/dictionary.json"
          >
            here
          </a>
        </p>
        <WordInput />
        <ScoreDisplay />
      </div>
    </div>
  );
};

export default App;
