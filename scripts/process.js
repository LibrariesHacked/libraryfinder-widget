import { readFileSync, writeFileSync } from 'fs'

const librarySource = './data/libraryon.json'
const libraryDestination = './data/minified-libraryon.json'

const servicesSource = './data/services.json'
const servicesDestination = './data/minified-services.json'

const libraryOnData = readFileSync(librarySource, 'utf8')
const libraryonArray = JSON.parse(libraryOnData)

const servicesData = readFileSync(servicesSource, 'utf8')
const servicesArray = JSON.parse(servicesData)

// Documentation for the LibaryOn API is https://libraryon.org/api-docs/v1
// Library services available at https://api-geography.librarydata.uk/rest/libraryauthorities

const processedLibraryArray = libraryonArray.libraries.map(item => {
  const {
    name,
    data_entry: { library_id: id, service_id: serviceId, longitude, latitude }
  } = item
  return [
    id,
    name,
    serviceId,
    Math.round(longitude * 1e4) / 1e4,
    Math.round(latitude * 1e4) / 1e4
  ]
})

const processedLibraryData = JSON.stringify(processedLibraryArray)
writeFileSync(libraryDestination, processedLibraryData, 'utf8')
