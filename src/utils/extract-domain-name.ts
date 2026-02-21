export function extractDomainName(url: string) {
  const hostname = new URL(url).hostname;
  const parts = hostname.split(".");

  // Handle cases like www.google.com
  if (parts.length > 2) {
    return parts[parts.length - 2];
  }

  return parts[0];
}
