export const findValue = (object: Object, key: string): any => {
  let value;
  Object.keys(object).some((k) => {
    if (k === key) {
      value = object[k];
      return true;
    }
    if (object[k] && typeof object[k] === "object") {
      value = findValue(object[k], key);
      return value !== undefined;
    }
    return false;
  });
  return value;
}