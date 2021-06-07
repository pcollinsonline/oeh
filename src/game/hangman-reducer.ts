import {
  GameAction,
  GameState,
  GameStatus,
  GuessAction,
  ResetAction,
} from './hangman-types';
import { formatDisplay, getStatus, newGameState } from './hangman-utils';

const LETTERS = /^[A-Za-z]+$/;

const reduceReset = (state: GameState, action: ResetAction): GameState => {
  const { newWord: currentWord } = action;
  return newGameState(currentWord);
};

const reduceGuess = (state: GameState, action: GuessAction) => {
  const { guess } = action;
  const { currentWord, userInput, wrongGuesses } = state;

  if (state.status !== GameStatus.InProgress) {
    return state;
  }

  if (!guess.match(LETTERS)) {
    return {
      ...state,
      message: 'guess.invalid-character',
    };
  }

  const letterToProcess = guess.toLowerCase();
  if (userInput.includes(letterToProcess)) {
    return {
      ...state,
      message: `You already guessed ${guess}`,
    };
  }

  const updatedInput = [...userInput, guess];
  const lettersInWord = currentWord.split('');

  let message;
  let currentDisplay = state.display;
  const updatedWrongGuesses = [...wrongGuesses];

  if (!lettersInWord.includes(guess)) {
    updatedWrongGuesses.push(guess);
    message = 'guess.incorrect';
  } else {
    currentDisplay = formatDisplay(currentWord, updatedInput);
    message = 'guess.correct';
  }

  const newState = {
    ...state,
    userInput: updatedInput,
    display: currentDisplay,
    wrongGuesses: updatedWrongGuesses,
    message,
  };

  newState.status = getStatus(newState);
  return newState;
};

const reducer = (state: GameState, action: GameAction): GameState => {
  if (action.type === 'guess') {
    return reduceGuess(state, action);
  }

  if (action.type === 'reset') {
    return reduceReset(state, action);
  }

  return state;
};

export { reducer };
export type { GameState };
