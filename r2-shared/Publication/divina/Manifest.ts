// Note: should be implemented in other collections

import Manifest from "../Manifest";
import { Links } from "../Link";

export default class DivinaManifest extends Manifest {
  public readonly guided?: Links;

  constructor(manifestJSON: any) {
    super(
      manifestJSON
    )
    this.guided = manifestJSON.guided ? new Links(manifestJSON.guided) : new Links([]);
  }
}