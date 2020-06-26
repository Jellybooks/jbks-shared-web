import { ILink } from "./Link";
import { ILocalizedString } from "./LocalizedString";

/** https://github.com/readium/webpub-manifest/tree/master/contexts/default#subjects */
export interface Subject {
  name: string | ILocalizedString;
  sortAs?: string;
  code?: string;
  scheme?: string;
  links?: Array<ILink>;
}