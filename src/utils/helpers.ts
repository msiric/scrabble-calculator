import { Scoring } from "../App";

export const calculateScoreBreakdown = (word: string, scoring: Scoring) => {
  const totalScore = word
    .toLowerCase()
    .split("")
    .reduce(
      (score, letter) => {
        const letterScore = scoring[letter] || 0;
        return {
          total: score.total + letterScore,
          string: `${score.string}${letterScore} (${letter}) + `,
        };
      },
      { total: 0, string: "" }
    );

  totalScore.string = totalScore.string.slice(0, -3);
  return totalScore;
};

export const isValidWord = (word: string, dictionary: string[]) => {
  return dictionary.includes(word.toLowerCase());
};
