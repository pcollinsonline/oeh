import { defineMessages } from 'react-intl';

const messages = defineMessages({
  gameBannerText: {
    id: 'Banner.btnLabel',
    defaultMessage: 'Hangman',
    description: 'name of the game',
  },
  resetBtnLabel: {
    id: 'ResetButton.btnLabel',
    defaultMessage: 'reset',
    description: 'reset button text',
  },
  guessesLeftMsg: {
    id: 'GameText.guessesLeft',
    defaultMessage: 'Guesses remaining: <container>{count}</container>',
    description: 'message indicating number of guesses player has left',
  },
  gameWon: {
    id: 'GameText.won',
    defaultMessage: 'Winner',
    description: 'message indicating player won the game',
  },
  gameLost: {
    id: 'GameText.lost',
    defaultMessage: 'Loser',
    description: 'message indicating player lost the game',
  },
  guessALetter: {
    id: 'GameText.guess',
    defaultMessage: 'Guess <container>a</container> letter to start the game.',
    description: 'message displayed for a new game',
  },
  colorModeToggleBtnLabel: {
    id: 'ColorModeToggle.colorModeToggleBtnLabel',
    defaultMessage: 'Toggle Color Mode',
    description: 'color mode toggle button label',
  },
  'ErrorMessage.Wordlist.401': {
    id: 'ErrorMessage.Wordlist.401',
    defaultMessage: 'Authorization error fetching word list.',
    description: '401 status error message',
  },
  defaultErrorMessage: {
    id: 'ErrorMessage.defaultErrorMessage',
    defaultMessage: 'Oops, we hit a snag.  Please contact someone important',
    description: 'unknown status error message',
  },
  splashScreenText: {
    id: 'SplashScreen.splashScreenText',
    defaultMessage: 'Initializing Hangman Game. It is worth the wait.',
    description: 'visually hidden splash screen message',
  },
});

export { messages };
