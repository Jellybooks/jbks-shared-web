/* Copyright 2020 Readium Foundation. All rights reserved.
 * Use of this source code is governed by a BSD-style license,
 * available in the LICENSE file present in the Github repository of the project.
 */

import { Link, Links } from "../Publication/Link";

export interface IFetcher {
  links: Links;
  get(link: Link): any; // Resource | null
  close(): any;
}