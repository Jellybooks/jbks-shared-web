import { Link, Links } from "../Publication/Link";

export interface Fetcher {
  links: Links;
  get(link: Link): any; // Resource | null
  close(): any;
}