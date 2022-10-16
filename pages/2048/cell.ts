import { MatrixLocation } from "../../common/matrix";

export class Cell {
  location: MatrixLocation;
  value: number;

  isMerge: boolean;
  isMoved: boolean;

  mergeFrom?: Cell;
  moveFrom?: Cell;

  constructor(location: MatrixLocation) {
    this.location = location;
    this.value = 0;
    this.isMerge = false;
    this.isMoved = false;
  }

  get canBeOverride() {
    if (this.value === 0) {
      return true;
    }
    return (this.isMerge && !this.mergeFrom) || this.isMoved;
  }

  clearStatus() {
    this.isMerge = false;
    this.isMoved = false;
    this.mergeFrom = void 0;
    this.moveFrom = void 0;
  }

  moveTo(to: Cell) {
    this.isMoved = true;
    to.moveFrom = this;
  }

  merge(from: Cell) {
    from.isMerge = true;
    this.isMerge = true;
    this.mergeFrom = from;
  }
}
