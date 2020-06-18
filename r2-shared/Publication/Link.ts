import MediaType from "../Format/MediaType";
import { Encrypted } from "./Encrypted";
import { PresentationProperties } from "./presentation/Presentation";
import { Properties } from "./epub/Properties";

/*  
    Keeping as ref list of values we know are currently used, per webpub doc:
    https://github.com/readium/webpub-manifest/blob/master/relationships.md
    type LinkRel = "alternate" | "contents" | "cover" | "manifest" | "search" | "self"; 
*/

interface LinkProperties extends PresentationProperties {
  contains?: Array<Properties>;
  encrypted?: Encrypted;
  mediaOverlay?: string;
}

export type LinkLike = {
  href: string;
  templated?: boolean;
  type?: string;
  title?: string;
  rel?: string;
  properties?: LinkProperties;
  height?: number;
  width?: number;
  duration?: number;
  bitrate?: number;
  language?: string;
  alternate?: Array<LinkLike>;
  children?: Array<LinkLike>;
}

export class Link implements LinkLike {
  public href: string;
  public templated?: boolean;
  public type?: string;
  public title?: string;
  public rel?: string;
  public properties?: LinkProperties;
  public height?: number;
  public width?: number;
  public duration?: number;
  public bitrate?: number;
  public language?: string;
  public alternate?: Links;
  public children?: Links;

  constructor(link: LinkLike) {
    this.href = link.href;
    this.templated = link.templated;
    this.type = link.type;
    this.title = link.title;
    this.rel = link.rel;
    this.properties = link.properties;
    this.height = link.height;
    this.width = link.width;
    this.duration = link.duration;
    this.bitrate = link.bitrate;
    this.language = link.language;
    this.alternate = link.alternate ? new Links(link.alternate) : new Links([]);
    this.children = link.children ? new Links(link.children) : new Links([]);
  }

  public urlRelativeTo(baseUrl: string): string {
    if (this.href.includes(baseUrl)) {
      return this.href;
    } else {
      return new URL(this.href, baseUrl).href;
    }
  }

  /*
  public templateParameters(): Set<string> {
    if (this.templated) {
      
    }
  }

  public expandTemplate(parameters: Array<string>): Link {
    if (this.templated) {
      
    }
    return this;
  } */
}

export class Links extends Array<Link> {
  constructor(items: Array<LinkLike> | number) {
    if (items instanceof Array) {
      super(...items.map(item => new Link(item)));
    } else {
      super(items);
    }
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public firstWithRel(rel: string): Link | null {
    const predicate = (el: Link) => el.rel === rel;
    return this.find(predicate) || null;
  }

  public filterByRel(rel: string): Array<Link> {
    const predicate = (el: Link) => el.rel === rel;
    return this.filter(predicate);
  }

  public firstWithHref(href: string): Link | null {
    const predicate = (el: Link) => el.href === href;
    return this.find(predicate) || null;
  }

  public indexOfFirstWithHref(href: string): number {
    const predicate = (el: Link) => el.href === href;
    return this.findIndex(predicate);
  }

  public firstWithMediaType(mediaType: string): Link | null {
    const predicate = (el: Link) => el.type ? new MediaType(el.type).matches(mediaType) : false;
    return this.find(predicate) || null;
  }

  public filterByMediaType(mediaType: string): Array<Link> {
    const predicate = (el: Link) => el.type ? new MediaType(el.type).matches(mediaType) : false;
    return this.filter(predicate);
  }

  public filterByMediaTypes(mediaTypes: Array<string>): Array<Link> {
    const predicate = (el: Link) => {
      for (const mediaType of mediaTypes) {
        return el.type ? new MediaType(el.type).matches(mediaType) : false;
      }
      return false;
    };
    return this.filter(predicate);
  }

  public allAreAudio(): boolean {
    const predicate = (el: Link) => el.type ? new MediaType(el.type).isAudio() : false;
    return this.every(predicate);
  }

  public allAreBitmap(): boolean {
    const predicate = (el: Link) => el.type ? new MediaType(el.type).isBitmap() : false;
    return this.every(predicate);
  }

  public allAreHTML(): boolean {
    const predicate = (el: Link) => el.type ? new MediaType(el.type).isHTML() : false;
    return this.every(predicate);
  }

  public allAreVideo(): boolean {
    const predicate = (el: Link) => el.type ? new MediaType(el.type).isVideo() : false;
    return this.every(predicate);
  }

  public allMatchMediaType(mediaTypes: string | Array<string>): boolean {
    if (Array.isArray(mediaTypes)) {
      return this.every((el: Link) => {
        for (const mediaType of mediaTypes) {
          return el.type ? new MediaType(el.type).matches(mediaType) : false;
        }
        return false;
      });
    } else {
      return this.every((el: Link) => el.type ? new MediaType(el.type).matches(mediaTypes) : false);
    }
  }
}