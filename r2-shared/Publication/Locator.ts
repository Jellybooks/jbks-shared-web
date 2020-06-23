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

/** One or more alternative expressions of the location.
 *  https://github.com/readium/architecture/tree/master/models/locators#the-location-object
 */
interface Locations {
  /** Contains one or more fragment in the resource referenced by the `Locator`. */
  fragments: Array<string>;
  
  /** Progression in the resource expressed as a percentage (between 0 and 1). */
  progression?: number;
  
  /** Progression in the publication expressed as a percentage (between 0 and 1). */
  totalProgression?: number;

  /** An index in the publication. */
  position?: number;

  /** Additional locations for extensions. */
  otherLocations?: {[key: string]: any}

  /** otherLocators currently in use in Thorium/R2D2BC */
  cssSelector?: string;
  partialCfi?: string;
  domRange?: DOMRange;
}

/** https://github.com/readium/architecture/tree/master/locators */
export interface Locator {

  /** The URI of the resource that the Locator Object points to. */
  href: string;
  
  /** The media type of the resource that the Locator Object points to. */
  type: string;
  
  /** The title of the chapter or section which is more relevant in the context of this locator. */
  title?: string;
  
  /** One or more alternative expressions of the location. */
  locations: Locations;
  
  /** Textual context of the locator. */
  text: LocatorText;
}