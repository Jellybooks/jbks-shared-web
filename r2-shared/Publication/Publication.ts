import CoreCollection from "./CoreCollection";
import Manifest from "./Manifest";
import Metadata from "./Metadata";
import { Link, Links } from "./Link";

/** Shared model for a Readium Publication. */
export default class Publication {
  private manifest: Manifest;
  private fetcher: any | null = null; // tmp
  private services: any | null = null; // tmp

  // Aliases
  public metadata: Metadata = this.manifest.metadata;
  public links: Links = this.manifest.links;

  /** Identifies a list of resources in reading order for the publication. */
  public readingOrder: Links = this.manifest.readingOrder;

  /** Identifies resources that are necessary for rendering the publication. */
  public resources: Links = this.manifest.resources;

  /** Identifies the collection that contains a table of contents. */
  public tableOfContents: Links = this.manifest.tableOfContents;

  public subcollections: {[collection: string]: CoreCollection} = this.manifest.subcollections;

  constructor(manifest: Manifest, fetcher: any | null = null, services: any | null = null) {
    this.manifest = manifest;
    this.fetcher = fetcher;
    this.services = services;
  }

  /** The URL where this publication is served, computed from the `Link` with `self` relation.
   *  e.g. https://provider.com/pub1293/manifest.json gives https://provider.com/pub1293/
   */
  public baseURL(): string {
    const selfLink = this.manifest.links.find(el => el.rels.includes("self"));
    if (selfLink) {
      return selfLink.href;
    } else {
      return window.location.href;
    }
  };

  /** Finds the first Link having the given `href` in the publication's links. */
  public linkWithHref(href: string): Link | null {
    const find = (links: Array<Links>): Link | null => {
      let result = null;

      for (const collection of links) {
        result = collection.findWithHref(href);
        if (result !== null) {
          return result;
        }
      }

      const children: Array<Links> = links.flatMap(item => {
        let arr = [];
        for (const link of item) {
          if (link.alternates) {
            arr.push(link.alternates)
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

  /** Finds the first link with the given relation in the publication's links. */
  public linkWithRel(rel: string): Link | null {
    return this.manifest.linkWithRel(rel);
  }

  /** Finds all the links with the given relation in the publication's links. */
  public linksWithRel(rel: string): Array<Link> {
    return this.manifest.linksWithRel(rel);
  }
}