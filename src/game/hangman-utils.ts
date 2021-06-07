import { GameState, GameStatus } from './hangman-types';
import { MAX_GUESSES } from './hangman-bodyparts';

const getRandomItemFrom = (arr: string[]): string =>
  arr[Math.floor(Math.random() * arr.length)];

const randomWord = (wordPool: string[]): string => getRandomItemFrom(wordPool);

const LETTERS = /^[A-Za-z]+$/;

const isLetter = (letter: string) =>
  letter.length === 1 && !!letter.match(LETTERS);

const getStatus = (gameState: GameState): GameStatus => {
  const { wrongGuesses, maxGuesses, display, currentWord } = gameState;
  if (wrongGuesses.length >= maxGuesses) {
    return GameStatus.Lost;
  }
  if (display.join('') === currentWord) {
    return GameStatus.Won;
  }
  return GameStatus.InProgress;
};

const initialState = {
  wrongGuesses: [],
  userInput: [],
  maxGuesses: MAX_GUESSES,
  message: 'Lets play!',
  status: GameStatus.InProgress,
  hints: [],
};

const formatDisplay = (currentWord: string, userInput?: string[]) => {
  const input = userInput || [];
  return currentWord
    .split('')
    .map(letter =>
      input.includes(letter) || !isLetter(letter) ? letter : '_'
    );
};

const newGameState = (currentWord: string): GameState => ({
  ...initialState,
  display: formatDisplay(currentWord),
  currentWord: currentWord.toLowerCase(),
});

export {
  GameStatus,
  randomWord,
  getStatus,
  newGameState,
  formatDisplay,
  isLetter,
};
