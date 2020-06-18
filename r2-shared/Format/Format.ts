import MediaType from "./MediaType";

type FormatLike = {
  name: string;
  mediaType: MediaType;
  fileExtension: string;
}

export default class Format implements FormatLike {
  public name: string;
  public mediaType: MediaType;
  public fileExtension: string;

  constructor(format: FormatLike) {
    this.name = format.name;
    this.mediaType = format.mediaType;
    this.fileExtension = format.fileExtension;
  };

  public static readiumAudiobookManifest(): Format {
    return new this({
      name: "Audiobook",
      mediaType: MediaType.readiumAudiobookManifest(),
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

  public static opds1Feed(): Format {
    return new this({
      name: "OPDS",
      mediaType: MediaType.opds1(),
      fileExtension: "atom"
    });
  }

  public static opds1Entry(): Format {
    return new this({
      name: "OPDS",
      mediaType: MediaType.opds1Entry(),
      fileExtension: "atom"
    });
  }

  public static opds2Feed(): Format {
    return new this({
      name: "OPDS",
      mediaType: MediaType.opds2(),
      fileExtension: "json"
    });
  }

  public static opds2Publication(): Format {
    return new this({
      name: "OPDS",
      mediaType: MediaType.opds2Publication(),
      fileExtension: "json"
    });
  }

  public static opdsAuthentication(): Format {
    return new this({
      name: "OPDS Authentication Document",
      mediaType: MediaType.opdsAuthentication(),
      fileExtension: "json"
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

  public static readiumWebPubManifest(): Format {
    return new this({
      name: "Web Publication",
      mediaType: MediaType.readiumWebPubManifest(),
      fileExtension: "json"
    });
  }
}