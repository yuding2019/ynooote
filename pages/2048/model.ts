import { Matrix, MatrixLocation, MatrixSize } from "../../common/matrix";
import { random } from "../../common/util";

import { View } from "./view";
import { Cell } from "./cell";

import { DIRECT, DIRECTION, GAME_SIZE } from "./constant";
import { Direction } from "./type";

export type GameSize = MatrixSize;

export class GameModel {
  matrix: Matrix<Cell>;
  size: MatrixSize = GAME_SIZE.FOUR;
  view: View;

  constructor() {
    this.init();
    this.view = new View();
  }

  init(size?: GameSize) {
    const oldSize = this.size;
    this.size = size ?? oldSize;
    this.matrix = new Matrix(this.size);

    this.matrix.each((_, index, location) => {
      this.matrix.set(index, new Cell(location));
    });

    this.random();
    this.random();

    this.render();
  }

  restart() {
    this.init();
  }

  // 判断移动的方向
  // 上下移动的时候需要以列为单位去判断每一列上面的cell是否可以合并，左右同理
  // 向上的时候需要从下往上遍历，所以会设置reverse，向右同理
  move(direction: Direction) {
    const inCol = [DIRECTION.UP, DIRECTION.DOWN].includes(direction);
    const direct = DIRECT[direction];
    const eachFn = inCol ? "eachCol" : "eachRow";
    const reverse = inCol ? direct.y === -1 : direct.x === -1;

    let moved = false;
    this.matrix[eachFn]((currentCell, index) => {
      const next = this.findNextCell(currentCell, direct);
      if (!next) {
        return;
      }

      if (currentCell.canBeOverride) {
        next.moveTo(currentCell);
        moved = true;
      } else if (currentCell.value === next.value) {
        currentCell.merge(next);
        moved = true;
      }
    }, reverse);

    if (moved) {
      this.random();
      this.render();
    }
  }

  // 找到第一个不为空的cell
  private findNextCell(startCell: Cell, direct: MatrixLocation) {
    let next = this.matrix.get({
      x: startCell.location.x + direct.x,
      y: startCell.location.y + direct.y,
    });
    while (next && next.value === 0) {
      next = this.matrix.get({
        x: next.location.x + direct.x,
        y: next.location.y + direct.y,
      });
    }
    return next;
  }

  private random() {
    const length = this.matrix.length;
    const value = Math.random() > 0.5 ? 4 : 2;
    let index = random(0, length);
    let cell = this.matrix.get(index);
    while (cell.value !== 0) {
      index = random(0, length);
      cell = this.matrix.get(index);
    }
    this.matrix.get(index).value = value;
  }

  private buildUpdateCells() {
    const cells: Cell[] = [];
    this.matrix.each((cell) => {
      if (cell && cell.value) {
        cells.push(cell);
      }
    });
    return cells;
  }

  private clearUpdateCells(cells: Cell[]) {
    cells.forEach((c) => c.clearStatus());
  }

  private render() {
    const cells = this.buildUpdateCells();
    this.view.update(cells);
    this.clearUpdateCells(cells);
  }
}
