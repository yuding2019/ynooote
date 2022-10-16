import { GameSize } from "./model";

export const GAME_SIZE: Record<string, GameSize> = {
  THREE: [3, 3],
  FOUR: [4, 4],
  FIVE: [5, 5],
};

export const GAME_BOARD_ID = "GAME_BOARD_ID";


export const DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
}

export const DIRECT = {
  [DIRECTION.UP]: { x: 0, y: -1 },
  [DIRECTION.DOWN]: { x: 0, y: 1 },
  [DIRECTION.LEFT]: { x: 1, y: 0 },
  [DIRECTION.RIGHT]: { x: -1, y: 0 },
};
