import { Page } from "./presentation/Presentation";

export enum ReadingProgression { 
  auto = "auto", 
  btt = "btt", 
  ltr = "ltr", 
  rtl = "rtl", 
  ttb = "ttb"
}

// Note: Babel doesn’t really like that at all so disabling for the time being
// export namespace ReadingProgression {
  export function leadingPage(readingProgression: ReadingProgression): Page {
    switch(readingProgression) {
      case ReadingProgression.auto:
      case ReadingProgression.ttb:
      case ReadingProgression.ltr:
        return "left";
      case ReadingProgression.rtl:
      case ReadingProgression.btt:
        return "right";
      default:
        return "left";
    }
  }
// }