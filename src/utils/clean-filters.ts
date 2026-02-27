export function cleanFilters<T extends Record<string, unknown>>(
  obj: T,
): Partial<T> {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(obj).filter(([_, value]) => {
      if (value === "" || value === null || value === undefined) return false;
      if (typeof value === "number" && Number.isNaN(value)) return false;
      return true;
    }),
  ) as Partial<T>;
}
