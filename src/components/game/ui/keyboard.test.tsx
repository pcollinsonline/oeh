import React from 'react';
import { render, screen, userEvent } from '../../../test-utils';
import { KeyboardProps, Keyboard, KeyStatus } from './keyboard';

describe('<Keyboard />', () => {
  const renderKeyboard = (props: KeyboardProps) => {
    return render(<Keyboard {...props} />);
  };

  it('should render with all letter keys enabled', () => {
    renderKeyboard({
      display: ['_', '_', '_'],
      wrongGuesses: [],
      onPress: jest.fn(),
    });
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
    renderKeyboard({
      display: ['h', '_', '_', '_', '_', '_', '_'],
      wrongGuesses: [],
      onPress: jest.fn(),
    });
    const btn = screen.getByRole('button', {
      name: /h/i,
    });
    expect(btn.getAttribute('data-keystatus')).toBe(KeyStatus.Match);
    expect(btn).toBeDisabled();
  });

  it('should render with missed guess keys keys disabled', () => {
    renderKeyboard({
      display: ['_', '_', '_', '_', '_', '_', '_'],
      wrongGuesses: ['x'],
      onPress: jest.fn(),
    });
    const btn = screen.getByRole('button', {
      name: /x/i,
    });
    expect(btn.getAttribute('data-keystatus')).toBe(KeyStatus.Wrong);
    expect(btn).toBeDisabled();
  });

  it('should fire the event when the letter button is pressed', () => {
    const listener = jest.fn();
    renderKeyboard({
      display: ['h', '_', '_', '_', '_', '_', '_'],
      wrongGuesses: [],
      onPress: listener,
    });
    const btn = screen.getByRole('button', {
      name: /x/i,
    });
    userEvent.click(btn);
    expect(listener).toHaveBeenCalledWith('x');
  });
});
