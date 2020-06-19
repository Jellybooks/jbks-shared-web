interface LocatorText {
  after?: string;
  before?: string;
  highlight?: string;
}

interface DOMRangePoint {
  cssSelector: string;
  textNodeIndex: number;
  charOffset?: number;
}

interface DOMRange {
  start: DOMRangePoint;
  end?: DOMRangePoint;
}

interface Locations {
  fragments: Array<string>;
  progression?: number;
  position?: number;
  totalProgression?: number;
  cssSelector?: string;
  partialCfi?: string;
  domRange?: DOMRange;
}

export interface Locator {
  href: string;
  type: string;
  title?: string;
  locations: Locations;
  text: LocatorText;
}