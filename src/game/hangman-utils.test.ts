import {
  formatDisplay,
  GameStatus,
  getStatus,
  isLetter,
  newGameState,
} from './hangman-utils';
import { GameState } from './hangman-types';
import { MAX_GUESSES } from './hangman-bodyparts';

describe('hangman-utils unit tests', () => {
  describe('isLetter unit tests', () => {
    it('should return true for letters', () => {
      const letters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVYXYZ'.split('');
      letters.forEach(letter => {
        expect(isLetter(letter)).toBe(true);
        expect(isLetter(letter.toLowerCase())).toBe(true);
      });
    });

    it('should return false (not single char)', () => {
      expect(isLetter('fo')).toBe(false);
    });

    it('should return false (not letter chars)', () => {
      const badChars = '1234567890!@#$%^&*()-_+=,[{}]";:,<.>/?\\\''.split('');
      badChars.forEach(badChar => {
        expect(isLetter(badChar)).toBe(false);
      });
    });
  });

  describe('getStatus unit tests', () => {
    let gameState: GameState;

    beforeEach(() => {
      gameState = newGameState('foo');
    });

    it('should return in progress', () => {
      expect(getStatus(gameState)).toBe(GameStatus.InProgress);
    });

    it('should should return in progress (playing)', () => {
      gameState = {
        ...gameState,
        display: ['f', '_', '_'],
      };
      expect(getStatus(gameState)).toBe(GameStatus.InProgress);
    });

    it('should return won', () => {
      gameState = {
        ...gameState,
        display: ['f', 'o', 'o'],
      };
      expect(getStatus(gameState)).toBe(GameStatus.Won);
    });

    it('should return lost', () => {
      gameState = {
        ...gameState,
        display: ['_', 'o', 'o'],
        wrongGuesses: ['z', 'x', 'c', 'v', 'b', 'n'],
      };
      expect(getStatus(gameState)).toBe(GameStatus.Lost);
    });
  });

  describe('formatDisplay unit tests', () => {
    it('should return the expected display (w/out user input)', () => {
      expect(formatDisplay('foo')).toEqual(['_', '_', '_']);

      // hyphenated word is formatted such that foo-bar return ___-___
      expect(formatDisplay('foo-bar')).toEqual([
        '_',
        '_',
        '_',
        '-',
        '_',
        '_',
        '_',
      ]);
    });

    it('should return the expected display (with user input)', () => {
      // foo with guessed letter o return _oo
      expect(formatDisplay('foo', ['o'])).toEqual(['_', 'o', 'o']);

      // foo-bar with guessed letters o and r return _oo-__r
      expect(formatDisplay('foo-bar', ['o', 'r'])).toEqual([
        '_',
        'o',
        'o',
        '-',
        '_',
        '_',
        'r',
      ]);
    });
  });

  describe('newGameState unit tests', () => {
    it('should return the expected state', () => {
      expect(newGameState('chicken-foot')).toEqual({
        wrongGuesses: [],
        userInput: [],
        maxGuesses: MAX_GUESSES,
        message: 'Lets play!',
        status: GameStatus.InProgress,
        display: ['_', '_', '_', '_', '_', '_', '_', '-', '_', '_', '_', '_'],
        currentWord: 'chicken-foot',
      });
    });
  });
});
