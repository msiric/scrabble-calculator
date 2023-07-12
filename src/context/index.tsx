import {
  createContext,
  useReducer,
  useEffect,
  Dispatch,
  useContext,
} from "react";
import { Action, State } from "../App";
import { initialState, reducer } from "../state";
import { LONGEST_WORD_LS_KEY, WORD_HISTORY_LS_KEY } from "../utils/constants";

const ScrabbleScoreContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});

type ScrablleScoreProviderProps = {
  children: React.ReactNode;
};

const ScrabbleScoreProvider: React.FC<ScrablleScoreProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(LONGEST_WORD_LS_KEY, state.longestWord);
    localStorage.setItem(
      WORD_HISTORY_LS_KEY,
      JSON.stringify(state.wordHistory)
    );
  }, [state.longestWord, state.wordHistory]);

  return (
    <ScrabbleScoreContext.Provider value={{ state, dispatch }}>
      {children}
    </ScrabbleScoreContext.Provider>
  );
};

const useScrabbleScore = () => useContext(ScrabbleScoreContext);

export { ScrabbleScoreProvider, useScrabbleScore };
