import Manifest from "../Manifest";
import { Links } from "../Link";

export default class DivinaManifest extends Manifest {
  public readonly guided?: Links;

  constructor(manifestJSON: any, manifestUrl: URL) {
    super(
      manifestJSON,
      manifestUrl
    )
    this.guided = manifestJSON.guided ? new Links(manifestJSON.guided) : new Links([]);
  }
}