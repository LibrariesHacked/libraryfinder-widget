class Library {
  constructor (
    name,
    isCollected,
    previousId,
    libraryId,
    libraryName,
    address1,
    address2,
    address3,
    postcode,
    coLocated,
    coLocatedWith,
    email,
    latitude,
    longitude,
    notes,
    statutory,
    typeOfLibrary,
    uprn,
    uprnLatitude,
    uprnLongitude,
    yearClosed,
    yearOpened,
    serviceName,
    serviceId,
    regionName,
    libraryUrl,
    openDays,
    staffedMondayTime,
    unstaffedMondayTime,
    staffedTuesdayTime,
    unstaffedTuesdayTime,
    staffedWednesdayTime,
    unstaffedWednesdayTime,
    staffedThursdayTime,
    unstaffedThursdayTime,
    staffedFridayTime,
    unstaffedFridayTime,
    staffedSaturdayTime,
    unstaffedSaturdayTime,
    staffedSundayTime,
    unstaffedSundayTime
  ) {
    this.name = name
    this.isCollected = isCollected
    this.previousId = previousId
    this.libraryId = libraryId
    this.libraryName = libraryName
    this.address1 = address1
    this.address2 = address2
    this.address3 = address3
    this.postcode = postcode
    this.coLocated = coLocated
    this.coLocatedWith = coLocatedWith
    this.email = email
    this.latitude = latitude
    this.longitude = longitude
    this.notes = notes
    this.statutory = statutory
    this.typeOfLibrary = typeOfLibrary
    this.uprn = uprn
    this.uprnLatitude = uprnLatitude
    this.uprnLongitude = uprnLongitude
    this.yearClosed = yearClosed
    this.yearOpened = yearOpened
    this.serviceName = serviceName
    this.serviceId = serviceId
    this.regionName = regionName
    this.libraryUrl = libraryUrl
    this.openDays = openDays
    this.staffedMondayTime = staffedMondayTime
    this.unstaffedMondayTime = unstaffedMondayTime
    this.staffedTuesdayTime = staffedTuesdayTime
    this.unstaffedTuesdayTime = unstaffedTuesdayTime
    this.staffedWednesdayTime = staffedWednesdayTime
    this.unstaffedWednesdayTime = unstaffedWednesdayTime
    this.staffedThursdayTime = staffedThursdayTime
    this.unstaffedThursdayTime = unstaffedThursdayTime
    this.staffedFridayTime = staffedFridayTime
    this.unstaffedFridayTime = unstaffedFridayTime
    this.staffedSaturdayTime = staffedSaturdayTime
    this.unstaffedSaturdayTime = unstaffedSaturdayTime
    this.staffedSundayTime = staffedSundayTime
    this.unstaffedSundayTime = unstaffedSundayTime
  }

  static fromMinifiedArray (array, services, regions) {
    return new Library(
      array[1],
      null,
      null,
      array[0],
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      array[4],
      array[3],
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      services[array[2]][0],
      null,
      regions[services[array[2]][1]],
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    )
  }

  static fromJson (json) {
    return new Library(
      json.name,
      json.isCollected,
      json.previous_id,
      json.library_id,
      json.library_name,
      json.address_1,
      json.address_2,
      json.address_3,
      json.postcode,
      json.co_located,
      json.co_located_with,
      json.email,
      json.latitude,
      json.longitude,
      json.notes,
      json.statutory,
      json.type_of_library,
      json.uprn,
      json.uprn_latitude,
      json.uprn_longitude,
      json.year_closed,
      json.year_opened,
      json.service_name,
      json.service_id,
      json.region_name,
      json.library_url,
      json.open_days,
      json.staffed_monday_time,
      json.unstaffed_monday_time,
      json.staffed_tuesday_time,
      json.unstaffed_tuesday_time,
      json.staffed_wednesday_time,
      json.unstaffed_wednesday_time,
      json.staffed_thursday_time,
      json.unstaffed_thursday_time,
      json.staffed_friday_time,
      json.unstaffed_friday_time,
      json.staffed_saturday_time,
      json.unstaffed_saturday_time,
      json.staffed_sunday_time,
      json.unstaffed_sunday_time
    )
  }

  static async getAllLibraries () {
    const librariesData = fetch(
      'https://raw.githubusercontent.com/LibrariesHacked/libraryon-libraryfinder-widget/1-make-the-build-available-on-github/data/libraries.min.json'
    )
    const servicesData = fetch(
      'https://raw.githubusercontent.com/LibrariesHacked/libraryon-libraryfinder-widget/1-make-the-build-available-on-github/data/services.min.json'
    )
    const regionsData = fetch(
      'https://raw.githubusercontent.com/LibrariesHacked/libraryon-libraryfinder-widget/1-make-the-build-available-on-github/data/regions.min.json'
    )
    const [librariesResponse, servicesResponse, regionsResponse] =
      await Promise.all([librariesData, servicesData, regionsData])

    const serviceList = await servicesResponse.json()
    const regionList = await regionsResponse.json()
    const libraryList = await librariesResponse.json()
    const libraries = libraryList.map(library =>
      Library.fromMinifiedArray(library, serviceList, regionList)
    )
    return libraries
  }
}

export default Library
