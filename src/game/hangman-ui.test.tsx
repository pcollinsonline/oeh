import React from 'react';
import { render, screen, userEvent } from 'test-utils';
import { GameState } from './hangman-types';
import { GameProvider } from './hangman-provider';
import { HangmanGallows, Keyboard, KeyStatus } from './hangman-ui';
import { newGameState } from './hangman-utils';

describe('<HangmanGallows />', () => {
  const renderGallows = (gameState: GameState) => {
    return render(
      <GameProvider gameState={gameState}>
        <HangmanGallows />
      </GameProvider>
    );
  };

  let gameState: GameState;

  beforeEach(() => {
    gameState = newGameState('hangman');
  });

  const getBodyParts = (node: ChildNode | null): NodeListOf<Element> => {
    // ts doesn't know about toBeDefined()
    // complains about possible null value
    if (!node) {
      fail('first child should be defined');
    }

    const { ownerDocument } = node;
    if (!ownerDocument) {
      fail('no ownerDocument');
    }

    return ownerDocument.querySelectorAll('.ui-body-part');
  };

  it('should render an empty gallows', () => {
    const {
      container: { firstChild },
    } = renderGallows(gameState);
    expect(getBodyParts(firstChild).length).toBe(0);
  });

  it('should render for 1 wrong guess', () => {
    gameState = {
      ...gameState,
      wrongGuesses: ['x'],
    };
    const {
      container: { firstChild },
    } = renderGallows(gameState);
    expect(screen.getByTestId('head')).toBeDefined();
    expect(getBodyParts(firstChild).length).toBe(1);
  });

  it('should render with 2 wrong guesses', () => {
    gameState = {
      ...gameState,
      wrongGuesses: ['x', 'z'],
    };
    const {
      container: { firstChild },
    } = renderGallows(gameState);
    expect(screen.getByTestId('head')).toBeDefined();
    expect(screen.getByTestId('body')).toBeDefined();
    expect(getBodyParts(firstChild).length).toBe(2);
  });

  it('should render with 3 wrong guesses', () => {
    gameState = {
      ...gameState,
      wrongGuesses: ['x', 'z', 'q'],
    };
    const {
      container: { firstChild },
    } = renderGallows(gameState);
    expect(screen.getByTestId('head')).toBeDefined();
    expect(screen.getByTestId('body')).toBeDefined();
    expect(screen.getByTestId('left-arm')).toBeDefined();
    expect(getBodyParts(firstChild).length).toBe(3);
  });

  it('should render with 4 wrong guesses', () => {
    gameState = {
      ...gameState,
      wrongGuesses: ['x', 'z', 'q', 'v'],
    };
    const {
      container: { firstChild },
    } = renderGallows(gameState);
    expect(screen.getByTestId('head')).toBeDefined();
    expect(screen.getByTestId('body')).toBeDefined();
    expect(screen.getByTestId('left-arm')).toBeDefined();
    expect(screen.getByTestId('right-arm')).toBeDefined();
    expect(getBodyParts(firstChild).length).toBe(4);
  });

  it('should render with 5 wrong guesses', () => {
    gameState = {
      ...gameState,
      wrongGuesses: ['x', 'z', 'q', 'v', 'l'],
    };
    const {
      container: { firstChild },
    } = renderGallows(gameState);
    expect(screen.getByTestId('head')).toBeDefined();
    expect(screen.getByTestId('body')).toBeDefined();
    expect(screen.getByTestId('left-arm')).toBeDefined();
    expect(screen.getByTestId('right-arm')).toBeDefined();
    expect(screen.getByTestId('left-leg')).toBeDefined();
    expect(getBodyParts(firstChild).length).toBe(5);
  });

  it('should render with 6 wrong guesses', () => {
    gameState = {
      ...gameState,
      wrongGuesses: ['x', 'z', 'q', 'v', 'l', 'p'],
    };
    const {
      container: { firstChild },
    } = renderGallows(gameState);
    expect(screen.getByTestId('head')).toBeDefined();
    expect(screen.getByTestId('body')).toBeDefined();
    expect(screen.getByTestId('left-arm')).toBeDefined();
    expect(screen.getByTestId('right-arm')).toBeDefined();
    expect(screen.getByTestId('left-leg')).toBeDefined();
    expect(screen.getByTestId('right-leg')).toBeDefined();
    expect(getBodyParts(firstChild).length).toBe(6);
  });
});

describe('<Keyboard />', () => {
  const renderKeyboard = (
    gameState: GameState,
    onPress: (letter: string) => void = jest.fn()
  ) => {
    return render(
      <GameProvider gameState={gameState}>
        <Keyboard onPress={onPress} />
      </GameProvider>
    );
  };

  let gameState: GameState;

  beforeEach(() => {
    gameState = newGameState('hangman');
  });

  it('should render with all letter keys enabled', () => {
    renderKeyboard(gameState);
    const allBtns = screen.getAllByRole('button');
    expect(allBtns.length).toBe(26);
    const letters = new Set('abcdefghijklmnopqrstuvwxyz'.split(''));
    allBtns.forEach(btn => {
      expect(btn).toBeEnabled();
      expect(btn.getAttribute('data-keystatus')).toBe(KeyStatus.NotPressed);
      letters.delete(btn.innerHTML.toLowerCase());
    });
    expect(letters.size).toBe(0);
  });

  it('should render with guessed keys disabled', () => {
    const newState = {
      ...gameState,
      userInput: ['h'],
      display: ['h', '_', '_', '_', '_', '_', '_'],
    };
    renderKeyboard(newState);
    const btn = screen.getByRole('button', {
      name: /h/i,
    });
    expect(btn.getAttribute('data-keystatus')).toBe(KeyStatus.Match);
    expect(btn).toBeDisabled();
  });

  it('should render with missed guess keys keys disabled', () => {
    const newState = {
      ...gameState,
      userInput: [],
      display: ['_', '_', '_', '_', '_', '_', '_'],
      wrongGuesses: ['x'],
    };
    renderKeyboard(newState);
    const btn = screen.getByRole('button', {
      name: /x/i,
    });
    expect(btn.getAttribute('data-keystatus')).toBe(KeyStatus.Wrong);
    expect(btn).toBeDisabled();
  });

  it('should fire the event when the letter button is pressed', () => {
    const listener = jest.fn();
    renderKeyboard(gameState, listener);
    const btn = screen.getByRole('button', {
      name: /x/i,
    });
    userEvent.click(btn);
    expect(listener).toHaveBeenCalledWith('x');
  });
});
