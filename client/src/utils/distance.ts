export function calculateDistancePlaceholder(lat1?: number, lng1?: number, lat2?: number, lng2?: number): number {
  // Real implementation will use VietMap API later
  // VITE_VIETMAP_API_KEY
  if (!lat1 || !lng1 || !lat2 || !lng2) return 0;
  // Dummy haversine or just a random number for mock
  return parseFloat(((Math.abs(lat1 - lat2) + Math.abs(lng1 - lng2)) * 100).toFixed(1));
}
