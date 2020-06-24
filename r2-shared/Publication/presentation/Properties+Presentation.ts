import { Fit, Orientation, Spread, Overflow, Page } from "./Presentation";
import { Properties } from "../Properties";

declare module "../Properties" {
  export interface Properties {
    clipped: boolean;
    fit: Fit | null;
    orientation: Orientation | null;
    overflow: Overflow | null;
    page: Page | null;
    spread: Spread | null;
  }
}

Object.defineProperties(Properties.prototype, {
  clipped: {
    get: function(): boolean {
      return Properties.prototype.otherProperties["clipped"] || false;
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  fit: {
    get: function(): Fit | null {
      return Properties.prototype.otherProperties["fit"] || null;
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  orientation: {
    get: function(): Orientation | null {
      return Properties.prototype.otherProperties["orientation"] || null;
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  overflow: {
    get: function(): Overflow | null {
      return Properties.prototype.otherProperties["overflow"] || null;
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  page: {
    get: function(): Page | null {
      return Properties.prototype.otherProperties["page"] || null;
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  spread: {
    get: function(): Spread | null {
      return Properties.prototype.otherProperties["spread"] || null;
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
})