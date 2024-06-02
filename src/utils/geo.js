// Description: This file contains the utility functions for geolocation.

/**
 * Calculate the distance between two points on the Earth's surface.
 * @param {number} longitude1 - The longitude of the first point.
 * @param {number} latitude1 - The latitude of the first point.
 * @param {number} longitude2 - The longitude of the second point.
 * @param {number} latitude2 - The latitude of the second point.
 * @returns {number} The distance between the two points in metres.
 * @see {@link https://en.wikipedia.org/wiki/Haversine_formula}
 */
export const calculateDistanceBetweenPoints = (
  longitude1,
  latitude1,
  longitude2,
  latitude2
) => {
  const R = 6371e3 // metres
  const φ1 = (latitude1 * Math.PI) / 180 // φ, λ in radians
  const φ2 = (latitude2 * Math.PI) / 180
  const Δφ = ((latitude2 - latitude1) * Math.PI) / 180
  const Δλ = ((longitude2 - longitude1) * Math.PI) / 180

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c // in metres
}

/**
 * Sort an array of objects by their distance from a given location.
 * @param {Array<Object>} objects - The array of objects to sort.
 * @param {number} longitude - The longitude of the location.
 * @param {number} latitude - The latitude of the location.
 * @returns {Array<Object>} The sorted array of objects.
 */
export const sortObjectsByNearestLocation = (objects, longitude, latitude) => {
  // First assign the distance to each object
  objects.forEach(object => {
    object.distance = calculateDistanceBetweenPoints(
      longitude,
      latitude,
      object.longitude,
      object.latitude
    )
  })
  return [...objects].sort((a, b) => a.distance - b.distance)
}

/**
 * Convert metres to miles.
 * @param {number} metres - The distance in metres.
 * @param {number} precision - The number of decimal places to round to.
 * @returns {number} The distance in miles.
 */
export const metresToMiles = (metres, precision = 2) => {
  return (metres / 1609.344).toFixed(precision)
}
