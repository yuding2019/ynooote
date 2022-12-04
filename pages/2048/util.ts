import { noop } from "lodash";
import { DIRECTION } from "./constant";
import { Direction } from "./type";

export function bindKeydown(move: (dir: Direction) => void) {
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

export class TransitionManage {
  private static transitionIds = new Set<string>();
  private static startListener: () => void = noop;
  private static endListener: () => void = noop;

  private static uniqId = 0;

  static onStart = (cb: () => void) => {
    this.startListener = cb;
  };

  static onEnd = (cb: () => void) => {
    this.endListener = cb;
  };

  static start = (id: string) => {
    this.startListener();
    this.transitionIds.add(id);
  };

  static end = (id: string) => {
    this.transitionIds.delete(id);
    if (this.transitionIds.size === 0) {
      this.endListener();
    }
  };

  static id = () => {
    return `${Date.now()}_${++this.uniqId}`;
  }
}
