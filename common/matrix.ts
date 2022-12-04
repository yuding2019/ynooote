/**
 * 默认从start -> end，包含两端
 * 开启reverse后，从end->start
 */
function numberEach(
  start: number,
  end: number,
  cb: (index: number) => void,
  reverse?: boolean
) {
  const _end = reverse ? start : end;
  const increase = reverse ? -1 : 1;

  let current = reverse ? end : start;
  while (current !== _end) {
    cb(current);
    current += increase;
  }
  cb(current);
}

export interface MatrixLocation {
  x: number;
  y: number;
}

export type MatrixSize = [number, number];

/**
 * 用数组模拟二维矩阵
 */
export class Matrix<T = unknown> {
  size: MatrixSize;

  private source: T[] = [];

  constructor(size: MatrixSize) {
    this.size = size;
    this.source = Array.from({ length: size[0] * size[1] });
  }

  get width() {
    return this.size[0];
  }

  get height() {
    return this.size[1];
  }

  get length() {
    return this.width * this.height;
  }

  each(callback: (item: T, index: number, location: MatrixLocation) => void) {
    this.source.forEach((item, index) => {
      const location = this.locate(index);
      callback(item, index, location);
    });
  }

  some(callback: (item: T) => boolean) {
    return this.source.some((item) => callback(item));
  }

  eachAxisY(callback: (y: number) => void, reverse?: boolean) {
    numberEach(0, this.height - 1, callback, reverse);
  }

  eachAxisX(callback: (x: number) => void, reverse?: boolean) {
    numberEach(0, this.width - 1, callback, reverse);
  }

  eachRow(
    callback: (item: T, index: number, location: MatrixLocation) => void,
    reverse?: boolean
  ) {
    this.eachAxisY((y) => {
      this.eachAxisX((x) => {
        const location = { x, y };
        const index = this.index(location);
        const current = this.source[index];
        callback(current, index, location);
      }, reverse);
    });
  }

  eachCol(
    callback: (item: T, index: number, location: MatrixLocation) => void,
    reverse?: boolean
  ) {
    this.eachAxisX((x) => {
      this.eachAxisY((y) => {
        const location = { x, y };
        const index = this.index(location);
        const current = this.source[index];
        callback(current, index, location);
      }, reverse);
    });
  }

  index(location: MatrixLocation) {
    const { x, y } = location;
    if (x < 0 || x >= this.width) {
      return -1;
    }
    if (y < 0 || y >= this.height) {
      return -1;
    }

    return x + y * this.width;
  }

  locate(index: number) {
    if (index < 0 || index >= this.length) {
      return;
    }
    const x = index % this.width;
    const y = ~~(index / this.width);
    return { x, y };
  }

  get(locate: number | MatrixLocation): T | undefined {
    let index = typeof locate === 'number' ? locate : this.index(locate);
    if (!this.isValidLocate(index)){
      return;
    }
    return this.source[index];
  }

  set(locate: number | MatrixLocation, data: T) {
    let index = typeof locate === 'number' ? locate : this.index(locate);
    if (!this.isValidLocate(index)) {
      return;
    }
    this.source[index] = data;
  }

  isValidLocate(locate: number | MatrixLocation) {
    const index = typeof locate === 'number' ? locate : this.index(locate);
    return index >= 0 && index <= this.length;
  }
}
