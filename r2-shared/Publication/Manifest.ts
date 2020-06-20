import Metadata from "./Metadata";
import { Link, Links } from "./Link";

/** Holds the metadata of a Readium publication, as described in 
 *  the Readium Web Publication Manifest.
 *  See. https://readium.org/webpub-manifest/
 */
export default class Manifest {
  public readonly context: Array<string>;
  public readonly metadata: Metadata;
  public readonly links: Links;

  /** Identifies a list of resources in reading order for the publication. */
  public readonly readingOrder: Links;

  /** Identifies resources that are necessary for rendering the publication. */
  public readonly resources: Links;

  /** Identifies the collection that contains a table of contents. */
  public readonly tableOfContents: Links;

  /* public readonly subcollections */

  constructor(manifestJSON: any) {
    this.context = manifestJSON["@context"] || [];
    this.metadata = new Metadata(manifestJSON.metadata);
    this.links = manifestJSON.links ? new Links(manifestJSON.links) : new Links([]);
    this.readingOrder = manifestJSON.readingOrder ? new Links(manifestJSON.readingOrder) : new Links([]);
    this.resources = manifestJSON.resources ? new Links(manifestJSON.resources) : new Links([]);
    this.tableOfContents = manifestJSON.toc ? new Links(manifestJSON.toc) : new Links([]);
  }

  /** Finds the first link with the given relation in the manifest's links. */
  public linkWithRel(rel: string): Link | null {
    const links: Array<Links> = [this.readingOrder, this.resources, this.links];
    let result = null;

    for (const collection of links) {
      result = collection.findWithRel(rel);
      if (result !== null) {
        return result;
      }
    }

    return result;
  }

  /** Finds all the links with the given relation in the manifest's links. */
  public linksWithRel(rel: string): Array<Link> {
    let result = [];
    result.push(this.readingOrder.filterByRel(rel), this.resources.filterByRel(rel), this.links.filterByRel(rel));
    return result.reduce((acc, val) => acc.concat(val), []);
  }
}