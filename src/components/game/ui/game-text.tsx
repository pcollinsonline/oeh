import React from 'react';
import { useIntl } from 'react-intl';
import VisuallyHidden from '@reach/visually-hidden';
import { messages } from '../../../i18n/messages-default';
import { GameStatus } from '../game-types';

interface GameTextProps {
  remainingGuesses: number;
  status: GameStatus;
  isNewGame: boolean;
}

interface BubbleTextProps {
  text: string;
  // eslint-disable-next-line react/require-default-props
  cssClasses?: string;
}

const BubbleText = ({ text, cssClasses }: BubbleTextProps) => {
  return (
    <>
      <VisuallyHidden data-testid="bubble-text">{text}</VisuallyHidden>
      {text.split('').map((letter, index) => {
        const key = `letter-${index}`;
        return (
          <span
            aria-hidden
            key={key}
            className={`ui-game-text-bubble-text helvetica mh1 ttu ${cssClasses}`}
          >
            {letter}
          </span>
        );
      })}
    </>
  );
};

const Winner = () => {
  const { formatMessage } = useIntl();
  const winnerText = formatMessage(messages.gameWon);
  return <BubbleText text={winnerText} />;
};

const Loser = () => {
  const { formatMessage } = useIntl();
  const loserText = formatMessage(messages.gameLost).toUpperCase();
  return <BubbleText text={loserText} cssClasses="ui-warning" />;
};

const GameText = React.memo(
  ({ remainingGuesses, status, isNewGame }: GameTextProps): JSX.Element => {
    const intl = useIntl();

    if (status === GameStatus.Won) {
      return <Winner />;
    }

    if (status === GameStatus.Lost) {
      return <Loser />;
    }

    const renderMessage = () => {
      if (isNewGame) {
        return intl.formatMessage(messages.guessALetter, {
          // eslint-disable-next-line react/display-name
          container: chunks => (
            <span className="ui-game-text-start">{chunks}</span>
          ),
        });
      }
      return intl.formatMessage(messages.guessesLeftMsg, {
        count: remainingGuesses,
        // eslint-disable-next-line react/display-name
        container: chunks => (
          <span
            className={`ui-game-text-guesses-remaining ${
              remainingGuesses < 3 ? 'ui-warning' : ''
            }`}
          >
            {chunks}
          </span>
        ),
      });
    };

    return (
      <div role="alert" className="ui-game-text f5 f3-ns helvetica">
        {renderMessage()}
      </div>
    );
  }
);

GameText.displayName = 'GameText';

export { GameText };
