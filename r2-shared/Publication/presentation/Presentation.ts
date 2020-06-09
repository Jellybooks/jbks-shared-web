import { EPUBLayout } from "../epub/Layout";
import { Link } from "../Link";

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

export default class Presentation implements PresentationMetadata {
  public clipped?: boolean;
  public fit?: Fit;
  public orientation?: Orientation;
  public spread?: Spread;
  public layout?: EPUBLayout;
  public continuous?: boolean;
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