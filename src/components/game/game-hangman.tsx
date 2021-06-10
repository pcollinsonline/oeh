import React from 'react';
import { QueryObserverResult } from 'react-query';
import { gameReducer } from './state/game-reducers';
import { Keyboard } from './ui/keyboard';
import { GameWordDisplay, LostGameWordDisplay } from './ui/word-display';
import { GameText } from './ui/game-text';
import { initialGameState, isLetter } from './utils/game-utils';
import { Gallows, MAX_GUESSES } from './ui/gallows';
import { ResetButton } from './ui/reset-button';
import Banner from './ui/banner';
import { WORD_LIST } from '../../hooks/use-word-pool';
import { GameStatus } from './game-types';

interface HangmanProps {
  initialPool: string[];
  refetchPool: () => Promise<QueryObserverResult<string[], Error>>;
}

const Hangman = ({ initialPool, refetchPool }: HangmanProps): JSX.Element => {
  const [words, setWords] = React.useState<string[]>(initialPool);

  const [state, dispatch] = React.useReducer(
    gameReducer,
    initialGameState(words[0], MAX_GUESSES)
  );

  const { guesses, numberOfGuessesRemaining, display, status, word } = state;
  const wrongGuesses = guesses.filter(letter => !word.includes(letter));

  React.useEffect(() => {
    const dispatchGuess = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      if (isLetter(e.key)) {
        dispatch({
          type: 'guess',
          guess: e.key.toLowerCase(),
        });
      }
    };
    window.addEventListener('keydown', dispatchGuess);
    return () => {
      window.removeEventListener('keydown', dispatchGuess);
    };
  }, [dispatch]);

  const onLetterPress = React.useCallback(
    (guess: string) => {
      dispatch({
        type: 'guess',
        guess,
      });
    },
    [dispatch]
  );

  const onReset = React.useCallback(() => {
    if (words.length > 1) {
      dispatch({
        type: 'reset',
        newWord: words[1],
      });

      // if they haven't guessed anything
      // no need to remove from the list
      if (guesses.length) {
        setWords(prevWords => {
          return prevWords.slice(1);
        });
      }
    }

    // when there are 5 words left
    // re-fetch some fresh words and
    // append them to the pool
    if (words.length < 6) {
      refetchPool()
        .then(newWords => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          setWords(prev => [...prev, ...newWords.data!]);
        })
        .catch(() => {
          setWords(prev => [...prev, ...WORD_LIST]);
        });
    }
  }, [dispatch, setWords, words, guesses, refetchPool]);

  return (
    <div className="App">
      <Banner />
      <div className="ui-game-container h-100 w-100 flex items-center flex-column pv3">
        <div className="pa3 mb4">
          <GameText
            remainingGuesses={numberOfGuessesRemaining}
            status={status}
            isNewGame={!guesses.length}
          />
        </div>
        <div className="mb4 mb5-ns">
          <Gallows guessesRemaining={numberOfGuessesRemaining} />
        </div>
        <div className="mb4 ph2 w-90 mw7-ns w-auto-ns mw5 flex justify-center">
          {status === GameStatus.Lost && (
            <LostGameWordDisplay
              word={word}
              guesses={guesses}
              display={display}
            />
          )}
          {status !== GameStatus.Lost && <GameWordDisplay display={display} />}
        </div>
        <Keyboard
          onPress={onLetterPress}
          display={display}
          wrongGuesses={wrongGuesses}
        />
        <div className="flex justify-center mt2">
          <ResetButton onReset={onReset} />
        </div>
      </div>
    </div>
  );
};

export { Hangman };
