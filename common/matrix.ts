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

  eachAxisY(callback: (y: number) => void, reverse?: boolean) {
    numberEach(0, this.height - 1, callback, reverse);
  }

  eachAxisX(callback: (x: number) => void, reverse?: boolean) {
    numberEach(0, this.width - 1, callback, reverse);
  }

  each(callback: (item: T, index: number, location: MatrixLocation) => void) {
    this.eachAxisY((y) => {
      this.eachAxisX((x) => {
        const location = { x, y };
        const index = this.index(location);
        const current = this.source[index];
        callback(current, index, location);
      });
    });
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

  location(index: number) {
    if (index < 0 || index >= this.height) {
      return;
    }
    const x = index % this.width;
    const y = ~~(index / this.width);
    return { x, y };
  }

  get(locate: number | MatrixLocation) {
    if (typeof locate === 'number') {
      return this.source[locate];
    }
    return this.source[this.index(locate)];
  }

  set(locate: number | MatrixLocation, data: T) {
    if (typeof locate === 'number') {
      this.source[locate] = data;
    } else {
      this.source[this.index(locate)] = data;
    }
  }
}
