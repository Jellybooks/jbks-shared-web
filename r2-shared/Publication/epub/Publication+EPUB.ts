import Publication from "../Publication";
import { findValue } from "../../util/FindValue";
import { Links } from "../Link";

/** EPUB Web Publication Extension 
 *  https://readium.org/webpub-manifest/schema/extensions/epub/subcollections.schema.json
 */
declare module "../Publication" {
  export interface Publication {

    /** Provides navigation to positions in the Publication content that correspond to the locations
     *  of page boundaries present in a print source being represented by this EPUB Publication.
     */
    pageList: Links;

    /** Identifies fundamental structural components of the publication in order to enable Reading
     *  Systems to provide the User efficient access to them.
     */
    landmarks: Links;

    listOfAudioClips: Links;
    listOfIllustrations: Links;
    listOfTables: Links;
    listOfVideoClips: Links;
  }
}

Object.defineProperties(Publication.prototype, {
  pageList: {
    get: function() {
      return findValue(Publication.prototype.subcollections, "pageList") || new Links([]);
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  landmarks: {
    get: function() {
      return findValue(Publication.prototype.subcollections, "landmarks") || new Links([]);
    },
    enumerable: true,
    configurable: false,
    writable: false
  }, 
  listOfAudioClips: {
    get: function() {
      return findValue(Publication.prototype.subcollections, "loa") || new Links([]);
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  listOfIllustrations: {
    get: function() {
      return findValue(Publication.prototype.subcollections, "loi") || new Links([]);
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  listOfTables: {
    get: function() {
      return findValue(Publication.prototype.subcollections, "lot") || new Links([]);
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  listOfVideoClips: {
    get: function() {
      return findValue(Publication.prototype.subcollections, "lov") || new Links([]);
    },
    enumerable: true,
    configurable: false,
    writable: false
  }
})