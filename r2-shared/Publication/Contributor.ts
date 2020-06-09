import { LocalizedString } from "./LocalizedString";

export interface IContributor {
  name: string | LocalizedString;
  sortAs?: string;
  identifier?: string;
  role?: string;
}