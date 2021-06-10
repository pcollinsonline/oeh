import { GameState, GameStatus, GameStateBase } from '../game-types';

const BLANK = '_';
const HYPHEN = '-';

const LETTERS = /^[A-Za-z]+$/;

const isLetter = (letter: string): boolean =>
  letter.length === 1 && !!letter.match(LETTERS);

const initialGameState = (word: string, maxGuesses: number): GameState => {
  return {
    word: word.toLowerCase(),
    maxGuesses,
    guesses: [],
    status: GameStatus.InProgress,
    display: new Array(word.length).fill(BLANK),
    numberOfGuessesRemaining: maxGuesses,
  };
};

const getDisplay = ({ word, guesses }: GameStateBase): string[] => {
  return word
    .split('')
    .map(letter =>
      guesses.includes(letter) || !isLetter(letter) ? letter : BLANK
    );
};

const getNumberOfWrongGuesses = ({ word, guesses }: GameStateBase): number => {
  return guesses.filter(letter => !word.includes(letter)).length;
};

const getGameStatus = (
  display: string[],
  wrongGuesses: number,
  gameState: GameStateBase
): GameStatus => {
  const { maxGuesses, word } = gameState;
  if (wrongGuesses >= maxGuesses) {
    return GameStatus.Lost;
  }
  if (display.join('') === word) {
    return GameStatus.Won;
  }
  return GameStatus.InProgress;
};

// https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
const shuffle = (arr: string[]): string[] => {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * i);
    const temp = arr[i];
    // eslint-disable-next-line no-param-reassign
    arr[i] = arr[j];
    // eslint-disable-next-line no-param-reassign
    arr[j] = temp;
  }
  return arr;
};

export {
  initialGameState,
  getDisplay,
  getNumberOfWrongGuesses,
  getGameStatus,
  isLetter,
  shuffle,
  BLANK,
  HYPHEN,
  LETTERS,
};
