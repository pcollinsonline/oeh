import React from 'react';
import { VisuallyHidden } from '@reach/visually-hidden';
import { useIntl } from 'react-intl';
import { shuffle } from '../game/utils/game-utils';
import { messages } from '../../i18n/messages-default';
import { useColorMode } from '../../hooks/use-color-mode';

const SPLASH = 'HANGMAN'.split('');

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen = ({ onFinished }: SplashScreenProps): JSX.Element => {
  // use this hook to set
  // the color mode for the
  // splash screen
  useColorMode();
  const [guesses, setGuesses] = React.useState<string[]>([]);
  const { formatMessage } = useIntl();
  const splashScreenText = formatMessage(messages.splashScreenText);

  React.useEffect(() => {
    let mounted = true;
    const shuffledGuesses = shuffle('HANGM'.split(''));
    const timer = setInterval(() => {
      if (mounted) {
        const nextGuess = shuffledGuesses.pop();
        if (!nextGuess) {
          clearInterval(timer);
          onFinished();
        } else {
          setGuesses(prevGuesses => [...prevGuesses, nextGuess]);
        }
      }
    }, 500);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [setGuesses, onFinished]);

  return (
    <div
      data-testid="splash-screen"
      className="ui-splash-display flex justify-center items-center ml-auto mr-auto"
    >
      <VisuallyHidden>{splashScreenText}</VisuallyHidden>
      <ul
        aria-hidden
        className="ui-word-display list helvetica f3 f2-ns w-100"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${SPLASH.length}, 1fr)`,
          columnGap: '.5rem',
        }}
      >
        {SPLASH.map((letter, idx) => {
          const key = `${letter}-${idx}`;
          const value = guesses.includes(letter) ? letter : null;
          return (
            <li
              className="ui-splash-display__letter ttu flex pb1 items-center justify-center"
              key={key}
            >
              {value ? <span>{value}</span> : ' '}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { SplashScreen };
