import Collapsible from "react-collapsible";
import { ScoringSystem } from "../ScoringSystem";
import { useScrabbleScore } from "../../context";

type ScoreHistoryProps = {
  longestWord: string;
  highestScore: number;
  wordHistory: string[];
};

const ScoreHistory: React.FC<ScoreHistoryProps> = ({
  longestWord,
  highestScore,
  wordHistory,
}) => (
  <div className="mt-4">
    <p>
      Longest Word: <span className="font-bold">{longestWord}</span>
    </p>
    <p>
      Highest Score: <span className="font-bold">{highestScore}</span>
    </p>
    <hr className="mt-4 mb-2 border-t-1 border-gray-600" />{" "}
    <div>
      Word History:{" "}
      {wordHistory.map(
        (word, i) => `${word}${i !== wordHistory.length - 1 ? ", " : ""}`
      )}
    </div>
  </div>
);

type ScoreDetailsProps = {
  isValid: boolean;
  word: string;
  score: number;
  scoreBreakdown: string;
};

const ScoreDetails: React.FC<ScoreDetailsProps> = ({
  isValid,
  word,
  score,
  scoreBreakdown,
}) => {
  if (!word) return null;

  return !isValid ? (
    <>
      <p className="text-red-600 text-lg font-semibold">Invalid word</p>
      <p>Try entering something else</p>
    </>
  ) : (
    <>
      <p className="text-lg font-semibold">
        Current Score: <span className="font-normal">{score}</span>
      </p>
      <p className="text-justify">Breakdown: {scoreBreakdown}</p>
    </>
  );
};

export const ScoreDisplay: React.FC = () => {
  const { state, dispatch } = useScrabbleScore();

  const { score, isValid, word, scoreBreakdown, longestWord, wordHistory } =
    state;

  const handleDeleteHistory = () => {
    dispatch({ type: "DELETE_HISTORY" });
  };

  return (
    <div className="mt-6 min-h-[10rem]">
      <Collapsible
        trigger="View Scoring System"
        triggerWhenOpen="Hide Scoring System"
        transitionTime={200}
        triggerClassName="mt-2 p-2 text-white rounded shadow cursor-pointer h-10 flex items-center justify-center bg-blue-500 hover:bg-blue-600"
        triggerOpenedClassName="mt-2 p-2 text-white rounded shadow cursor-pointer h-10 flex items-center justify-center bg-indigo-500 hover:bg-indigo-600"
      >
        <ScoringSystem />
      </Collapsible>
      <div className="mt-4">
        <button
          onClick={handleDeleteHistory}
          className="w-full mb-2 p-2 bg-red-500 text-white rounded shadow hover:bg-red-600 cursor-pointer h-10 flex items-center justify-center"
        >
          Delete History
        </button>
        <div className="mt-4">
          <ScoreDetails
            isValid={isValid}
            word={word}
            score={score}
            scoreBreakdown={scoreBreakdown}
          />
        </div>
        <hr className="my-2 border-t-1 border-gray-600" />{" "}
        <ScoreHistory
          longestWord={longestWord}
          highestScore={state.highestScore}
          wordHistory={wordHistory}
        />
      </div>
    </div>
  );
};
