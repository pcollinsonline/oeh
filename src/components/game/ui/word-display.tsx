import React from 'react';
import classNames from 'classnames';
import { FLEX_CENTER, FONT } from './tachyons-styles';
import { BLANK, HYPHEN } from '../utils/game-utils';

const WORD_LETTER_CLASSES =
  'ui-word-display__letter ttu flex pb1 items-end justify-center';

interface ActiveGameWordDisplayProps {
  display: string[];
}

interface LostGameWordDisplayProps extends ActiveGameWordDisplayProps {
  word: string;
  guesses: string[];
}

const GameWordDisplay = React.memo(
  ({ display }: ActiveGameWordDisplayProps) => {
    return (
      <ul
        className="ui-word-display list ma0 br3 w-100 mw7-l"
        style={{
          gridTemplateColumns: `repeat(${display.length}, 1fr)`,
        }}
      >
        {display.map((bucket, index) => {
          const key = `${bucket}-${index}`;
          const isBlank = bucket === BLANK;
          const classes = classNames(WORD_LETTER_CLASSES, FLEX_CENTER, FONT, {
            'ui-blank': isBlank,
          });
          return (
            <li key={key} className={classes}>
              {isBlank ? ' ' : bucket}
            </li>
          );
        })}
      </ul>
    );
  }
);

GameWordDisplay.displayName = 'GameWordDisplay';

// this is a special case display
// because we want to show the whole word
// after the player has lost the game
// (with the letters they didn't guess
// called out in a different color)
const LostGameWordDisplay = React.memo(
  ({ display, word, guesses }: LostGameWordDisplayProps): JSX.Element => {
    return (
      <ul
        className="ui-word-display list ma0 br3 w-100 mw7-l"
        style={{
          gridTemplateColumns: `repeat(${display.length}, 1fr)`,
        }}
      >
        {word.split('').map((letter, index) => {
          const key = `${letter}-${index}`;
          const missedLetter = !guesses.includes(letter) && letter !== HYPHEN;
          return (
            <li
              key={key}
              className={`${WORD_LETTER_CLASSES} ${FLEX_CENTER} ${FONT}`}
              data-missedletter={missedLetter}
            >
              {letter}
            </li>
          );
        })}
      </ul>
    );
  }
);

LostGameWordDisplay.displayName = 'LostGameWordDisplay';

export { GameWordDisplay, LostGameWordDisplay };
