/**
 * Omit properties from an object
 * @param object
 * @param keys
 * @returns
 */
export default function omit<
  T extends object,
  U extends string | number | symbol,
>(object: T, keys: U[]): Omit<T, U> {
  return Object.entries(object).reduce(
    (acc, [key, value]) => {
      if (keys.includes(key as U)) return acc;
      return { ...acc, [key]: value };
    },
    {} as Omit<T, U>,
  );
}
