import { Action, Scoring, State } from "../App";
import { calculateScoreBreakdown } from "../utils/helpers";
import scoring from "../data/scoring.json";
import {
  WORD_HISTORY_LS_KEY,
  LONGEST_WORD_LS_KEY,
  HIGHEST_SCORE_LS_KEY,
} from "../utils/constants";

export const initialState: State = {
  word: "",
  score: 0,
  isValid: true,
  scoreBreakdown: "",
  longestWord: localStorage.getItem("longestWord") || "",
  wordHistory: JSON.parse(localStorage.getItem("wordHistory") || "[]"),
  highestScore: Number(localStorage.getItem("highestScore")) || 0,
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_WORD":
      return { ...state, word: action.payload };
    case "SET_SCORE":
      const scoreBreakdown = calculateScoreBreakdown(
        action.payload,
        scoring as Scoring
      );
      return {
        ...state,
        score: scoreBreakdown.total,
        scoreBreakdown: scoreBreakdown.string,
      };
    case "SET_VALIDITY":
      return { ...state, isValid: action.payload };
    case "UPDATE_HISTORY_AND_LONGEST":
      const newHistory = Array.from(
        new Set([...state.wordHistory, action.payload.word.toLowerCase()])
      );
      const newLongestWord =
        action.payload.word.length > state.longestWord.length
          ? action.payload.word
          : state.longestWord;
      const newHighestScore =
        state.score > state.highestScore ? state.score : state.highestScore;

      localStorage.setItem(WORD_HISTORY_LS_KEY, JSON.stringify(newHistory));
      localStorage.setItem(LONGEST_WORD_LS_KEY, newLongestWord);
      localStorage.setItem(HIGHEST_SCORE_LS_KEY, newHighestScore.toString());
      return {
        ...state,
        wordHistory: newHistory,
        longestWord: newLongestWord,
        highestScore: newHighestScore,
      };

    case "DELETE_HISTORY":
      localStorage.removeItem("wordHistory");
      return { ...state, wordHistory: [] };
    default:
      return state;
  }
};
