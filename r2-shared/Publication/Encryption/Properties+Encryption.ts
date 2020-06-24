import { Properties } from "../Properties";
import { Encryption } from "./Encryption";

declare module "../Properties" {
  export interface Properties {
    encryption: Encryption | null;
  }
}

Object.defineProperties(Properties.prototype, {
  encryption: {
    get: function(): Encryption | null {
      return Properties.prototype.otherProperties["encryption"] || null;
    },
    enumerable: true,
    configurable: false,
    writable: false
  }
})