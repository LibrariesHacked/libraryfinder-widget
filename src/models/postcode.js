class Postcode {
  constructor (
    postcode,
    postcodeSector,
    postcodeDistrict,
    postcodeArea,
    lsoa,
    lsoaName,
    ward,
    wardName,
    district,
    districtName,
    county,
    countyName,
    libraryService,
    libraryServiceName,
    region,
    regionName,
    country,
    countryName,
    longitude,
    latitude,
    northing,
    easting,
    geojson
  ) {
    this.postcode = postcode
    this.postcodeSector = postcodeSector
    this.postcodeDistrict = postcodeDistrict
    this.postcodeArea = postcodeArea
    this.lsoa = lsoa
    this.lsoaName = lsoaName
    this.ward = ward
    this.wardName = wardName
    this.district = district
    this.districtName = districtName
    this.county = county
    this.countyName = countyName
    this.libraryService = libraryService
    this.libraryServiceName = libraryServiceName
    this.region = region
    this.regionName = regionName
    this.country = country
    this.countryName = countryName
    this.longitude = longitude
    this.latitude = latitude
    this.northing = northing
    this.easting = easting
    this.geojson = geojson
  }

  static fromJson (json) {
    return new Postcode(
      json.postcode,
      json.postcode_sector,
      json.postcode_district,
      json.postcode_area,
      json.lsoa,
      json.lsoa_name,
      json.ward,
      json.ward_name,
      json.district,
      json.district_name,
      json.county,
      json.county_name,
      json.library_service,
      json.library_service_name,
      json.region,
      json.region_name,
      json.country,
      json.country_name,
      json.longitude,
      json.latitude,
      json.northing,
      json.easting,
      json.geojson
    )
  }

  static async search (searchTerm) {
    const response = await fetch(
      `https://api-geography.librarydata.uk/rest/postcodes/search/${searchTerm}`
    )
    const data = await response.json()
    return data.map(Postcode.fromJson)
  }

  static async findByCode (code) {
    const response = await fetch(
      `https://api-geography.librarydata.uk/rest/postcodes/${code}`
    )
    const data = await response.json()
    return Postcode.fromJson(data)
  }
}

export default Postcode
