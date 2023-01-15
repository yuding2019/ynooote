import { CANVAS_NODE_Z_INDEX } from "./constant";
import { CanvasNodeZIndex } from "./type";
import { getHexFromId } from "./util";

export interface CanvasBaseNodeConfig {
  id: number;
  zIndex?: CanvasNodeZIndex;
  lineColor?: string;
  fillColor?: string;
}

export class CanvasBaseNode<
  Config extends CanvasBaseNodeConfig = CanvasBaseNodeConfig
> {
  protected idToHex: string;
  protected active = false;
  
  id: number;
  zIndex: CanvasNodeZIndex;

  render(ctx: CanvasRenderingContext2D) {}

  constructor(config: Config) {
    this.id = config.id;
    this.zIndex = config.zIndex;
    this.idToHex = getHexFromId(this.id);
  }

  setZIndex(zIndex: CanvasNodeZIndex) {
    this.zIndex = zIndex;
  }

  toTop() {
    this.setZIndex(CANVAS_NODE_Z_INDEX.TOP);
  }

  toBottom() {
    this.setZIndex(CANVAS_NODE_Z_INDEX.BOTTOM);
  }

  toggle() {
    this.active = !this.active;
  }

  isTop() {
    return this.zIndex === CANVAS_NODE_Z_INDEX.TOP;
  }

  isBottom() {
    return this.zIndex === CANVAS_NODE_Z_INDEX.BOTTOM;
  }

  isActive() {
    return this.active;
  }
}
