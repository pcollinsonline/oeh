import React from 'react';
import { reducer } from './game/hangman-reducer';
import { newGameState, randomWord } from './game/hangman-utils';
import { GameProvider } from './game/hangman-provider';
import {
  GameContainer,
  GameText,
  Keyboard,
  ResetButton,
  WordDisplay,
  HangmanGallows,
  Banner,
} from './game/hangman-ui';

const WORD_POOL = [
  // 'hangman',
  // 'interview',
  'code-pen',
  // 'rhinoceros',
  // 'dictionary',
  // 'encyclopedia',
];

const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(
    reducer,
    newGameState(randomWord(WORD_POOL))
  );

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
    dispatch({
      type: 'reset',
      newWord: randomWord(WORD_POOL),
    });
  }, [dispatch]);

  return (
    <div className="App">
      <Banner />
      <GameProvider gameState={state}>
        <GameContainer>
          <div className="pa3 mb4">
            <GameText />
          </div>
          <div className="mb4">
            <HangmanGallows />
          </div>
          <div className="mb4 ph2 w-90 mw7-ns w-auto-ns mw5 flex justify-center">
            <WordDisplay />
          </div>
          <Keyboard onPress={onLetterPress} />
          <div className="flex justify-center mt2">
            <ResetButton onReset={onReset} />
          </div>
        </GameContainer>
      </GameProvider>
    </div>
  );
};

export default App;
