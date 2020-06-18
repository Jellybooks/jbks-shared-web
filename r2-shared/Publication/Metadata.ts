import { IContributor} from "./Contributor";
import { ISubject } from "./Subject";
import { LocalizedString } from "./LocalizedString";
import { ReadingProgression } from "./ReadingProgression";
import Presentation from "./presentation/Presentation";

interface Collection extends IContributor {
  position?: number;
}

interface Collections {
  collection?: string | Collection;
  series?: string | Collection;
}

type Contributor = string | IContributor | Array<string | IContributor>;
type Subject = string | ISubject | Array<string | ISubject>;

export interface IMetadata {
  title: string | LocalizedString;
  "@type"?: string;
  identifier?: string;
  subtitle?: string | LocalizedString;
  artist?: Contributor;
  author?: Contributor;
  colorist?: Contributor;
  contributor?: Contributor;
  editor?: Contributor;
  illustrator?: Contributor;
  inker?: Contributor;
  letterer?: Contributor;
  narrator?: Contributor;
  penciler?: Contributor;
  translator?: Contributor;
  language?: Array<string>;
  description?: string;
  publisher?: Contributor;
  imprint?: Contributor;
  published?: string;
  modified?: string;
  subject?: Subject;
  belongsTo?: Array<Collections>;
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
  public artist?: Contributor;
  public author?: Contributor;
  public colorist?: Contributor;
  public contributor?: Contributor;
  public editor?: Contributor;
  public illustrator?: Contributor;
  public inker?: Contributor;
  public letterer?: Contributor;
  public narrator?: Contributor;
  public penciler?: Contributor;
  public translator?: Contributor;
  public languages: Array<string>;
  public description?: string;
  public publisher?: Contributor;
  public imprint?: Contributor;
  public published?: string;
  public modified?: string;
  public subject?: Subject;
  public belongsTo?: Array<Collections>;
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
    this.belongsTo = metadata.belongsTo || [];
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