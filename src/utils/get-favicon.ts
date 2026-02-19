import { normalizeUrl } from "./normalize-url";

export function getFaviconUrl(url: string) {
  const normalized = normalizeUrl(url);

  try {
    const { hostname } = new URL(normalized);
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return "";
  }
}
