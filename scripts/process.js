// Documentation for the LibraryOn API is https://libraryon.org/api-docs/v1
// Library services available at https://api-geography.librarydata.uk/rest/libraryauthorities

import { readFileSync, writeFileSync } from 'fs'

const librarySource = './data/libraries.json'
const libraryDestination = './public/libraries.min.json'
const individualLibraryDestination = './public/'

const serviceLibrariesDestination = './public/'

const servicesSource = './data/services.json'
const servicesDestination = './public/services.min.json'

const regionsDestination = './public/regions.min.json'

const libraries = []
const libraryData = readFileSync(librarySource, 'utf8')
const libraryArray = JSON.parse(libraryData).data
// We need to extract the name, library_id, service_id, longitude, and latitude from each item in the array
for (const item of libraryArray) {
  const { name, data_entry } = item
  const { library_id, service_id, longitude, latitude } = data_entry
  libraries.push({
    name,
    data_entry: { library_id, service_id, longitude, latitude }
  })
}

const servicesData = readFileSync(servicesSource, 'utf8')
const servicesArray = JSON.parse(servicesData)

const processedRegionsArray = servicesArray.map(item => item.region)
const uniqueRegions = [...new Set(processedRegionsArray)]
const processedRegionsData = JSON.stringify(uniqueRegions)
writeFileSync(regionsDestination, processedRegionsData, 'utf8')

const processedServicesArray = servicesArray.map(item => {
  const { nice_name: name, code, region } = item
  return [name, code, uniqueRegions.indexOf(region)]
})

const processedServicesData = JSON.stringify(processedServicesArray)
writeFileSync(servicesDestination, processedServicesData, 'utf8')

const processedLibraryArray = libraries.map(item => {
  const {
    name,
    data_entry: { library_id: id, service_id: serviceId, longitude, latitude }
  } = item
  return [
    id,
    name,
    servicesArray.findIndex(service => service.code === serviceId),
    Math.round(longitude * 1e4) / 1e4,
    Math.round(latitude * 1e4) / 1e4
  ]
})

const processedLibraryData = JSON.stringify(processedLibraryArray)
writeFileSync(libraryDestination, processedLibraryData, 'utf8')

servicesArray.forEach((svc, idx) => {
  const serviceLibraries = processedLibraryArray.filter(lib => lib[2] === idx)
  serviceLibraries.forEach(lib => lib.splice(2, 1))
  const processedServiceLibraryData = JSON.stringify(serviceLibraries)
  writeFileSync(
    serviceLibrariesDestination + svc.code + '.json',
    processedServiceLibraryData,
    'utf8'
  )
})
