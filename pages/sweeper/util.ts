import dayjs from "dayjs";
import { difference } from "lodash";
import { SweeperCell } from "./model";

export function random(min: number, max: number, includeMax: boolean = false) {
  return Math.floor(Math.random() * (max - min + Number(includeMax))) + min;
}

export function getIndex(x: number, y: number, size: [number, number]) {
  const [xTotal, yTotal] = size;
  if (x < 0 || x >= xTotal) {
    return -1;
  }
  if (y < 0 || y >= yTotal) {
    return -1;
  }

  return x + y * xTotal;
}

export function printCells(cells: SweeperCell[], size: [number, number]) {
  const [xTotal, yTotal] = size;
  const strArray: string[] = [];
  for (let y = 0; y < yTotal; y++) {
    strArray.push("----".repeat(xTotal));
    let line = "|";
    for (let x = 0; x < xTotal; x++) {
      const index = getIndex(x, y, size);
      const text = cells[index].isMine
        ? " x "
        : ` ${cells[index].neighborMineCount} `;
      line += text + "|";
    }
    strArray.push(line);
  }
  strArray.push("----".repeat(xTotal));
  console.log(strArray.join("\n"));
}

export function flagNeighborNotMine(cell: SweeperCell, skipMine = true) {
  if (
    difference(cell.neighborIndexes, cell.parent.visitedIndexes).length === 0
  ) {
    return;
  }
  const neighborIndexes = cell.neighborIndexes;
  neighborIndexes.forEach((index) => {
    const current = cell.parent.cells[index];
    if (cell.parent.visitedIndexes.includes(index)) {
      return;
    }
    cell.parent.visitedIndexes.push(index);
    if (current.isMine && skipMine) {
      return;
    }
    current.flagNotMine(true);
  });
}

export function updateTime() {
  let timer: number | null = null;
  let dom: HTMLElement = document.querySelector("#sweeper-time");

  const startTime = dayjs().valueOf();

  const update = () => {
    const current = dayjs().valueOf();
    dom.innerText = dayjs(current - startTime).format("mm:ss:SSS");
    if (timer) {
      window.cancelAnimationFrame(timer);
    }
    timer = window.requestAnimationFrame(update);
  };
  update();

  return () => {
    dom = null;
    window.cancelAnimationFrame(timer);
  };
}
