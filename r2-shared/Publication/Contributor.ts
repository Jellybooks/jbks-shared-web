import { LinkLike } from "./Link";
import { LocalizedString } from "./LocalizedString";

/** https://readium.org/webpub-manifest/schema/contributor-object.schema.json */
export interface Contributor {

  /** The name of the contributor. */
  name: string | LocalizedString;

  /** The string used to sort the name of the contributor. */
  sortAs?: string;

  /** An unambiguous reference to this contributor. */
  identifier?: string;

  /** The role of the contributor in the publication making. */
  role?: Array<string>;

  /** Used to retrieve similar publications for the given contributor. */
  links?: Array<LinkLike>;

  /** The position of the publication in this collection/series, when the contributor represents a collection. */
  position?: number;
}