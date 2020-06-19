import Metadata from "./Metadata";
import { Link, Links } from "./Link";

export default class Manifest {
  public readonly context: Array<string>;
  public readonly metadata: Metadata;
  public readonly links: Links;
  public readonly readingOrder: Links;
  public readonly resources: Links;
  public readonly tableOfContents: Links;

  constructor(manifestJSON: any) {
    this.context = manifestJSON["@context"] || [];
    this.metadata = new Metadata(manifestJSON.metadata);
    this.links = manifestJSON.links ? new Links(manifestJSON.links) : new Links([]);
    this.readingOrder = manifestJSON.readingOrder ? new Links(manifestJSON.readingOrder) : new Links([]);
    this.resources = manifestJSON.resources ? new Links(manifestJSON.resources) : new Links([]);
    this.tableOfContents = manifestJSON.toc ? new Links(manifestJSON.toc) : new Links([]);
  }

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

  public linksWithRel(rel: string): Array<Link> {
    let result = [];
    result.push(this.readingOrder.filterByRel(rel), this.resources.filterByRel(rel), this.links.filterByRel(rel));
    return result.reduce((acc, val) => acc.concat(val), []);
  }
}