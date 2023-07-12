import scoring from "../../data/scoring.json";

export const ScoringSystem: React.FC = () => {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-4 gap-2">
        {Object.entries(scoring).map(([letter, score], index) => (
          <div
            key={letter}
            className="flex items-center justify-between border p-2 rounded"
          >
            <span>{letter.toUpperCase()}</span>
            <span className="font-bold">{score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
