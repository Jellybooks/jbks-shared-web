import { Properties } from "../Properties";
import { EPUBLayout } from "./Layout";

declare module "../Properties" {
  export interface Properties {
    contains: Array<string>;
    layout: EPUBLayout | null;
  }
}

Object.defineProperties(Properties.prototype, {
  contains: {
    get: function(): Array<string> {
      return Properties.prototype.otherProperties["contains"] || [];
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  layout: {
    get: function(): EPUBLayout {
      return Properties.prototype.otherProperties["layout"] || null;
    },
    enumerable: true,
    configurable: false,
    writable: false
  }
})