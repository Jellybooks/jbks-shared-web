/** Wraps a dictionary parsed from a JSON string or a JSON Object */
export default class JSONDictionary {
  public json: any;

  constructor(json: any) {
    if (typeof json === "string") {
      this.json = JSON.parse(json);
    } else {
      this.json = json;
    }
  }

  /** Removes the given property */
  private pop(key: string) {
    return delete this.json[key];
  }

  /** Parses the given property AS-IS and removes it */
  public parseRaw(key: string): any {
    const result = this.json[key];
    this.pop(key);
    return result;
  }

  /** Parses the given array and removes it 
   *  Parameter allowingSingle: If true, then allows the parsing of both a single value and an array.
  */
  public parseArray(key: string, allowingSingle: boolean = false): Array<any> {
    let result = this.json[key];
    this.pop(key);
    if (Array.isArray(result)) {
      return result;
    } else if (allowingSingle) {
      return [result];
    }
    return [];
  }

  /** Parses a numeric value, but returns null if it is not */
  public parseNumber(key: string): number | null {
    const result = this.json[key];
    this.pop(key);
    if (!isNaN(result)) {
      return result;
    }
    return null;
  }

  /** Parses a numeric value, but returns null if it is not a positive number. */
  public parsePositive(key: string): number | null {
    const result = this.json[key];
    this.pop(key);
    if (!isNaN(result) && Math.sign(result) >= 0) {
      return result;
    }
    return null;
  }

  /** Parses the given key and returns a Date (or null if it’s not a string) */
  public parseDate(key: string): Date | null {
    const result = this.json[key];
    this.pop(key);
    if (typeof result === "string") {
      return new Date(result)
    }
    return null;
  }
}