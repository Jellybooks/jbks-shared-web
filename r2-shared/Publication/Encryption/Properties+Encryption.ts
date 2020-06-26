import { Properties } from "../Properties";
import { IEncryption } from "./Encryption";

declare module "../Properties" {
  export interface Properties {
    getEncryption: () => IEncryption | null;
  }
}

Properties.prototype.getEncryption = function() {
  return this.otherProperties["encryption"] || null;
}