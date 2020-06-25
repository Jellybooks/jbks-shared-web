import { Metadata } from "../Metadata";
import { Presentation } from "./Presentation";

declare module "../Metadata" {
  export interface Metadata {
    presentation: Presentation;
  }
}

Object.defineProperty(Metadata.prototype, "presentation", {
  value: function(): Presentation {
    return (Metadata.prototype.otherMetadata && Metadata.prototype.otherMetadata.json["presentation"])
    ? new Presentation(Metadata.prototype.otherMetadata.json["presentation"])
    : new Presentation({});
  },
  enumerable: true,
  configurable: false,
  writable: false
})