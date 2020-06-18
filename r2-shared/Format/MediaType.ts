// Note: Not on par with Swift/Kotlin, specifically params

type ParametersMap = {
  [param: string]: string
}

export default class MediaType {
  public type: string;
  public subtype: string;
  public string: string;
  public encoding?: string;
  public parameters: ParametersMap;

  constructor(mediaType: string) {
    const components = mediaType.replace(/\s/g, "").split(";");
    const types = components[0].split("/");
    if (types.length === 2) {
      this.type = types[0].toLowerCase();
      this.subtype = types[1].toLowerCase();
    }

    let parameters: ParametersMap = {};
    for (let i = 1; i < components.length; i++) {
      const component = components[i].split("=");
      if (component.length === 2) {
        const key = component[0];
        const value = component[1];
        parameters[key] = value;
      }
    }
    this.parameters = parameters;

    let parametersString: string = "";
    for (const p in parameters) {
      const value = parameters[p];
      parametersString += `;${p}=${value}`;
    }
    this.string = `${this.type}/${this.subtype}${parametersString}`;

    this.encoding = parameters["encoding"];
  }

  public structuredSyntaxSuffix(): string | null {
    const parts = this.subtype.split("+");
    return parts.length > 1 ? `+${parts[parts.length - 1]}` : null;
  }

  public contains(other: MediaType | string): boolean {
    if (typeof other === "string" || other instanceof String) {
      other = new MediaType(other as string);
    }
    if (
      (this.type === "*" || this.type === other.type) &&
      (this.subtype === "*" || this.subtype === other.subtype)
    ) {
      return true;
    }
    return false;
  }

  public matches(other: MediaType | string): boolean {
    if (typeof other === "string" || other instanceof String) {
      other = new MediaType(other as string);
    }
    return this.contains(other) || other.contains(this);
  }

  public isJSON(): boolean {
    return this.matches(MediaType.json())
      || this.structuredSyntaxSuffix() === "+json";
  }

  public isOPDS(): boolean {
    return this.matches(MediaType.opds1())
      || this.matches(MediaType.opds1Entry())
      || this.matches(MediaType.opds2())
      || this.matches(MediaType.opds2Publication())
      || this.matches(MediaType.opdsAuthentication());
  }

  public isAudio(): boolean {
    return this.type === "audio";
  }

  public isBitmap(): boolean {
    return this.matches(MediaType.bmp())
      || this.matches(MediaType.gif())
      || this.matches(MediaType.jpeg())
      || this.matches(MediaType.png())
      || this.matches(MediaType.tiff())
      || this.matches(MediaType.webp());
  }

  public isHTML(): boolean {
    return this.matches(MediaType.html())
      || this.matches(MediaType.xhtml());
  }

  public isVideo(): boolean {
    return this.type === "video";
  }

  public isRWPM(): boolean {
    return this.matches(MediaType.audiobookManifest())
      || this.matches(MediaType.divinaManifest())
      || this.matches(MediaType.webpubManifest());
  }

  public static aac(): MediaType {
    return new this("audio/aac");
  }

  public static aiff(): MediaType {
    return new this("audio/aiff");
  }

  public static audiobookManifest(): MediaType {
    return new this("application/audiobook+json");
  }

  public static avi(): MediaType {
    return new this("video/x-msvideo");
  }

  public static binary(): MediaType {
    return new this("application/octet-stream");
  }

  public static bmp(): MediaType {
    return new this("image/bmp");
  }

  public static css(): MediaType {
    return new this("text/css");
  }

  public static divinaManifest(): MediaType {
    return new this("application/divina+json");
  }

  public static gif(): MediaType {
    return new this("image/gif");
  }

  public static javascript(): MediaType {
    return new this("text/javascript");
  }

  public static jpeg(): MediaType {
    return new this("image/jpeg");
  }

  public static html(): MediaType {
    return new this("text/html");
  }

  public static opds1(): MediaType {
    return new this("application/atom+xml;profile=opds-catalog");
  }

  public static opds1Entry(): MediaType {
    return new this("application/atom+xml;type=entry;profile=opds-catalog");
  }

  public static opds2(): MediaType {
    return new this("application/opds+json");
  }

  public static opds2Publication(): MediaType {
    return new this("application/opds-publication+json");
  }

  public static opdsAuthentication(): MediaType {
    return new this("application/opds-authentication+json");
  }

  public static json(): MediaType {
    return new this("application/json");
  }

  public static mp3(): MediaType {
    return new this("audio/mpeg");
  }

  public static mpeg(): MediaType {
    return new this("video/mpeg");
  }

  public static ncx(): MediaType {
    return new this("application/x-dtbncx+xml");
  }

  public static ogg(): MediaType {
    return new this("audio/ogg");
  }

  public static ogv(): MediaType {
    return new this("video/ogg");
  }

  public static opus(): MediaType {
    return new this("audio/opus");
  }

  public static otf(): MediaType {
    return new this("font/otf");
  }

  public static pdf(): MediaType {
    return new this("application/pdf");
  }

  public static png(): MediaType {
    return new this("image/png");
  }

  public static smil(): MediaType {
    return new this("application/smil+xml");
  }

  public static svg(): MediaType {
    return new this("image/svg+xml");
  }

  public static text(): MediaType {
    return new this("text/plain");
  }

  public static tiff(): MediaType {
    return new this("image/tiff");
  }

  public static ttf(): MediaType {
    return new this("font/ttf");
  }

  public static wav(): MediaType {
    return new this("audio/wav");
  }

  public static webmAudio(): MediaType {
    return new this("audio/webm");
  }

  public static webmVideo(): MediaType {
    return new this("video/webm");
  }

  public static webp(): MediaType {
    return new this("image/webp");
  }

  public static webpubManifest(): MediaType {
    return new this("application/webpub+json");
  }

  public static woff(): MediaType {
    return new this("font/woff");
  }

  public static woff2(): MediaType {
    return new this("font/woff2");
  }

  public static xhtml(): MediaType {
    return new this("application/xhtml+xml");
  }

  public static xml(): MediaType {
    return new this("application/xml");
  }
}