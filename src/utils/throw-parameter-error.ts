export function throwParameterError(parameter: string) {
  throw new Error(`Missing parameter: ${parameter}`);
}
