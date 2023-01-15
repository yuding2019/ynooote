import { isString, throttle } from "lodash";
import { CanvasBaseNode } from "./node";
import { getIdFromRGB } from "./util";

export interface CanvasPlatformConfig {
  container?: HTMLElement | string;
  enableDoubleBuffer?: boolean;
  width?: number;
  height?: number;
}

const MAX_RANDOM = 16777215;

export class CanvasPlatform {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private offscreenCanvas: HTMLCanvasElement;
  private offscreenCtx: CanvasRenderingContext2D;

  private container: HTMLElement;
  private config: CanvasPlatformConfig;

  private isNodeAppending = false;
  private __uniqId = 1;
  private activeNodeIds: number[] = [];

  width = 0;
  height = 0;
  dpr = window.devicePixelRatio;
  nodeMap: Map<string | number, CanvasBaseNode> = new Map();

  constructor(config?: CanvasPlatformConfig) {
    this.config = {
      enableDoubleBuffer: false,
      ...config,
    };

    this.initCanvas();
    this.initListener();
  }

  private initCanvas() {
    const { config } = this;
    let container: HTMLElement = isString(config.container)
      ? document.querySelector(config.container)
      : config.container;
    container = container || document.body;
    const { width: containerW, height: containerH } =
      container.getBoundingClientRect();

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = config.width ?? containerW;
    const height = config.height ?? containerH;

    canvas.width = width * this.dpr;
    canvas.height = height * this.dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(this.dpr, this.dpr);

    this.canvas = canvas;
    this.ctx = ctx;
    this.container = container;

    this.offscreenCanvas = canvas.cloneNode() as HTMLCanvasElement;
    const offscreenCtx = this.offscreenCanvas.getContext('2d');
    offscreenCtx.scale(this.dpr, this.dpr);
    this.offscreenCtx = offscreenCtx;

    container.appendChild(canvas);
    container.appendChild(this.offscreenCanvas);
  }

  private initListener() {
    if (!this.canvas) {
      return;
    }
    const handleMouseMove = throttle((e: MouseEvent) => {
      const { offsetX, offsetY } = e;
    }, 100);

    this.canvas.addEventListener('mousemove', handleMouseMove);
  }

  id() {
    const id = this.__uniqId;
    this.__uniqId++;


    return Number(~~(Math.random() * MAX_RANDOM)) + id;
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const nodes = [...this.nodeMap.values()];
    nodes.forEach((node, index) => {
      if (node.isTop() || node.isBottom()) {
        return;
      }
      node.setZIndex(node.zIndex ?? index);
    });
    nodes.sort((n1, n2) => {
      if (n1.isBottom()) {
        return -1;
      }
      if (n1.isTop()) {
        return 1;
      }
      return <number>n1.zIndex - <number>n2.zIndex;
    });
    nodes.forEach((n) => {
      n.render(this.ctx);
    });
  }

  appendNode(node: CanvasBaseNode) {
    this.nodeMap.set(node.id, node);
    this.render();
  }

  release() {
    try {
      this.container.removeChild(this.canvas);
      this.nodeMap.clear();
    } finally {
      this.ctx = null;
      this.canvas = null;
      this.offscreenCtx = null;
      this.offscreenCanvas = null;
      this.config = null;
      this.nodeMap = null;
      this.container = null;
    }
  }
}
