import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ScrabbleScoreCalculator from "./App";
import { ScrabbleScoreProvider } from "./context";

const renderComponentWithContext = () => (
  <ScrabbleScoreProvider>
    <ScrabbleScoreCalculator />
  </ScrabbleScoreProvider>
);

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
  localStorage.clear();
});

test("renders without crashing", () => {
  render(renderComponentWithContext());
  expect(screen.getByText(/Scrabble Score Calculator/i)).toBeInTheDocument();
});

test("inputting a valid word calculates the correct score", async () => {
  render(renderComponentWithContext());
  const input = screen.getByPlaceholderText("Enter a word...");
  fireEvent.change(input, { target: { value: "apple" } });

  await waitFor(() => {
    expect(screen.getByText(/Current Score:/i)).toHaveTextContent("Score: 9");
  });
});

test("inputting an invalid word gives an error", async () => {
  render(renderComponentWithContext());
  const input = screen.getByPlaceholderText("Enter a word...");
  fireEvent.change(input, { target: { value: "applee" } });

  await waitFor(() => {
    expect(screen.getByText(/Invalid word/i)).toBeInTheDocument();
  });
});

test("longest word and highest score updates correctly", async () => {
  render(renderComponentWithContext());
  const input = screen.getByPlaceholderText("Enter a word...");

  fireEvent.change(input, { target: { value: "apple" } });
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

  fireEvent.change(input, { target: { value: "orange" } });
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

  await waitFor(() => {
    expect(screen.getByText(/Longest Word:/i)).toHaveTextContent(
      "Longest Word: orange"
    );
  });

  await waitFor(() => {
    expect(screen.getByText(/Highest Score:/i)).toHaveTextContent(
      "Highest Score: 9"
    );
  });
});

test("word history updates correctly and does not include duplicates", async () => {
  render(renderComponentWithContext());
  const input = screen.getByPlaceholderText("Enter a word...");

  fireEvent.change(input, { target: { value: "apple" } });
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

  fireEvent.change(input, { target: { value: "orange" } });
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

  fireEvent.change(input, { target: { value: "apple" } });
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

  await waitFor(() => {
    expect(screen.getByText(/Word History:/i)).toHaveTextContent(
      "Word History: apple, orange"
    );
  });
});

test("deletes history correctly", async () => {
  render(renderComponentWithContext());
  const input = screen.getByPlaceholderText("Enter a word...");

  fireEvent.change(input, { target: { value: "apple" } });
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

  fireEvent.change(input, { target: { value: "orange" } });
  fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

  const deleteButton = screen.getByText("Delete History");
  fireEvent.click(deleteButton);

  await waitFor(() => {
    expect(screen.getByText(/Word History:/i)).toHaveTextContent(
      "Word History:"
    );
  });
});

test("scoring system shows and hides correctly", async () => {
  render(renderComponentWithContext());
  const scoringSystemOpenButton = screen.getByText("View Scoring System");
  fireEvent.click(scoringSystemOpenButton);

  await waitFor(() => {
    expect(screen.queryByText("View Scoring System")).not.toBeInTheDocument();
  });

  const scoringSystemCloseButton = screen.getByText("Hide Scoring System");
  fireEvent.click(scoringSystemCloseButton);

  await waitFor(() => {
    expect(screen.queryByText("Hide Scoring System")).not.toBeInTheDocument();
  });
});
