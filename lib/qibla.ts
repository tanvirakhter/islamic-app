// Qibla bearing calculation. Pure math, no DOM/network.
//
// We compute the great-circle initial bearing from the user's coordinates to
// the Ka'bah (21.4225°N, 39.8262°E) — the angle, measured clockwise from
// true north, in which a person should face.

export const KAABA_LAT = 21.4225;
export const KAABA_LNG = 39.8262;

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

/**
 * Initial great-circle bearing (in degrees, 0–360, clockwise from true north)
 * from `lat,lng` to the Ka'bah. Standard forward-azimuth formula.
 */
export function qiblaBearing(lat: number, lng: number): number {
  const phi1 = toRad(lat);
  const phi2 = toRad(KAABA_LAT);
  const deltaLambda = toRad(KAABA_LNG - lng);

  const y = Math.sin(deltaLambda) * Math.cos(phi2);
  const x =
    Math.cos(phi1) * Math.sin(phi2) -
    Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLambda);

  const theta = Math.atan2(y, x);
  return (toDeg(theta) + 360) % 360;
}

/**
 * Great-circle distance (km) — useful for the "distance to Makkah" stat.
 * Haversine formula; Earth radius = 6371 km.
 */
export function distanceToKaaba(lat: number, lng: number): number {
  const R = 6371;
  const phi1 = toRad(lat);
  const phi2 = toRad(KAABA_LAT);
  const dPhi = toRad(KAABA_LAT - lat);
  const dLambda = toRad(KAABA_LNG - lng);

  const a =
    Math.sin(dPhi / 2) ** 2 +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/** Cardinal direction label, eg. 90 → "E", 135 → "SE". */
export function cardinal(bearing: number): string {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(bearing / 45) % 8];
}
