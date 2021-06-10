import {
  getDisplay,
  getGameStatus,
  getNumberOfWrongGuesses,
  initialGameState,
} from './game-utils';
import { GameStatus } from '../game-types';

describe('game state unit tests', () => {
  it('should return the expected initial state', () => {
    expect(initialGameState('hangman', 6)).toEqual({
      word: 'hangman',
      maxGuesses: 6,
      guesses: [],
      status: GameStatus.InProgress,
      display: ['_', '_', '_', '_', '_', '_', '_'],
      numberOfGuessesRemaining: 6,
    });
  });

  it('should return the expected word display', () => {
    expect(
      getDisplay({
        word: 'hangman',
        maxGuesses: 6,
        guesses: [],
      })
    ).toEqual('_______'.split(''));

    expect(
      getDisplay({
        word: 'hangman',
        maxGuesses: 6,
        guesses: ['x', 'z'],
      })
    ).toEqual('_______'.split(''));

    expect(
      getDisplay({
        word: 'hangman',
        maxGuesses: 6,
        guesses: ['x', 'a', 'z', 'g'],
      })
    ).toEqual('_a_g_a_'.split(''));

    expect(
      getDisplay({
        word: 'hangman',
        maxGuesses: 6,
        guesses: ['n', 'a', 'm', 'g', 'h'],
      })
    ).toEqual('hangman'.split(''));

    expect(
      getDisplay({
        word: 'hangman',
        maxGuesses: 6,
        guesses: ['n', 'q', 'a', 'z', 'm', 'b', 'w', 'g', 'h'],
      })
    ).toEqual('hangman'.split(''));
  });

  it('should return the number of wrong guesses', () => {
    expect(
      getNumberOfWrongGuesses({
        word: 'hangman',
        maxGuesses: 6,
        guesses: [],
      })
    ).toBe(0);

    expect(
      getNumberOfWrongGuesses({
        word: 'hangman',
        maxGuesses: 6,
        guesses: ['a', 'g'],
      })
    ).toBe(0);

    expect(
      getNumberOfWrongGuesses({
        word: 'hangman',
        maxGuesses: 6,
        guesses: ['a', 'q', 'g'],
      })
    ).toBe(1);

    expect(
      getNumberOfWrongGuesses({
        word: 'hangman',
        maxGuesses: 6,
        guesses: ['n', 'q', 'a', 'z', 'm', 'b', 'w', 'g', 'h'],
      })
    ).toBe(4);
  });

  it('should return the game status', () => {
    expect(
      getGameStatus('_______'.split(''), 0, {
        word: 'hangman',
        maxGuesses: 6,
        guesses: [],
      })
    ).toBe(GameStatus.InProgress);

    expect(
      getGameStatus('ha__ma_'.split(''), 1, {
        word: 'hangman',
        maxGuesses: 6,
        guesses: ['a', 'h', 'x', 'm'],
      })
    ).toBe(GameStatus.InProgress);

    expect(
      getGameStatus('hangman'.split(''), 2, {
        word: 'hangman',
        maxGuesses: 6,
        guesses: ['a', 'h', 'x', 'm', 'n', 'b', 'g'],
      })
    ).toBe(GameStatus.Won);

    expect(
      getGameStatus('hangman'.split(''), 6, {
        word: 'hangman',
        maxGuesses: 6,
        guesses: ['a', 'z', 'x', 'm', 'v', 'n', 'b', 'g', 'j', 'l'],
      })
    ).toBe(GameStatus.Lost);
  });
});
