import { initialGameState } from '../utils/game-utils';
import { GameState, GameStatus } from '../game-types';
import { gameReducer, guessReducer, resetReducer } from './game-reducers';
import {
  WinningGameSpec,
  PerfectLossSpec,
  PerfectWinSpec,
  GameSpec,
  LosingGameSpec,
} from './game-test-states';

describe('game-reducer unit tests', () => {
  describe('guessReducer unit tests', () => {
    const playGame = (gameSpec: GameSpec) => {
      const { word, guesses, maxWrongGuesses, gameStates } = gameSpec;
      let currentState = initialGameState(word, maxWrongGuesses);

      const validated: GameState[] = [];

      guesses.split('').forEach((letter, currentFrame) => {
        const nextState = guessReducer(currentState, letter);
        expect(nextState).toEqual(gameStates[currentFrame]);
        validated.push(nextState);
        currentState = nextState;
      });

      expect(validated.length).toEqual(gameStates.length);
    };

    it('should return an in-progress game', () => {
      expect(guessReducer(initialGameState('hangman', 6), 'a')).toEqual({
        word: 'hangman',
        maxGuesses: 6,
        guesses: ['a'],
        status: GameStatus.InProgress,
        display: '_a___a_'.split(''),
        numberOfGuessesRemaining: 6,
      });
    });

    it('should return a lost game', () => {
      const gameInProgress: GameState = {
        word: 'hangman',
        maxGuesses: 6,
        guesses: ['a', 'l', 'z', 'q', 'f', 't', 'n'],
        status: GameStatus.InProgress,
        display: '_an__an'.split(''),
        numberOfGuessesRemaining: 1,
      };

      const nextState = guessReducer(gameInProgress, 'x');
      expect(nextState).toEqual({
        word: 'hangman',
        maxGuesses: 6,
        guesses: ['a', 'l', 'z', 'q', 'f', 't', 'n', 'x'],
        status: GameStatus.Lost,
        display: ['_', 'a', 'n', '_', '_', 'a', 'n'],
        numberOfGuessesRemaining: 0,
      });
    });

    it('should execute the game specs', () => {
      playGame(PerfectWinSpec);
      playGame(PerfectLossSpec);
      playGame(WinningGameSpec);
      playGame(LosingGameSpec);
    });
  });

  describe('resetReducer unit tests', () => {
    it('should reset the game state', () => {
      const gameInProgress: GameState = {
        word: 'hangman',
        maxGuesses: 6,
        guesses: ['a', 'l', 'z', 'q', 'f', 't', 'n'],
        status: GameStatus.InProgress,
        display: '_an___n'.split(''),
        numberOfGuessesRemaining: 1,
      };
      expect(resetReducer(gameInProgress, 'foo', 6)).toEqual({
        word: 'foo',
        maxGuesses: 6,
        guesses: [],
        status: GameStatus.InProgress,
        display: ['_', '_', '_'],
        numberOfGuessesRemaining: 6,
      });
    });
  });

  describe('gameReducer unit tests', () => {
    let nextState = gameReducer(initialGameState('hangman', 6), {
      type: 'guess',
      guess: 'h',
    });

    expect(nextState).toEqual({
      word: 'hangman',
      maxGuesses: 6,
      guesses: ['h'],
      status: GameStatus.InProgress,
      display: ['h', '_', '_', '_', '_', '_', '_'],
      numberOfGuessesRemaining: 6,
    });

    nextState = gameReducer(nextState, { type: 'reset', newWord: 'bar' });
    expect(nextState).toEqual({
      word: 'bar',
      maxGuesses: 6,
      guesses: [],
      status: GameStatus.InProgress,
      display: ['_', '_', '_'],
      numberOfGuessesRemaining: 6,
    });
  });
});
