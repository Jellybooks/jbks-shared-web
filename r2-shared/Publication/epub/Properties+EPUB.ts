import { Properties } from "../Properties";
import { EPUBLayout } from "./Layout";

declare module "../Properties" {
  export interface Properties {
    getContains: () => Array<string>;
    getLayout: () => EPUBLayout | null;
  }
}

Properties.prototype.getContains = function() {
  return this.otherProperties["contains"] || [];
}

Properties.prototype.getLayout = function() {
  return this.otherProperties["layout"] || null
}