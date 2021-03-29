const geolib = require('geolib')

/**
 * @typedef Coordinate
 * @property {Number} latitude
 * @property {Number} longitude
 */

/**
 * @param {String} position X,Y Geocoordinates
 * @param {String[]} positions X,Y Geocoordinates Array
 */
module.exports = (position, positions) => {
  const c = toCoordinate(position)
  const p = positions.map(toCoordinate)
  return toString(nearBy(c, p))
}

/**
 * 
 * @param {Coordinate} position 
 * @param {Coordinate[]} positions 
 * @returns {Coordinate}
 */
function nearBy(position, positions) {
  // TODO die MAPPING Funktion könnte schöner sein...
  return positions
    .map(v => {
      v.d = geolib.getDistance(position, v)
      return v
    })
    .reduce((a,b) => a.d < b.d ? a : b)
}

/**
 * Transforms a string to a coordinate.
 * 
 * @param {String} value 
 * @returns {Coordinate}
 */
function toCoordinate(value) {
  return validateCoordinate({
    latitude: Number(value.split(",")[0]),
    longitude: Number(value.split(",")[1])
  })
}

/**
 * Validates the given coordinate value.
 * 
 * @param {Coordinate} value 
 * @throws Error if it is not a coordinate
 */
function validateCoordinate(value) {
  const errLat = !value || !value.latitude || value.latitude === NaN
  const errLong = !value || !value.longitude || value.longitude === NaN

  if (errLat || errLong)  {
    throw new Error(`Given coordinate ${toString(value)} is invalid`)
  }

  return value
}

/**
 * Transforms a coordinate to a string.
 * 
 * @param {Coordinate} value 
 * @returns {String}
 */
function toString(value) {
  return `${value.latitude},${value.longitude}`
}