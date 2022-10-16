import { Cell } from './cell';
import { GAME_BOARD_ID } from './constant';

export class View {
  root: HTMLElement;

  constructor() {
    this.root = document.querySelector(`#${GAME_BOARD_ID}`);
  }

  update(cells: Cell[]) {

  }
}
