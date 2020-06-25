import { Metadata } from "../Metadata";
import { Presentation } from "./Presentation";

declare module "../Metadata" {
  export interface Metadata {
    getPresentation: () => Presentation;
  }
}

Metadata.prototype.getPresentation = function () {
  return (this.otherMetadata && this.otherMetadata.json["presentation"])
    ? new Presentation(this.otherMetadata.json["presentation"])
    : new Presentation({});
}