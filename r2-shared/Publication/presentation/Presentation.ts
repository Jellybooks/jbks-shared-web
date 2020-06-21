import { EPUBLayout } from "../epub/Layout";
import { Link } from "../Link";
import Metadata from "../Metadata";

export type Orientation = "auto" | "landscape" | "portrait";
export type Overflow = "auto" | "clipped" | "paginated" | "scrolled";
export type Page = "left" | "right" | "center";
export type Spread = "auto" | "both" | "none" | "landscape";
export type Fit = "contain" | "cover" | "width" | "height";

interface IPresentation {
  clipped?: boolean;
  fit?: Fit;
  orientation?: Orientation;
  spread?: Spread;
  layout?: EPUBLayout;
}

export interface PresentationMetadata extends IPresentation {
  continuous?: boolean;
  overflow?: Overflow;
}

export interface PresentationProperties extends IPresentation {
  page?: Page;
}

/** The Presentation Hints extension defines a number of hints for User Agents about the way content
 *  should be presented to the user.
 * 
 *  https://readium.org/webpub-manifest/extensions/presentation.html
 *  https://readium.org/webpub-manifest/schema/extensions/presentation/metadata.schema.json
 * 
 *  These properties are nullable to avoid having default values when it doesn't make sense for a
 *  given `Publication`. If a navigator needs a default value when not specified,
 *  `Presentation.defaultX` and `Presentation.X.default` can be used.
 */
export default class Presentation implements PresentationMetadata {

  /** Specifies whether or not the parts of a linked resource that flow out of the viewport are clipped */
  public clipped?: boolean;

  /** Suggested method for constraining a resource inside the viewport. */
  public fit?: Fit;

  /** Suggested orientation for the device when displaying the linked resource. */
  public orientation?: Orientation;

  /** Indicates the condition to be met for the linked resource to be rendered 
   *  within a synthetic spread
   */
  public spread?: Spread;

  /** Hint about the nature of the layout for the linked resources (EPUB extension). */
  public layout?: EPUBLayout;

  /** Indicates how the progression between resources from the [readingOrder] should be handled */
  public continuous?: boolean;

  /** Indicates if the overflow of linked resources from the `readingOrder` or `resources` should
   *  be handled using dynamic pagination or scrolling.
   */
  public overflow?: Overflow;

  constructor(presentation: PresentationMetadata) {
    this.clipped = presentation.clipped;
    this.fit = presentation.fit;
    this.orientation = presentation.orientation;
    this.spread = presentation.spread;
    this.layout = presentation.layout;
    this.continuous = presentation.continuous;
    this.overflow = presentation.overflow;
  }

  /** Determines the layout of the given resource in this publication.
   *  Default layout is reflowable.
   */
  public layoutOf(link: Link): EPUBLayout {
    let result = EPUBLayout.reflowable;
    if (link.properties && link.properties.layout) {
      result = link.properties.layout;
    } else if (this.layout) {
      result = this.layout;
    }
    return result;
  }
}

declare module "../Metadata" {
  export interface Metadata {
    presentation: Presentation;
  }
}

Object.defineProperty(Metadata.prototype, "presentation", {
  get: function(): Presentation {
    return (Metadata.prototype.otherMetadata && Metadata.prototype.otherMetadata.json["presentation"])
    ? new Presentation(Metadata.prototype.otherMetadata.json["presentation"])
    : new Presentation({});
  },
  enumerable: true,
  configurable: false,
  writable: false
})