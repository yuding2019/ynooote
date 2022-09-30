import { shuffle } from "lodash";
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
  flagMine() {
    if (this.flag === SWEEPER_FLAG_STATUS.NOT_MINE || this.parent.isGameEnd) {
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
   * 右键点击标记未不是雷
   */
  flagNotMine(internalFlagging = false) {
    if (this.parent.isGameEnd) {
      return;
    }

    if (this.flag === SWEEPER_FLAG_STATUS.NOT_MINE) {
      this.flagByCount();
      return;
    }

    if (
      [SWEEPER_FLAG_STATUS.MINE, SWEEPER_FLAG_STATUS.QUESTION].includes(
        this.flag
      ) &&
      !internalFlagging
    ) {
      this.flag = SWEEPER_FLAG_STATUS.NONE;
      return;
    }

    this.flag = SWEEPER_FLAG_STATUS.NOT_MINE;
    if (this.neighborMineCount === 0 && !this.isMine) {
      flagNeighborNotMine(this);
    }
  }

  private flagByCount() {
    const neighborCells = this.neighborIndexes.map(
      (index) => this.parent.cells[index]
    );

    const notMineCells = neighborCells.filter((cell) => {
      return cell.flag === SWEEPER_FLAG_STATUS.NOT_MINE;
    });

    const flagMineCells = neighborCells.filter((cell) => {
      return cell.flag === SWEEPER_FLAG_STATUS.MINE;
    });

    if (
      this.neighborMineCount &&
      flagMineCells.length < this.neighborMineCount
    ) {
      return;
    }

    // 先判断是否标记正确，如果标记不正确，直接game over
    const allRight = flagMineCells.every((cell) => cell.isMine);
    if (!allRight) {
      this.parent.setGameOver();
      return;
    }

    this.parent.visitedIndexes.push(...notMineCells.map((cell) => cell.index));
    flagNeighborNotMine(this);
  }

  get showFlagIcon() {
    return [SWEEPER_FLAG_STATUS.MINE, SWEEPER_FLAG_STATUS.QUESTION].includes(
      this.flag
    );
  }

  get showMine() {
    return (
      this.parent.isGameOver &&
      this.isMine &&
      this.flag !== SWEEPER_FLAG_STATUS.MINE
    );
  }

  get showCount() {
    return this.flag === SWEEPER_FLAG_STATUS.NOT_MINE;
  }

  get isFlagError() {
    return (
      this.parent.isGameOver &&
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
  isGameOver: boolean;
  isGameSuccess: boolean;
  isGameEnd: boolean;

  constructor(level: SweeperLevel) {
    this.size = SweeperSizeMap[level];
    this.mineCount = SweeperMineCountMap[level];
    this.initCells(...this.size);
    this.isInitializedMine = false;
    this.visitedIndexes = [];
    this.isGameOver = false;
    this.isGameSuccess = false;
    this.isGameEnd = false;
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

  setGameOver() {
    if (this.isGameEnd) {
      return;
    }
    this.isGameOver = true;
    this.isGameEnd = true;
  }

  setGameSuccess() {
    if (this.isGameEnd) {
      return;
    }
    this.isGameSuccess = true;
    this.isGameEnd = true;
  }

  judgment() {
    // 判断是否标记错误
    const isFlagFalsely = this.cells.some((cell) => {
      return cell.isMine && cell.flag === SWEEPER_FLAG_STATUS.NOT_MINE;
    });
    if (isFlagFalsely) {
      this.setGameOver();
      return;
    }

    // 判断是否全部标记成功
    const isAllMineFlagged = this.cells
      .filter((cell) => {
        return cell.isMine;
      })
      .every((cell) => {
        return cell.flag === SWEEPER_FLAG_STATUS.MINE;
      });
    if (isAllMineFlagged) {
      this.setGameSuccess();
      return;
    }
  }

  get flagCount() {
    return this.cells.reduce((count, cell) => {
      return count + Number(cell.flag === SWEEPER_FLAG_STATUS.MINE);
    }, 0);
  }

  getTip() {
    const notFoundMineIndexes = this.cells
      .filter((cell) => {
        return cell.isMine && cell.flag === SWEEPER_FLAG_STATUS.NONE;
      })
      .map((cell) => cell.index);

    const shuffled = shuffle(notFoundMineIndexes);
    return shuffled.slice(0, 3);
  }
}
