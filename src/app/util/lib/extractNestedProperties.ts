// all possible return values of typeof
// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
type AllowedPropertyTypeMap = {
  undefined: undefined;
  boolean: boolean;
  number: number;
  bigint: bigint;
  string: string;
  symbol: symbol;
  function: (...args: unknown[]) => unknown;
  object: object;
};

export function extractNestedProperties<T extends keyof AllowedPropertyTypeMap>(
  obj: object,
  propertyName: string,
  propertyType: T
): AllowedPropertyTypeMap[T][] {
  const messages: AllowedPropertyTypeMap[T][] = [];

  // this is a generic function, so no-explicit-any can be safely disabled
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function traverse(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === propertyType && key === propertyName) {
        messages.push(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        // don't traverse HTMLElements
        if (obj[key] instanceof HTMLElement) {
          continue;
        }

        traverse(obj[key]);
      }
    }
  }

  traverse(obj);
  return messages;
}
