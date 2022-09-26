import {
  SWEEPER_FLAG_STATUS,
  SweeperLevel,
  SweeperSizeMap,
  SweeperMineCountMap,
} from "./constant";
import { flagNeighborNotMine, getIndex, printCells, random } from "./util";

interface CellLocation {
  x: number;
  y: number;
}

export type SweeperSize = [number, number];

export class SweeperCell {
  location: CellLocation;
  parent: SweeperModel;
  isMine: boolean;
  flag: number;
  neighborMineCount: number;
  neighborIndexes: number[];

  constructor(params: { location: CellLocation; parent: SweeperModel }) {
    const { location, parent } = params;
    this.location = location;
    this.parent = parent;
    this.isMine = false;
    this.neighborMineCount = 0;
    this.flag = SWEEPER_FLAG_STATUS.NONE;

    this.getNeighborIndexes();
  }

  get index() {
    const { location, parent } = this;
    const { x, y } = location;
    return getIndex(x, y, parent.size);
  }

  private getNeighborIndexes() {
    const { location, parent } = this;
    const size = parent.size;
    const { x, y } = location;

    this.neighborIndexes = [
      getIndex(x - 1, y - 1, size),
      getIndex(x, y - 1, size),
      getIndex(x + 1, y - 1, size),

      getIndex(x - 1, y, size),
      getIndex(x + 1, y, size),

      getIndex(x - 1, y + 1, size),
      getIndex(x, y + 1, size),
      getIndex(x + 1, y + 1, size),
    ].filter((i) => i >= 0);
  }

  setMine() {
    this.isMine = true;
  }

  initNeighborMineCount() {
    if (this.isMine) {
      return;
    }

    const neighborIndexes = this.neighborIndexes;
    const cells = this.parent.cells;
    const count = neighborIndexes.reduce((sum, current) => {
      return sum + Number(cells[current].isMine);
    }, 0);
    this.neighborMineCount = count;
  }

  /**
   * 左键点击进行标记雷
   */
  flagCell() {
    if (this.flag === SWEEPER_FLAG_STATUS.NOT_MINE) {
      return;
    }
    const nextFlag = this.flag + 1;
    if (nextFlag > SWEEPER_FLAG_STATUS.QUESTION) {
      this.flag = SWEEPER_FLAG_STATUS.NONE;
    } else {
      this.flag = nextFlag;
    }
  }

  /**
   * 右键点击标记未不是雷，如果点错，直接结束游戏
   */
  flagNotMine() {
    if (
      [SWEEPER_FLAG_STATUS.MINE, SWEEPER_FLAG_STATUS.QUESTION].includes(
        this.flag
      )
    ) {
      this.flag = SWEEPER_FLAG_STATUS.NONE;
      return;
    }
    if (this.isMine) {
      return true;
    }
    this.flag = SWEEPER_FLAG_STATUS.NOT_MINE;
    if (this.neighborMineCount === 0) {
      flagNeighborNotMine(this);
    }
  }

  get showFlag() {
    return this.flag === SWEEPER_FLAG_STATUS.MINE;
  }

  get showMine() {
    return (
      this.parent.gameOver &&
      this.isMine &&
      this.flag !== SWEEPER_FLAG_STATUS.MINE
    );
  }

  get showCount() {
    return this.flag === SWEEPER_FLAG_STATUS.NOT_MINE;
  }

  get isError() {
    return (
      this.parent.gameOver &&
      this.flag === SWEEPER_FLAG_STATUS.MINE &&
      !this.isMine
    );
  }
}

export class SweeperModel {
  cells: SweeperCell[];
  size: SweeperSize;
  mineCount: number;
  isInitializedMine: boolean;
  visitedIndexes: number[];
  gameOver: boolean;

  constructor(level: SweeperLevel) {
    this.size = SweeperSizeMap[level];
    this.mineCount = SweeperMineCountMap[level];
    this.initCells(...this.size);
    this.isInitializedMine = false;
    this.visitedIndexes = [];
    this.gameOver = false;
  }

  private initCells(xTotal: number, yTotal: number) {
    const cells: SweeperCell[] = [];
    for (let y = 0; y < yTotal; y++) {
      for (let x = 0; x < xTotal; x++) {
        const location = { x, y };
        cells.push(
          new SweeperCell({
            location,
            parent: this,
          })
        );
      }
    }
    this.cells = cells;
  }

  // 点击格子的时候才初始化地雷
  initMines(startLocation: CellLocation) {
    // 点击的格子不生成地雷
    const startIndex = getIndex(startLocation.x, startLocation.y, this.size);

    const cells = this.cells;
    const count = this.mineCount;
    for (let i = 0; i < count; i++) {
      let index = random(0, cells.length);
      while (startIndex === index || cells[index].isMine) {
        index = random(0, cells.length);
      }
      cells[index].setMine();
    }
    this.cells.forEach((cell) => cell.initNeighborMineCount());
    printCells(this.cells, this.size);
    this.isInitializedMine = true;
  }

  startFlagNotMine(startCell: SweeperCell) {
    this.visitedIndexes = [startCell.index];
  }

  isGameOver(flagResult?: boolean) {
    this.gameOver = flagResult ?? false;
  }

  get flagCount() {
    return this.cells.reduce((count, cell) => {
      return count + Number(cell.flag === SWEEPER_FLAG_STATUS.MINE);
    }, 0);
  }
}
