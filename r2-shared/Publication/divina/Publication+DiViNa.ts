import { Publication } from "../Publication";
import { findValue } from "../../util/FindValue";
import { Links } from "../Link";

/** DiViNa Web Publication Extension 
 *  https://readium.org/webpub-manifest/schema/extensions/epub/subcollections.schema.json
 */
declare module "../Publication" {
  export interface Publication {

    /** Provides navigation to positions in the Publication content that correspond to the locations
     *  of page boundaries present in a print source being represented by this EPUB Publication.
     */
    getGuided: () => Links;
  }
}

Publication.prototype.getGuided = function() {
  return findValue(this.subcollections, "guided") || new Links([]);
}