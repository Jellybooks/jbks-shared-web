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
    value: function(): Array<string> {
      return Properties.prototype.otherProperties["contains"] || [];
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  layout: {
    value: function(): EPUBLayout {
      return Properties.prototype.otherProperties["layout"] || null;
    },
    enumerable: true,
    configurable: false,
    writable: false
  }
})