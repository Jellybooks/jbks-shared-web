import Metadata from "./Metadata";
import Store from "../Store/Store";
import { Link, Links } from "./Link";

export default class PublicationManifest {
  public readonly context: Array<string>;
  public readonly metadata: Metadata;
  public readonly links: Links;
  public readonly readingOrder: Links;
  public readonly resources: Links;
  public readonly tableOfContents: Links;

  public readonly manifestUrl?: URL;

  constructor(manifestJSON: any, manifestUrl?: URL) {
    this.context = manifestJSON["@context"] || [];
    this.metadata = new Metadata(manifestJSON.metadata);
    this.links = manifestJSON.links ? new Links(manifestJSON.links) : new Links([]);
    this.readingOrder = manifestJSON.readingOrder ? new Links(manifestJSON.readingOrder) : new Links([]);
    this.resources = manifestJSON.resources ? new Links(manifestJSON.resources) : new Links([]);
    this.tableOfContents = manifestJSON.toc ? new Links(manifestJSON.toc) : new Links([]);

    this.manifestUrl = manifestUrl;
  }

  // Getting Manifest

  public static async getManifest(manifestUrl: URL, store?: Store): Promise<PublicationManifest> {
    const fetchManifest = async (): Promise<PublicationManifest> => {
      const response = await window.fetch(manifestUrl.href, {
        credentials: "same-origin"
      })
      const manifestJSON = await response.json();
      if (store) {
        await store.set("manifest", JSON.stringify(manifestJSON));
      }
      return new PublicationManifest(manifestJSON, manifestUrl);
    };

    const tryToUpdateManifestButIgnoreResult = async (): Promise<void> => {
      try {
        await fetchManifest();
      } catch (err) {
        // Ignore errors.
      }
      return new Promise<void>(resolve => resolve());
    }

    // Respond immediately with the manifest from the store, if possible.
    if (store) {
      const manifestString = await store.get("manifest");
      if (manifestString) {
        // Kick off a fetch to update the store for next time,
        // but don't await it.
        tryToUpdateManifestButIgnoreResult();
        const manifestJSON = JSON.parse(manifestString);
        return new PublicationManifest(manifestJSON, manifestUrl);
      }
    }

    return fetchManifest();
  }

  // Getting readingOrder items

  public getCoverLink(): Link | null {
    return this.linkWithRel("cover");
  }

  public getStartLink(): Link | null {
    if (this.readingOrder.length > 0) {
      return this.readingOrder[0];
    }
    return null;
  }

  public getPreviousSpineItem(href: string): Link | null {
    const index = this.getSpineIndex(href);
    if (index !== null && index > 0) {
      return this.readingOrder[index - 1];
    }
    return null;
  }

  public getNextSpineItem(href: string): Link | null {
    const index = this.getSpineIndex(href);
    if (index !== null && index < (this.readingOrder.length - 1)) {
      return this.readingOrder[index + 1];
    }
    return null;
  }

  public getSpineItem(href: string): Link | null {
    const index = this.getSpineIndex(href);
    if (index !== null) {
      return this.readingOrder[index];
    }
    return null;
  }

  public getSpineIndex(href: string): number | null {
    for (let index = 0; index < this.readingOrder.length; index++) {
      const item = this.readingOrder[index];
      if (item.href) {
        const itemUrl = new URL(item.href, this.manifestUrl.href).href;
        if (itemUrl === href) {
          return index;
        }
      }
    }
    return null;
  }

  public getAbsoluteHref(href: string): string | null {
    return new URL(href, this.manifestUrl.href).href;
  }

  public getRelativeHref(href: string): string | null {
    const manifest = this.manifestUrl.href.replace("/manifest.json", ""); //new URL(this.manifestUrl.href, this.manifestUrl.href).href;
    return href.replace(manifest, "");
  }

  // Getting toc items

  public getTOCItemAbsolute(href: string): Link | null {
    const absolute = this.getAbsoluteHref(href)
    const findItem = (href: string, links: Array<Link>): Link | null => {
      for (let index = 0; index < links.length; index++) {
        const item = links[index];
        if (item.href) {
          const hrefAbsolutre = (item.href.indexOf("#") !== -1) ? item.href.slice(0, item.href.indexOf("#")) : item.href
          const itemUrl = new URL(hrefAbsolutre, this.manifestUrl.href).href;
          if (itemUrl === href) {
            return item;
          }
        }
        if (item.children) {
          const childItem = findItem(href, item.children);
          if (childItem !== null) {
            return childItem;
          }
        }
      }
      return null;
    }
    let link = findItem(absolute, this.tableOfContents);
    if (link === null) {
      link = findItem(absolute, this.readingOrder);
    }
    return link
  }

  public getTOCItem(href: string): Link | null {
    const findItem = (href: string, links: Array<Link>): Link | null => {
      for (let index = 0; index < links.length; index++) {
        const item = links[index];
        if (item.href) {
          const itemUrl = new URL(item.href, this.manifestUrl.href).href;
          if (itemUrl === href) {
            return item;
          }
        }
        if (item.children) {
          const childItem = findItem(href, item.children);
          if (childItem !== null) {
            return childItem;
          }
        }
      }
      return null;
    }
    return findItem(href, this.tableOfContents);
  }

  // Helpers

  public linkWithRel(rel: string): Link | null {
    const links: Array<Links> = [this.readingOrder, this.resources, this.links];
    let result = null;

    for (const collection of links) {
      result = collection.firstWithRel(rel);
      if (result !== null) {
        return result;
      }
    }

    return result;
  }

  public linksWithRel(rel: string): Array<Link> {
    let result = [];
    result.push(this.readingOrder.filterByRel(rel), this.resources.filterByRel(rel), this.links.filterByRel(rel));
    return result.reduce((acc, val) => acc.concat(val), []);
  }
}