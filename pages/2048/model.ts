import { Matrix, MatrixLocation, MatrixSize } from "../../common/matrix";
import { random } from "../../common/util";

import { Cell } from "./cell";

import { DIRECT, DIRECTION, GAME_BOARD_ID, GAME_SIZE } from "./constant";
import { Direction } from "./type";
import { bindKeydown, TransitionManage } from "./util";
import { View } from "./view";

export type GameSize = MatrixSize;

export class GameModel {
  matrix: Matrix<Cell>;
  size: MatrixSize = GAME_SIZE.FOUR;

  isMoving = false;
  isGameOver = false;
  needRandomNewCell = false;

  rootView: View;

  private clearKeydownFunc: () => void;
  private gameOverListener: () => void;

  constructor() {
    TransitionManage.onStart(() => {
      this.isMoving = true;
    });
    TransitionManage.onEnd(() => {
      this.isMoving = false;
      if (this.needRandomNewCell) {
        this.randomCell();
        this.needRandomNewCell = false;
      }
    });
  }

  init = (size?: GameSize) => {
    if (this.rootView) {
      this.rootView.clear();
    } else {
      this.rootView = new View();
    }

    const oldSize = this.size;
    this.size = size ?? oldSize;
    this.matrix = new Matrix(this.size);
    this.isGameOver = false;

    this.matrix.each((_, index, location) => {
      this.matrix.set(index, new Cell({ location, rootView: this.rootView }));
    });

    this.randomCell();
    this.randomCell();

    this.clearKeydownFunc = bindKeydown((dir) => {
      if (!this.isMoving && !this.isGameOver) {
        this.move(dir);
        this.validate();
      }
    });
  };

  restart = () => {
    this.init();
  };

  // 判断移动的方向
  // 上下移动的时候需要以列为单位去判断每一列上面的cell是否可以合并，左右同理
  // 向上的时候需要从下往上遍历，所以会设置reverse，向右同理
  move = (direction: Direction) => {
    const inCol = [DIRECTION.UP, DIRECTION.DOWN].includes(direction);
    const direct = DIRECT[direction];
    const eachFn = inCol ? "eachCol" : "eachRow";
    const reverse = inCol ? direct.y === 1 : direct.x === 1;

    let moved = false;
    this.matrix[eachFn]((currentCell) => {
      if (currentCell.isEmpty()) {
        return;
      }

      const { prev, next } = this.findNextCell(currentCell, direct);
      if (!next) {
        return;
      }

      let moveResult = false;
      if (currentCell.equal(next) && next.canMerge()) {
        moveResult = currentCell.merge(next);
      } else if (next.isEmpty()) {
        moveResult = currentCell.move(next);
      } else if (prev !== currentCell) {
        moveResult = currentCell.move(prev);
      }
      moved = moved || moveResult;
    }, reverse);

    this.needRandomNewCell = moved;
    this.matrix.each((cell) => cell.reset());
  };

  clear = () => {
    this.clearKeydownFunc();
  };

  // 找到第一个value不为0的cell，如果没有，就返回最后找到的
  // prev如果存在的话，一定是空的
  private findNextCell = (
    start: Cell,
    direct: MatrixLocation
  ): { prev?: Cell; next?: Cell } => {
    let next = this.matrix.get({
      x: start.location.x + direct.x,
      y: start.location.y + direct.y,
    });
    let prev: Cell | undefined;
    while (next && next.isEmpty()) {
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
  };

  private randomCell = () => {
    const length = this.matrix.length;

    let index = random(0, length);
    let cell = this.matrix.get(index);
    while (!cell.isEmpty()) {
      index = random(0, length);
      cell = this.matrix.get(index);
    }

    const value = this.randomValue();
    this.matrix.get(index).setValue(value).render();
  };

  private randomValue = () => {
    return Math.random() > 0.5 ? 4 : 2;
  };

  private validate() {
    const hasSameValueCell = this.matrix.some((cell) => {
      const { x, y } = cell.location;
      const top = this.matrix.get({ x, y: y - 1 });
      const left = this.matrix.get({ x: x - 1, y });
      const right = this.matrix.get({ x: x + 1, y });
      const bottom = this.matrix.get({ x, y: y + 1 });

      return [top, left, right, bottom]
        .filter((cell) => !!cell)
        .some((item) => cell.isEmpty() || cell.equal(item));
    });

    this.isGameOver = !hasSameValueCell;
    if (!hasSameValueCell) {
      this.gameOverListener();
    }
  }

  onGameOver = (cb: () => void) => {
    this.gameOverListener = cb;
  };
}
