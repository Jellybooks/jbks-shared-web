import MediaType from "../Format/MediaType";
import { Encryption } from "./Encryption";
import { PresentationProperties } from "./presentation/Presentation";
import { Properties } from "./epub/Properties";

/*  
    Keeping as ref list of values we know are currently used, per webpub doc:
    https://github.com/readium/webpub-manifest/blob/master/relationships.md
    type LinkRel = "alternate" | "contents" | "cover" | "manifest" | "search" | "self"; 
*/

interface LinkProperties extends PresentationProperties {
  contains?: Array<Properties>;
  encrypted?: Encryption;
  mediaOverlay?: string;
}

export type LinkLike = {
  href: string;
  templated?: boolean;
  type?: string;
  title?: string;
  rel?: Array<string>;
  properties?: LinkProperties;
  height?: number;
  width?: number;
  duration?: number;
  bitrate?: number;
  language?: Array<string>;
  alternate?: Array<LinkLike>;
  children?: Array<LinkLike>;
}

export class Link implements LinkLike {
  public href: string;
  public templated?: boolean;
  public type?: string;
  public title?: string;
  public rels?: Array<string>;
  public properties?: LinkProperties;
  public height?: number;
  public width?: number;
  public duration?: number;
  public bitrate?: number;
  public languages?: Array<string>;
  public alternates?: Links;
  public children?: Links;
  public mediaType?: MediaType;

  constructor(link: LinkLike) {
    this.href = link.href;
    this.templated = link.templated;
    this.type = link.type;
    this.title = link.title;
    this.rels = link.rel;
    this.properties = link.properties;
    this.height = link.height;
    this.width = link.width;
    this.duration = link.duration;
    this.bitrate = link.bitrate;
    this.languages = link.language;
    this.alternates = link.alternate ? new Links(link.alternate) : new Links([]);
    this.children = link.children ? new Links(link.children) : new Links([]);
    this.mediaType = link.type ? new MediaType(link.type) : undefined;
  }

  public toAbsoluteHREF(baseUrl: string): string {
    return new URL(this.href, baseUrl).href;
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

  public findWithRel(rel: string): Link | null {
    const predicate = (el: Link) => el.rels.includes(rel);
    return this.find(predicate) || null;
  }

  public filterByRel(rel: string): Array<Link> {
    const predicate = (el: Link) => el.rels.includes(rel);
    return this.filter(predicate);
  }

  public findWithHref(href: string): Link | null {
    const predicate = (el: Link) => el.href === href;
    return this.find(predicate) || null;
  }

  public findIndexWithHref(href: string): number {
    const predicate = (el: Link) => el.href === href;
    return this.findIndex(predicate);
  }

  public findWithMediaType(mediaType: string): Link | null {
    const predicate = (el: Link) => el.mediaType ? el.mediaType.matches(mediaType) : false;
    return this.find(predicate) || null;
  }

  public filterByMediaType(mediaType: string): Array<Link> {
    const predicate = (el: Link) => el.mediaType ? el.mediaType.matches(mediaType) : false;
    return this.filter(predicate);
  }

  public filterByMediaTypes(mediaTypes: Array<string>): Array<Link> {
    const predicate = (el: Link) => {
      for (const mediaType of mediaTypes) {
        return el.mediaType ? el.mediaType.matches(mediaType) : false;
      }
      return false;
    };
    return this.filter(predicate);
  }

  public everyIsAudio(): boolean {
    const predicate = (el: Link) => el.mediaType ? el.mediaType.isAudio() : false;
    return this.every(predicate);
  }

  public everyIsBitmap(): boolean {
    const predicate = (el: Link) => el.mediaType ? el.mediaType.isBitmap() : false;
    return this.every(predicate);
  }

  public everyIsHTML(): boolean {
    const predicate = (el: Link) => el.mediaType ? el.mediaType.isHTML() : false;
    return this.every(predicate);
  }

  public everyIsVideo(): boolean {
    const predicate = (el: Link) => el.mediaType ? el.mediaType.isVideo() : false;
    return this.every(predicate);
  }

  public everyMatchesMediaType(mediaTypes: string | Array<string>): boolean {
    if (Array.isArray(mediaTypes)) {
      return this.every((el: Link) => {
        for (const mediaType of mediaTypes) {
          return el.mediaType ? el.mediaType.matches(mediaType) : false;
        }
        return false;
      });
    } else {
      return this.every((el: Link) => el.mediaType ? el.mediaType.matches(mediaTypes) : false);
    }
  }
}