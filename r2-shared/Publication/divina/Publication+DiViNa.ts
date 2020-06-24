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
    guided: Links;
  }
}

Object.defineProperty(Publication.prototype, "guided", {
  get: function() {
    return findValue(Publication.prototype.subcollections, "guided") || new Links([]);
  },
  enumerable: true,
  configurable: false,
  writable: false
})