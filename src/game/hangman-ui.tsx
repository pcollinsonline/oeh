/* eslint-disable react/jsx-props-no-spreading,react/no-array-index-key */
import React from 'react';
import classNames from 'classnames';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { useGame } from './hangman-provider';
import { GameStatus } from './hangman-types';
import { HangManParts } from './hangman-bodyparts';

const messages = defineMessages({
  resetBtnLabel: {
    id: 'ResetButton.btnLabel',
    defaultMessage: 'reset',
    description: 'reset button text',
  },
  guessesLeftMsg: {
    id: 'GameText.guessesLeft',
    defaultMessage:
      'You have {count, number} {count, plural, one {guess} other {guesses}} remaining.',
    description: 'message indicating number of guesses player has left',
  },
  gameWon: {
    id: 'GameText.won',
    defaultMessage: 'Winner!!',
    description: 'message indicating player won the game',
  },
  gameLost: {
    id: 'GameText.won',
    defaultMessage: 'Oh no!  Try again...',
    description: 'message indicating player lost the game',
  },
  guessALetter: {
    id: 'GameText.guess',
    defaultMessage: 'Guess a letter to start the game.',
    description: 'message displayed for a new game',
  },
});

const FONT = 'f5 f3-ns helvetica';
const FLEX_CENTER = 'flex items-center justify-center';

const GameContainer: React.FC = ({ children }) => {
  return (
    <div className="ui-game-container h-100 w-100 flex items-center flex-column pv3">
      {children}
    </div>
  );
};

const KEYBOARD_LAYOUT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
];

enum KeyStatus {
  NotPressed = 'not-pressed',
  Wrong = 'incorrect-key',
  Match = 'letter-match',
  Hint = 'hint',
}

interface ILetterKey {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  status: KeyStatus;
}

interface IResetButton {
  onReset: () => void;
}

const ResetButton = React.memo(({ onReset }: IResetButton) => {
  return (
    <button
      type="button"
      className={`ui-reset-btn ph4 tracked flex br3 ${FONT} ${FLEX_CENTER}`}
      onClick={onReset}
    >
      <FormattedMessage {...messages.resetBtnLabel} />
    </button>
  );
});
ResetButton.displayName = 'ResetButton';

const LetterKey: React.FC<ILetterKey> = React.memo(
  ({ onClick, status, children }) => {
    return (
      <button
        type="button"
        data-keystatus={status}
        className={`ui-letter-btn br3 ui-${status} ${FLEX_CENTER} ${FONT}`}
        onClick={onClick}
        disabled={status !== KeyStatus.NotPressed}
      >
        {children}
      </button>
    );
  }
);
LetterKey.displayName = 'LetterKey;';

interface IKeyboard {
  onPress: (letter: string) => void;
}

const Keyboard = ({ onPress }: IKeyboard): JSX.Element => {
  const { wrongGuesses, display, hints } = useGame();
  return (
    <div className={`${FLEX_CENTER} flex-column`}>
      {KEYBOARD_LAYOUT.map((row, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`row-${index}`} className="mv2 flex">
            {row.map(letter => {
              let status;
              if (wrongGuesses.includes(letter)) {
                status = KeyStatus.Wrong;
              } else if (display.includes(letter)) {
                status = KeyStatus.Match;
              } else if (hints.includes(letter)) {
                status = KeyStatus.Hint;
              } else {
                status = KeyStatus.NotPressed;
              }
              return (
                <LetterKey
                  onClick={() => onPress(letter)}
                  key={letter}
                  status={status}
                >
                  {letter.toUpperCase()}
                </LetterKey>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

const WORD_LETTER_CLASSES =
  'ui-word-display__letter ttu flex pb1 items-end justify-center';

const WordDisplay = (): JSX.Element => {
  const { display, status, currentWord, userInput } = useGame();

  return (
    <ul
      className="ui-word-display list ma0 br3 w-100 mw7-l"
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${display.length}, 1fr)`,
        columnGap: '.25rem',
      }}
    >
      {status === GameStatus.Lost &&
        currentWord.split('').map((letter, index) => {
          const classes = classNames(WORD_LETTER_CLASSES, FLEX_CENTER, FONT, {
            'ui-unguessed': !userInput.includes(letter) && letter !== '-',
          });
          return (
            <li key={`${letter}-${index}`} className={classes}>
              {letter}
            </li>
          );
        })}

      {status !== GameStatus.Lost &&
        display.map((bucket, index) => {
          const isBlank = bucket === '_';
          const classes = classNames(WORD_LETTER_CLASSES, FLEX_CENTER, FONT, {
            'ui-blank': isBlank,
          });
          return (
            <li
              className={classes}
              // eslint-disable-next-line react/no-array-index-key
              key={`${bucket}-${index}`}
            >
              {isBlank ? ' ' : bucket}{' '}
            </li>
          );
        })}
    </ul>
  );
};

const GameText = () => {
  const { wrongGuesses, maxGuesses, status, userInput } = useGame();
  const intl = useIntl();

  const renderMessage = () => {
    if (status === GameStatus.Lost) {
      return intl.formatMessage(messages.gameLost);
    }
    if (status === GameStatus.Won) {
      return intl.formatMessage(messages.gameWon);
    }
    if (!userInput.length) {
      return intl.formatMessage(messages.guessALetter);
    }
    return intl.formatMessage(messages.guessesLeftMsg, {
      count: maxGuesses - wrongGuesses.length,
    });
  };

  return (
    <span role="alert" className="ui-game-text f5 f3-ns helvetica tracked">
      {renderMessage()}
    </span>
  );
};

const HangmanGallows = () => {
  const { wrongGuesses } = useGame();
  const partsToRender = HangManParts.slice(0, wrongGuesses.length);
  return (
    <div
      className="ui-gallows"
      style={{
        height: '16rem',
        width: '8rem',
        borderLeft: '4px solid',
        borderBottom: '6px solid',
        position: 'relative',
      }}
    >
      <div
        className="ui-gallows absolute left-0 top-0"
        style={{
          width: '4rem',
          height: '1.5rem',
          borderTop: '4px solid',
          borderRight: 'thin solid',
        }}
      />
      {partsToRender}
    </div>
  );
};

const Banner = () => {
  return (
    <div className="ui-banner helvetica f3 ttu pa3 bb tracked lh-title">
      <span className="ui-banner__text-primary">Hang</span>
      <span className="ui-banner__text-secondary">Man</span>
    </div>
  );
};

export {
  GameContainer,
  Keyboard,
  ResetButton,
  WordDisplay,
  GameText,
  HangmanGallows,
  Banner,
  KeyStatus,
};
