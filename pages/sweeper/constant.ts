import { SweeperSize } from "./model";

export const enum SweeperLevel {
  EASY = "easy",
  MIDDLE = "middle",
  HARD = "hard",
}

export const SweeperSizeMap: Record<SweeperLevel, SweeperSize> = {
  [SweeperLevel.EASY]: [9, 9],
  [SweeperLevel.MIDDLE]: [16, 16],
  [SweeperLevel.HARD]: [30, 16],
};

export const SweeperMineCountMap: Record<SweeperLevel, number> = {
  [SweeperLevel.EASY]: 10,
  [SweeperLevel.MIDDLE]: 40,
  [SweeperLevel.HARD]: 99,
};

export const SWEEPER_FLAG_STATUS = {
  NONE: 0,
  MINE: 1,
  QUESTION: 2,
  NOT_MINE: 3,
};

export const CONTROL_LEVEL_BUTTONS = [
  {
    level: SweeperLevel.EASY,
    text: '基础',
  },
  {
    level: SweeperLevel.MIDDLE,
    text: '中级',
  },
  {
    level: SweeperLevel.HARD,
    text: '高级',
  }
]
