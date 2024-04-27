class Postcode {
  constructor (code, city, state) {
    this.code = code
    this.city = city
    this.state = state
  }

  static fromJson (json) {
    return new Postcode(json.code, json.city, json.state)
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
