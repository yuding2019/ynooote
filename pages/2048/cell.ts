import { MatrixLocation } from "../../common/matrix";
import { View } from "./view";

export class Cell {
  private value: number;
  private merged: boolean;

  location: MatrixLocation;
  rootView: View;

  constructor(params: { location: MatrixLocation; rootView: View }) {
    const { location, rootView } = params;
    this.location = location;
    this.rootView = rootView;
    this.value = 0;
    this.merged = false;
  }

  isEmpty() {
    return this.value === 0;
  }

  getValue() {
    return this.value;
  }

  setValue(value: number) {
    this.value = value;
    return this;
  }
  
  reset() {
    this.merged = false;
  }

  equal(cell?: Cell) {
    if (!cell) {
      return false;
    }
    return this.value === cell.getValue();
  }

  render() {
    this.rootView.renderElement(this);
  }

  move(to?: Cell) {
    if (!to) {
      return false;
    }
    const toValue = to.getValue();
    to.setValue(this.value)
    this.setValue(toValue);
    this.rootView.moveElement(this, to);
    return true;
  }

  canMerge() {
    return !this.merged;
  }

  merge(to: Cell) {
    to.setValue(this.getValue() + to.getValue())
    to.merged = true;

    this.setValue(0);
    this.rootView.mergeElement(this, to);
    return true;
  }
}
