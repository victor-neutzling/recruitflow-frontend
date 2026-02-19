export function normalizeUrl(url: string) {
  url = url.trim();

  if (/^https?:\/\//i.test(url)) {
    return url;
  }

  return "https://" + url;
}
