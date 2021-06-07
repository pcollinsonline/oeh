import React from 'react';
import { GameState } from './hangman-reducer';

const GameContext = React.createContext<GameState | null>(null);

interface GameStateProps {
  gameState: GameState;
}

const GameProvider: React.FC<GameStateProps> = ({ gameState, children }) => (
  <GameContext.Provider value={gameState}>{children}</GameContext.Provider>
);

const useGame = (): GameState => {
  const state = React.useContext(GameContext);
  if (!state) {
    throw new Error('ancestor tree must be wrapped on a <GameProvider> tag');
  }
  return state;
};

export { GameProvider, useGame };
