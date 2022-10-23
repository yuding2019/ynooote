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

  isMoving: boolean;

  clearKey: () => void;

  init(size?: GameSize) {
    const oldSize = this.size;
    this.size = size ?? oldSize;
    this.matrix = new Matrix(this.size);

    this.matrix.each((_, index, location) => {
      this.matrix.set(index, new Cell(location));
    });

    this.random();
    this.random();

    if (!this.view) {
      this.view = new View();
    }

    this.clearKey = bindKey((dir) => {
      if (!this.isMoving) {
        this.move(dir);
      }
    });

    this.view.clear();
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
    const reverse = inCol ? direct.y === 1 : direct.x === 1;

    let moved = false;
    this.matrix[eachFn]((currentCell, index) => {
      const { prev, next } = this.findNextCell(currentCell, direct);
      if (!next || currentCell === next) {
        return;
      }
      if (!currentCell.value) {
        return;
      }

      if (currentCell.value === next.value) {
        currentCell.mergeTo(next);
        moved = true;
      } else if (next.canBeOverride) {
        currentCell.recordMoveTo(next);
        moved = true;
      } else if (prev && prev.canBeOverride) {
        currentCell.recordMoveTo(prev);
        moved = true;
      }
    }, reverse);

    if (moved) {
      // this.random();
      this.render();
    }
  }

  clear() {
    this.clearKey();
    this.view.clear();
  }

  // 找到第一个value不为0的cell，如果没有，就返回最后找到的
  private findNextCell(startCell: Cell, direct: MatrixLocation) {
    let next = this.matrix.get({
      x: startCell.location.x + direct.x,
      y: startCell.location.y + direct.y,
    });
    let prev = startCell;
    while (next && next.canBeOverride) {
      const _next = this.matrix.get({
        x: next.location.x + direct.x,
        y: next.location.y + direct.y,
      });
      if (!_next) {
        break;
      }
      prev = next;
      next = _next;
    }
    return {
      prev,
      next,
    };
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

  private clearUpdateCells(cells: Cell[]) {
    cells.forEach((c) => c.clearStatus());
  }

  private render() {
    this.isMoving = true;
    const cells: Cell[] = [];
    this.matrix.each((cell) => {
      cells.push(cell);
    });
    this.view.update(cells);
    this.clearUpdateCells(cells);
    this.isMoving = false;
  }
}

function bindKey(move: (dir: Direction) => void) {
  const handler = (e: KeyboardEvent) => {
    const { key } = e;
    const upperKey = key.toUpperCase().replace("ARROW", "");
    switch (upperKey) {
      case "W":
      case DIRECTION.UP:
        e.preventDefault();
        move(DIRECTION.UP);
        break;
      case "S":
      case DIRECTION.DOWN:
        e.preventDefault();
        move(DIRECTION.DOWN);
        break;
      case "A":
      case DIRECTION.LEFT:
        e.preventDefault();
        move(DIRECTION.LEFT);
        break;
      case "D":
      case DIRECTION.RIGHT:
        e.preventDefault();
        move(DIRECTION.RIGHT);
        break;
    }
  };
  window.addEventListener("keydown", handler);

  return () => {
    window.removeEventListener("keydown", handler);
  };
}
