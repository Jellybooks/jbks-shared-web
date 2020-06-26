import { Link, Links } from "../Publication/Link";

export interface IFetcher {
  links: Links;
  get(link: Link): any; // Resource | null
  close(): any;
}