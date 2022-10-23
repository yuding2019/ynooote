import { difference } from "lodash";
import { MatrixLocation } from "../../common/matrix";

import { Cell } from "./cell";
import { GAME_BOARD_ID } from "./constant";

interface CellElement extends HTMLElement {
  __IS_NEW__?: boolean;
}

const SCORE_TO_COLOR = {
  [2 ** 1]: "#eee4da",
  [2 ** 2]: "#ede0c8",
  [2 ** 3]: "#f2b179",
  [2 ** 4]: "#f59563",
  [2 ** 5]: "#f67c5f",
  [2 ** 6]: "#f65e3b",
  [2 ** 7]: "#edcf72",
  [2 ** 8]: "#edcc61",
  [2 ** 9]: "#edc850",
  [2 ** 10]: "#edc53f",
  [2 ** 11]: "#edc22e",
};

export class View {
  root: CellElement;

  update(cells: Cell[]) {
    this.initRoot();

    cells.forEach((cell) => this.process(cell));
  }

  clear() {
    this.root?.childNodes.forEach((node) => {
      this.root.removeChild(node);
    });
  }

  private initRoot() {
    if (this.root) {
      return;
    }
    this.root = document.querySelector(`#${GAME_BOARD_ID}`);
  }

  private process(cell: Cell) {
    if (cell.moveTo) {
      const element = this.getElement(cell);
      cell.move();
      this.updateElement(element, cell.moveTo);
      return;
    }
    if (cell.value) {
      const element = this.getElement(cell);
      this.updateElement(element, cell);
    }
  }

  private getClassNames(location: MatrixLocation) {
    return ["cell", `loc-x${location.x}-y${location.y}`];
  }

  private findByLocation(location: MatrixLocation) {
    const className = "." + this.getClassNames(location).join(".");
    return this.root.querySelector(className) as CellElement;
  }

  private getElement(cell: Cell) {
    let element = this.findByLocation(cell.location);
    if (element) {
      return element;
    }
    element = document.createElement("div");
    element.__IS_NEW__ = true;
    element.classList.add(...this.getClassNames(cell.location));
    return element;
  }

  private updateElement(element: CellElement, cell: Cell) {
    const value = cell.value || "";

    const classNames = this.getClassNames(cell.location);
    const oldClassNames = [...element.classList.values()];
    const oldClassName = difference(oldClassNames, classNames)[0];
    const newClassName = difference(classNames, oldClassNames)[0];

    if (oldClassName) {
      element.classList.remove(oldClassName);
    }
    if (newClassName) {
      element.classList.add(newClassName);
    }

    element.innerText = String(value);
    element.style.backgroundColor = SCORE_TO_COLOR[value];
    element.style.color = value <= 4 ? "#776e65" : "#f9f6f2";
    element.style.fontSize = value > 1000 ? "28px" : "48px";

    if (element.__IS_NEW__) {
      element.__IS_NEW__ = false;
      this.root.appendChild(element);
      return;
    }
  }

  private deleteElement(cell: Cell) {
    const element = this.findByLocation(cell.location);
    if (element) {
      this.root.removeChild(element);
    }
  }
}
