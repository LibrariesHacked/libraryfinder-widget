/*
  This file contains utility functions for geolocation.
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

  // Return a sorted clone of the array

  return [...objects].sort((a, b) => a.distance - b.distance)
}
