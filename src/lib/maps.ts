// קישור חיפוש רגיל ב-Google Maps, ללא API בתשלום.
export function googleMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
