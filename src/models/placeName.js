class PlaceName {
  constructor (
    name1,
    name1Lang,
    name2,
    name2Lang,
    localType,
    easting,
    northing,
    longitude,
    latitude,
    postcodeDistrict,
    populatedPlace,
    district,
    county,
    region,
    country,
    geoJson,
    bboxGeoJson
  ) {
    this.name1 = name1
    this.name1Lang = name1Lang
    this.name2 = name2
    this.name2Lang = name2Lang
    this.localType = localType
    this.easting = easting
    this.northing = northing
    this.longitude = longitude
    this.latitude = latitude
    this.postcodeDistrict = postcodeDistrict
    this.populatedPlace = populatedPlace
    this.district = district
    this.county = county
    this.region = region
    this.country = country
    this.geoJson = geoJson
    this.bboxGeoJson = bboxGeoJson
  }

  static fromJson (json) {
    return new PlaceName(
      json.name1,
      json.name1_lang,
      json.name2,
      json.name2_lang,
      json.local_type,
      json.easting,
      json.northing,
      json.longitude,
      json.latitude,
      json.postcode_district,
      json.populated_place,
      json.district,
      json.county,
      json.region,
      json.country,
      json.geojson,
      json.bbox_geojson
    )
  }

  static async search (searchTerm, localTypes) {
    let url = `https://api-geography.librarydata.uk/rest/placenames/search/${searchTerm}`
    if (localTypes && localTypes.length > 0) {
      url += `?types[]=${localTypes.join('&types[]=')}`
    }
    const response = await fetch(url)
    const data = await response.json()
    return data.map(PlaceName.fromJson)
  }

  static async findByName (name) {
    const response = await fetch(
      `https://api-geography.librarydata.uk/rest/placenames/${name}`
    )
    const data = await response.json()
    return PlaceName.fromJson(data)
  }
}

export default PlaceName
