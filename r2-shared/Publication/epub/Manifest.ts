// Note: should be implemented in other Collections

import Manifest from "../Manifest";
import { Links } from "../Link";

export default class EPUBManifest extends Manifest {
  public readonly pageList?: Links;
  public readonly landmarks?: Links;
  public readonly listOfAudioClips?: Links;
  public readonly listOfIllustrations?: Links;
  public readonly listOfTables?: Links;
  public readonly listOfVideoClips?: Links;

  constructor(manifestJSON: any) {
    super(
      manifestJSON
    )
    this.pageList = manifestJSON.pageList ? new Links(manifestJSON.pageList) : new Links([]);
    this.landmarks = manifestJSON.landmarks ? new Links(manifestJSON.landmarks) : new Links([]);
    this.listOfAudioClips = manifestJSON.loa ? new Links(manifestJSON.loa) : new Links([]);
    this.listOfIllustrations = manifestJSON.loi ? new Links(manifestJSON.loi) : new Links([]);
    this.listOfTables = manifestJSON.lot ? new Links(manifestJSON.lot) : new Links([]);
    this.listOfVideoClips = manifestJSON.lov ? new Links(manifestJSON.lov) : new Links([]);
  }
}