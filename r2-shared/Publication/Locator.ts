interface LocatorText {
  after?: string;
  before?: string;
  highlight?: string;
}

interface StartEndInfo {
  cssSelector: string;
  textNodeIndex: number;
  charOffset?: number;
}

interface DOMRangeInfo {
  start: StartEndInfo;
  end?: StartEndInfo;
}

interface Locations {
  fragments?: Array<string>;
  progression?: number;
  position?: number;
  totalProgression?: number;
  cssSelector?: string;
  partialCfi?: string;
  domRange?: DOMRangeInfo;
}

export interface Locator {
  href: string;
  type: string;
  title?: string;
  locations?: Locations;
  text?: LocatorText;
}