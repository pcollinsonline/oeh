import { GameAction, GameState, GameStatus } from '../game-types';
import {
  getDisplay,
  getGameStatus,
  getNumberOfWrongGuesses,
  initialGameState,
} from '../utils/game-utils';
import { MAX_GUESSES } from '../ui/gallows';

const guessReducer = (state: GameState, guess: string): GameState => {
  const { status, guesses, word, maxGuesses, numberOfGuessesRemaining } = state;

  if (status !== GameStatus.InProgress) {
    return state;
  }

  const lcGuess = guess.toLowerCase();
  if (guesses.includes(lcGuess)) {
    return state;
  }

  const gameStateBase = { word, maxGuesses, guesses: [...guesses, guess] };
  const wrongGuesses = getNumberOfWrongGuesses(gameStateBase);

  // if the player guessed wrong
  // no need to update the display
  const display =
    wrongGuesses === maxGuesses - numberOfGuessesRemaining
      ? getDisplay(gameStateBase)
      : state.display;

  const currentStatus = getGameStatus(display, wrongGuesses, gameStateBase);

  return {
    ...gameStateBase,
    display,
    numberOfGuessesRemaining: maxGuesses - wrongGuesses,
    status: currentStatus,
  };
};

const resetReducer = (
  state: GameState,
  newWord: string,
  maxGuesses: number
): GameState => initialGameState(newWord, maxGuesses);

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'guess':
      return guessReducer(state, action.guess);
    case 'reset':
      return resetReducer(state, action.newWord, MAX_GUESSES);
    // keeping the linter happy
    default:
      throw new Error(`unsupported action type`);
  }
};

export { guessReducer, resetReducer, gameReducer };
