import { Properties } from "../Properties";
import { Encryption } from "./Encryption";

declare module "../Properties" {
  export interface Properties {
    getEncryption: () => Encryption | null;
  }
}

Properties.prototype.getEncryption = function() {
  return this.otherProperties["encryption"] || null;
}