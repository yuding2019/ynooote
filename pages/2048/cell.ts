import { MatrixLocation } from "../../common/matrix";

export class Cell {
  location: MatrixLocation;
  value: number;

  isMerge: boolean;
  isMoved: boolean;
  isOverride: boolean;

  mergeFrom?: Cell;
  moveTo?: Cell;

  constructor(location: MatrixLocation) {
    this.location = location;
    this.value = 0;
    this.isMerge = false;
    this.isMoved = false;
    this.isOverride = false;
  }

  get canBeOverride() {
    return (
      (this.isMerge && !this.mergeFrom) || this.isMoved || !this.isOverride
    );
  }

  clearStatus() {
    this.isMerge = false;
    this.isMoved = false;
    this.isOverride = false;
    this.mergeFrom = undefined;
    this.moveTo = undefined;
  }

  recordMoveTo(to: Cell) {
    this.isMoved = true;
    this.moveTo = to;
    to.isOverride = true;
  }

  move() {
    const to = this.moveTo;
    if (!to) {
      return;
    }
    to.value = this.value;
    this.value = 0;
  }

  mergeTo(to: Cell) {}
}
