import React from 'react';
import { FLEX_CENTER, FONT } from './tachyons-styles';

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

interface LetterKeyProps {
  onClick: (letter: string) => void;
  status: KeyStatus;
  letter: string;
}

interface KeyboardProps {
  onPress: (letter: string) => void;
  display: string[];
  // eslint-disable-next-line react/require-default-props
  hints?: string[];
  wrongGuesses: string[];
}

const LetterKey = React.memo(({ onClick, status, letter }: LetterKeyProps) => {
  return (
    <button
      type="button"
      data-keystatus={status}
      className={`ui-letter-btn br-100 ttu ui-${status} ${FLEX_CENTER} ${FONT}`}
      onClick={() => onClick(letter)}
      disabled={status !== KeyStatus.NotPressed}
    >
      {letter}
    </button>
  );
});
LetterKey.displayName = 'LetterKey;';

const Keyboard = ({
  onPress,
  display,
  hints = [],
  wrongGuesses,
}: KeyboardProps): JSX.Element => {
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
                  onClick={onPress}
                  key={letter}
                  status={status}
                  letter={letter}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export type { KeyboardProps };
export { Keyboard, KeyStatus };
