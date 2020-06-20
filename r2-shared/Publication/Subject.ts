import { LinkLike } from "./Link";
import { LocalizedString } from "./LocalizedString";

/** https://github.com/readium/webpub-manifest/tree/master/contexts/default#subjects */
export interface Subject {
  name: string | LocalizedString;
  sortAs?: string;
  code?: string;
  scheme?: string;
  links?: Array<LinkLike>;
}