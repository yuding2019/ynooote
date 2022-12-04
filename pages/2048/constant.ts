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
  [DIRECTION.LEFT]: { x: -1, y: 0 },
  [DIRECTION.RIGHT]: { x: 1, y: 0 },
};

export const SCORE_TO_BG_COLOR = {
  [2 ** 1]: "#eee4da", // 2
  [2 ** 2]: "#ede0c8", // 4
  [2 ** 3]: "#f2b179", // 8
  [2 ** 4]: "#f59563", // 16
  [2 ** 5]: "#f67c5f", // 32
  [2 ** 6]: "#f65e3b", // 64
  [2 ** 7]: "#edcf72", // 128
  [2 ** 8]: "#edcc61", // 256
  [2 ** 9]: "#edc850", // 512
  [2 ** 10]: "#edc53f", // 1024
  [2 ** 11]: "#edc22e", // 2048
};
