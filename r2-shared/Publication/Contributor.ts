import { LinkLike } from "./Link";
import { LocalizedString } from "./LocalizedString";

export interface IContributor {
  name: string | LocalizedString;
  sortAs?: string;
  identifier?: string;
  role?: string;
  links?: Array<LinkLike>;
}