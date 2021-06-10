interface GameStateBase {
  readonly word: string;
  readonly maxGuesses: number;
  readonly guesses: string[];
}

interface GameState extends GameStateBase {
  readonly status: GameStatus;
  readonly display: string[];
  readonly numberOfGuessesRemaining: number;
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

export { GameStatus };

export type { GameStateBase, GameState, GameAction, GuessAction, ResetAction };
