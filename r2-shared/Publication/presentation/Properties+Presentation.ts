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
    value: function(): boolean {
      return Properties.prototype.otherProperties["clipped"] || false;
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  fit: {
    value: function(): Fit | null {
      return Properties.prototype.otherProperties["fit"] || null;
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  orientation: {
    value: function(): Orientation | null {
      return Properties.prototype.otherProperties["orientation"] || null;
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  overflow: {
    value: function(): Overflow | null {
      return Properties.prototype.otherProperties["overflow"] || null;
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  page: {
    value: function(): Page | null {
      return Properties.prototype.otherProperties["page"] || null;
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  spread: {
    value: function(): Spread | null {
      return Properties.prototype.otherProperties["spread"] || null;
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
})