import { Contributor} from "./Contributor";
import { ISubject } from "./Subject";
import { LocalizedString } from "./LocalizedString";
import { ReadingProgression } from "./ReadingProgression";
import Presentation from "./presentation/Presentation";

interface Collection extends Contributor {
  position?: number;
}

type Subject = string | ISubject | Array<string | ISubject>;

export interface IMetadata {
  title: string | LocalizedString;
  "@type"?: string;
  identifier?: string;
  subtitle?: string | LocalizedString;
  artist?: Array<Contributor>;
  author?: Array<Contributor>;
  colorist?: Array<Contributor>;
  contributor?: Array<Contributor>;
  editor?: Array<Contributor>;
  illustrator?: Array<Contributor>;
  inker?: Array<Contributor>;
  letterer?: Array<Contributor>;
  narrator?: Array<Contributor>;
  penciler?: Array<Contributor>;
  translator?: Array<Contributor>;
  language?: Array<string>;
  description?: string;
  publisher?: Array<Contributor>;
  imprint?: Array<Contributor>;
  published?: string;
  modified?: string;
  subject?: Subject;
  belongsToCollection?: Array<Collection>;
  belongsToSeries?: Array<Collection>;
  readingProgression?: ReadingProgression;
  duration?: number;
  numberOfPages?: number;
  abridged?: boolean;
  presentation?: Presentation;
}

export default class Metadata implements IMetadata {
  public title: string | LocalizedString;
  public "@type"?: string;
  public identifier?: string;
  public subtitle?: string | LocalizedString;
  public artist?: Array<Contributor>;
  public author?: Array<Contributor>;
  public colorist?: Array<Contributor>;
  public contributor?: Array<Contributor>;
  public editor?: Array<Contributor>;
  public illustrator?: Array<Contributor>;
  public inker?: Array<Contributor>;
  public letterer?: Array<Contributor>;
  public narrator?: Array<Contributor>;
  public penciler?: Array<Contributor>;
  public translator?: Array<Contributor>;
  public languages: Array<string>;
  public description?: string;
  public publisher?: Array<Contributor>;
  public imprint?: Array<Contributor>;
  public published?: string;
  public modified?: string;
  public subject?: Subject;
  public belongsToCollection?: Array<Collection>;
  public belongsToSeries?: Array<Collection>;
  public readingProgression?: ReadingProgression;
  public duration?: number;
  public numberOfPages?: number;
  public abridged?: boolean;
  public presentation?: Presentation;

  private static readonly RTLLanguages = ["ar", "fa", "he", "zh-Hant", "zh-TW"];

  constructor(metadata: IMetadata) {
    this.title = metadata.title;
    this["@type"] = metadata["@type"];
    this.identifier = metadata.identifier;
    this.subtitle = metadata.subtitle;
    this.artist = metadata.artist || [];
    this.author = metadata.author || [];
    this.colorist = metadata.colorist || [];
    this.contributor = metadata.contributor || [];
    this.editor = metadata.editor || [];
    this.illustrator = metadata.illustrator || [];
    this.inker = metadata.inker || [];
    this.letterer = metadata.letterer || [];
    this.narrator = metadata.narrator || [];
    this.penciler = metadata.penciler || [];
    this.translator = metadata.translator || [];
    this.languages = metadata.language || [];
    this.description = metadata.description;
    this.publisher = metadata.publisher || [];
    this.imprint = metadata.imprint || [];
    this.published = metadata.published;
    this.modified = metadata.modified;
    this.subject = metadata.subject || [];
    this.belongsToCollection = metadata.belongsToCollection || [];
    this.belongsToSeries = metadata.belongsToSeries || [];
    this.readingProgression = metadata.readingProgression || ReadingProgression.auto;
    this.duration = metadata.duration;
    this.numberOfPages = metadata.numberOfPages;
    this.abridged = metadata.abridged || false;
    this.presentation = metadata.presentation ? new Presentation(metadata.presentation) : new Presentation({}); 
  }

  public effectiveReadingProgression(): ReadingProgression {
    if (this.readingProgression && this.readingProgression !== ReadingProgression.auto) {
      return this.readingProgression;
    } 
    
    if (this.languages.length > 0) {
      const primaryLang = this.languages[0];
      const lang = (primaryLang.includes("zh") ? primaryLang : primaryLang.split("-")[0]);
      if (Metadata.RTLLanguages.includes(lang)) {
        return ReadingProgression.rtl;
      }
    }

    return ReadingProgression.ltr;
  }
}