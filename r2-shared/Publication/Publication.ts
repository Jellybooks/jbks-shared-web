import Format from "../Format/Format";
import Metadata from "./Metadata";
import PublicationManifest from "./PublicationManifest";
import { Link, Links } from "./Link";

export default class Publication {
  public manifest: PublicationManifest;
  public fetcher: any | null = null; // tmp
  public services: any | null = null; // tmp
  public format: Format | null = null;
  public formatVersion: string | null = null;

  // Aliases
  public context: Array<string> = this.manifest.context;
  public metadata: Metadata = this.manifest.metadata;
  public links: Links = this.manifest.links;
  public readingOrder: Links = this.manifest.readingOrder;
  public resources: Links = this.manifest.resources;
  public tableOfContents: Links = this.manifest.tableOfContents;

  constructor(manifest: PublicationManifest, fetcher: any | null = null, services: any | null = null, format: Format | null = null, formatVersion: string | null = null) {
    this.manifest = manifest;
    this.fetcher = fetcher;
    this.services = services;
    this.format = format;
    this.formatVersion = formatVersion;
  }

  public baseURL(): string {
    if (this.manifest.manifestUrl) {
      return this.manifest.manifestUrl.split("manifest.json")[0];
    } else {
      const selfLink = this.manifest.links.find(el => el.rel === "self");
      if (selfLink) {
        return selfLink.href;
      } else {
        return window.location.href;
      }
    }
  };

  public linkWithHref(href: string): Link | null {
    const find = (links: Array<Links>): Link | null => {
      let result = null;

      for (const collection of links) {
        result = collection.firstWithHref(href);
        if (result !== null) {
          return result;
        }
      }

      const children: Array<Links> = links.flatMap(item => {
        let arr = [];
        for (const link of item) {
          if (link.alternate) {
            arr.push(link.alternate)
          }
          if (link.children) {
            arr.push(link.children)
          }
        }
        return arr;
      });

      find(children);

      return result;
    }

    const links: Array<Links> = [this.manifest.readingOrder, this.manifest.resources, this.manifest.links];
    
    const link = find(links);

    if (link !== null) {
      return link;
    }

    const shortHref = href.split(/[#\?]/)[0];

    this.linkWithHref(shortHref);

    return link;
  }

  public linkWithRel(rel: string): Link | null {
    return this.manifest.linkWithRel(rel);
  }

  public linksWithRel(rel: string): Array<Link> {
    return this.manifest.linksWithRel(rel);
  }
}