import MediaType from "./MediaType";

export interface IFormat {
  name: string;
  mediaType: MediaType;
  fileExtension: string;
}

export default class Format implements IFormat {
  public name: string;
  public mediaType: MediaType;
  public fileExtension: string;

  constructor(format: IFormat) {
    this.name = format.name;
    this.mediaType = format.mediaType;
    this.fileExtension = format.fileExtension;
  };

  public static audiobookManifest(): Format {
    return new this({
      name: "Audiobook",
      mediaType: MediaType.audiobookManifest(),
      fileExtension: "json"
    });
  }

  public static bmp(): Format {
    return new this({
      name: "BMP",
      mediaType: MediaType.bmp(),
      fileExtension: "bmp"
    })
  }

  public static divinaManifest(): Format {
    return new this({
      name: "Digital Visual Narratives",
      mediaType: MediaType.divinaManifest(),
      fileExtension: "json"
    });
  }

  public static gif(): Format {
    return new this({
      name: "GIF",
      mediaType: MediaType.gif(),
      fileExtension: "gif"
    });
  }

  public static html(): Format {
    return new this({
      name: "HTML",
      mediaType: MediaType.html(),
      fileExtension: "html"
    });
  }

  public static jpeg(): Format {
    return new this({
      name: "JPEG",
      mediaType: MediaType.jpeg(),
      fileExtension: "jpg"
    });
  }

  public static pdf(): Format {
    return new this({
      name: "PDF",
      mediaType: MediaType.pdf(),
      fileExtension: "pdf"
    });
  }

  public static png(): Format {
    return new this({
      name: "PNG",
      mediaType: MediaType.png(),
      fileExtension: "png"
    });
  }

  public static tiff(): Format {
    return new this({
      name: "TIFF",
      mediaType: MediaType.tiff(),
      fileExtension: "tiff"
    });
  }

  public static webp(): Format {
    return new this({
      name: "WEBP",
      mediaType: MediaType.webp(),
      fileExtension: "webp"
    });
  }

  public static webpub(): Format {
    return new this({
      name: "Web Publication",
      mediaType: MediaType.webpubManifest(),
      fileExtension: "json"
    });
  }
}