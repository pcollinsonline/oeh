import React from 'react';
import { render, screen } from '../../../test-utils';
import { Gallows, MAX_GUESSES } from './gallows';

describe('<HangmanGallows />', () => {
  const renderGallows = (guessesRemaining: number) => {
    return render(<Gallows guessesRemaining={guessesRemaining} />);
  };

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
    } = renderGallows(MAX_GUESSES);
    expect(getBodyParts(firstChild).length).toBe(0);
  });

  it('should render for 1 wrong guess', () => {
    const {
      container: { firstChild },
    } = renderGallows(MAX_GUESSES - 1);
    expect(screen.getByTestId('head')).toBeDefined();
    expect(getBodyParts(firstChild).length).toBe(1);
  });

  it('should render with 2 wrong guesses', () => {
    const {
      container: { firstChild },
    } = renderGallows(MAX_GUESSES - 2);
    expect(screen.getByTestId('head')).toBeDefined();
    expect(screen.getByTestId('body')).toBeDefined();
    expect(getBodyParts(firstChild).length).toBe(2);
  });

  it('should render with 3 wrong guesses', () => {
    const {
      container: { firstChild },
    } = renderGallows(MAX_GUESSES - 3);
    expect(screen.getByTestId('head')).toBeDefined();
    expect(screen.getByTestId('body')).toBeDefined();
    expect(screen.getByTestId('left-arm')).toBeDefined();
    expect(getBodyParts(firstChild).length).toBe(3);
  });

  it('should render with 4 wrong guesses', () => {
    const {
      container: { firstChild },
    } = renderGallows(MAX_GUESSES - 4);
    expect(screen.getByTestId('head')).toBeDefined();
    expect(screen.getByTestId('body')).toBeDefined();
    expect(screen.getByTestId('left-arm')).toBeDefined();
    expect(screen.getByTestId('right-arm')).toBeDefined();
    expect(getBodyParts(firstChild).length).toBe(4);
  });

  it('should render with 5 wrong guesses', () => {
    const {
      container: { firstChild },
    } = renderGallows(MAX_GUESSES - 5);
    expect(screen.getByTestId('head')).toBeDefined();
    expect(screen.getByTestId('body')).toBeDefined();
    expect(screen.getByTestId('left-arm')).toBeDefined();
    expect(screen.getByTestId('right-arm')).toBeDefined();
    expect(screen.getByTestId('left-leg')).toBeDefined();
    expect(getBodyParts(firstChild).length).toBe(5);
  });

  it('should render with 6 wrong guesses', () => {
    const {
      container: { firstChild },
    } = renderGallows(MAX_GUESSES - 6);
    expect(screen.getByTestId('head')).toBeDefined();
    expect(screen.getByTestId('body')).toBeDefined();
    expect(screen.getByTestId('left-arm')).toBeDefined();
    expect(screen.getByTestId('right-arm')).toBeDefined();
    expect(screen.getByTestId('left-leg')).toBeDefined();
    expect(screen.getByTestId('right-leg')).toBeDefined();
    expect(getBodyParts(firstChild).length).toBe(6);
  });
});
