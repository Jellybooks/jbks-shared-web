import JSONDictionary from "./Publication+JSON";
import { Contributor} from "./Contributor";
import { Subject } from "./Subject";
import { LocalizedString } from "./LocalizedString";
import { ReadingProgression } from "./ReadingProgression";

type Collection = Contributor;

/** https://readium.org/webpub-manifest/schema/metadata.schema.json */
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
  published?: string | Date;
  modified?: string | Date;
  subject?: Array<Subject>;
  belongsTo?: Array<string>;
  readingProgression?: ReadingProgression;
  duration?: number;
  numberOfPages?: number;
}

export class Metadata implements IMetadata {
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
  public published?: Date;
  public modified?: Date;
  public subject?: Array<Subject>;
  public belongsToCollection?: Array<Collection>;
  public belongsToSeries?: Array<Collection>;

  /** This contains the reading progression as declared in the manifest, so it might be 
   *  `auto`. To know the effective reading progression used to lay out the content, use
   *  `effectiveReadingProgression` instead.
  */
  public readingProgression?: ReadingProgression;
  public duration?: number;
  public numberOfPages?: number;
  public otherMetadata?: JSONDictionary;

  /* public otherMetadata */

  private static readonly RTLLanguages = ["ar", "fa", "he", "zh-Hant", "zh-TW"];

  constructor(metadata: IMetadata) {
    const json = new JSONDictionary(metadata);

    this.title = json.parseRaw("title");
    this["@type"] = json.parseRaw("@type");
    this.identifier = json.parseRaw("identifier");
    this.subtitle = json.parseRaw("subtitle");
    this.artist = json.parseArray("artist");
    this.author = json.parseArray("author");
    this.colorist = json.parseArray("colorist");
    this.contributor = json.parseArray("contributor");
    this.editor = json.parseArray("editor");
    this.illustrator = json.parseArray("illustrator");
    this.inker = json.parseArray("inker");
    this.letterer = json.parseArray("letterer");
    this.narrator = json.parseArray("narrator");
    this.penciler = json.parseArray("penciler");
    this.translator = json.parseArray("translator");
    this.languages = json.parseArray("language");
    this.description = json.parseRaw("description");
    this.publisher = json.parseArray("publisher");
    this.imprint = json.parseArray("imprint");
    this.published = json.parseDate("published");
    this.modified = json.parseDate("modified");
    this.subject = json.parseArray("subject");
    const belongsTo = json.parseRaw("belongsTo");
    this.belongsToCollection = belongsTo ? belongsTo["collection"] : [];
    this.belongsToSeries = belongsTo ? belongsTo["series"] : [];
    this.readingProgression = json.parseRaw("readingProgression") || ReadingProgression.auto;
    this.duration = json.parsePositive("duration");
    this.numberOfPages = json.parsePositive("numberOfPages");
    this.otherMetadata = json.json;
  }

  /** Computes a `ReadingProgression` when the value of `readingProgression` is set to `auto`,
   *  using the publication language.
   */
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