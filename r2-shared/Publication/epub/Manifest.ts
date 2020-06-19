// Note: should be implemented in other Collections

import Manifest from "../Manifest";
import { Link, Links } from "../Link";
import { EPUBLayout } from "./Layout";

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

  public layoutOf(link: Link): EPUBLayout {
    if (link.properties && link.properties.layout) {
      return link.properties.layout;
    } else if (this.metadata && this.metadata.presentation && this.metadata.presentation.layout) {
      return this.metadata.presentation.layout;
    } else {
      return EPUBLayout.reflowable;
    }
  }
}