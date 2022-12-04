import { MatrixLocation } from "../../common/matrix";

import { Cell } from "./cell";
import { GAME_BOARD_ID, SCORE_TO_BG_COLOR } from "./constant";
import { TransitionManage } from "./util";

export class View {
  private root: HTMLElement;

  constructor() {
    this.root = document.querySelector(`#${GAME_BOARD_ID}`);
  }

  clear() {
    this.root.innerHTML = "";
  }

  getClassNames(location: MatrixLocation) {
    return ["cell", `loc-x${location.x}-y${location.y}`];
  }

  findByLocation(location: MatrixLocation) {
    const className = "." + this.getClassNames(location).join(".");
    return this.root.querySelector(className) as HTMLElement;
  }

  getElement(cell: Cell) {
    let element = this.findByLocation(cell.location);
    if (element) {
      return element;
    }
    element = document.createElement("div");
    return element as HTMLElement;
  }

  renderElement(cell: Cell) {
    const value = cell.getValue();
    const el = this.getElement(cell);

    el.innerText = String(value);
    el.classList.add(...this.getClassNames(cell.location));
    el.style.backgroundColor = SCORE_TO_BG_COLOR[value];
    el.style.color = value <= 4 ? "#776e65" : "#f9f6f2";
    el.style.fontSize = "48px";

    this.root.appendChild(el);
  }

  moveElement(from: Cell, to: Cell) {
    const id = TransitionManage.id();
    TransitionManage.start(id);

    const fromElement = this.getElement(from);
    const classNames = this.getClassNames(to.location);
    fromElement.className = classNames.join(" ");

    fromElement.ontransitionend = () => {
      TransitionManage.end(id);
    };
  }

  mergeElement(from: Cell, to: Cell) {
    const fromElement = this.getElement(from);
    const toElement = this.getElement(to);

    const id = TransitionManage.id();
    TransitionManage.start(id);

    const classNames = this.getClassNames(to.location);
    fromElement.className = classNames.join(" ");
    fromElement.ontransitionend = () => {
      const value = to.getValue();
      toElement.innerText = String(value);
      toElement.style.backgroundColor = SCORE_TO_BG_COLOR[value];
      toElement.style.color = value <= 4 ? "#776e65" : "#f9f6f2";
      toElement.style.fontSize = value > 1000 ? "28px" : "48px";

      TransitionManage.end(id);
      this.deleteElement(fromElement);
    };

  }

  deleteElement(el: Element) {
    try {
      this.root.removeChild(el);
    } catch {}
  }
}
