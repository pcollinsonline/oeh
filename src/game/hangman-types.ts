interface GameState {
  currentWord: string;
  userInput: string[];
  display: string[];
  wrongGuesses: string[];
  maxGuesses: number;
  message: string;
  status: GameStatus;
  hints: string[];
}

enum GameStatus {
  InProgress = 'InProgress',
  Won = 'Won',
  Lost = 'Lost',
}

type GuessAction = {
  type: 'guess';
  guess: string;
};

type ResetAction = {
  type: 'reset';
  newWord: string;
};

type GameAction = GuessAction | ResetAction;

export type { GameState, GameAction, ResetAction, GuessAction };
export { GameStatus };
