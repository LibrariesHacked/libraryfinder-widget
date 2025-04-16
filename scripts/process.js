// Documentation for the LibraryOn API is https://libraryon.org/api-docs/v1
// Library services available at https://api-geography.librarydata.uk/rest/libraryauthorities

import { readFileSync, writeFileSync } from 'fs'

const librarySource = './data/libraries.json'
const libraryDestination = './public/libraries.min.json'

const serviceLibrariesDestination = './public/'

const servicesSource = './data/services.json'
const servicesDestination = './public/services.min.json'

const regionsDestination = './public/regions.min.json'

const libraries = []
const libraryData = readFileSync(librarySource, 'utf8')
const libraryArray = JSON.parse(libraryData).data

for (const item of libraryArray) {
  const { id } = item
  const { name, slug, yearClosed } = item.attributes
  const { coordinates } = item.attributes?.location?.geometry || {}
  const { authorityID, slug: serviceSlug } =
    item.attributes?.authority?.data?.attributes || {}

  if (
    yearClosed === null &&
    coordinates &&
    authorityID &&
    authorityID.indexOf('N') === -1 &&
    authorityID !== 'authority'
  ) {
    libraries.push({
      name,
      slug,
      libraryId: id,
      serviceId: authorityID,
      serviceSlug,
      longitude: coordinates[0],
      latitude: coordinates[1]
    })
  }
}

const servicesData = readFileSync(servicesSource, 'utf8')
const servicesArray = JSON.parse(servicesData)

const processedRegionsArray = servicesArray.map(item => item.region)
const uniqueRegions = [...new Set(processedRegionsArray)]
const processedRegionsData = JSON.stringify(uniqueRegions)
writeFileSync(regionsDestination, processedRegionsData, 'utf8')

const processedServicesArray = servicesArray.map(item => {
  const { nice_name: name, code, region } = item
  // Find the first service slug from the libraries array where the authority ID matches the code
  const serviceSlug = libraries.find(
    library => library.serviceId === code
  ).serviceSlug
  return [name, code, serviceSlug, uniqueRegions.indexOf(region)]
})

const processedServicesData = JSON.stringify(processedServicesArray)
writeFileSync(servicesDestination, processedServicesData, 'utf8')

const processedLibraryArray = libraries.map(item => {
  const { name, libraryId: id, slug, serviceId, longitude, latitude } = item
  return [
    id,
    name,
    slug,
    servicesArray.findIndex(service => service.code === serviceId),
    Math.round(longitude * 1e4) / 1e4,
    Math.round(latitude * 1e4) / 1e4
  ]
})

const processedLibraryData = JSON.stringify(processedLibraryArray)
writeFileSync(libraryDestination, processedLibraryData, 'utf8')

servicesArray.forEach((svc, idx) => {
  const serviceLibraries = processedLibraryArray.filter(lib => lib[3] === idx)
  serviceLibraries.forEach(lib => lib.splice(3, 1))
  const processedServiceLibraryData = JSON.stringify(serviceLibraries)
  writeFileSync(
    serviceLibrariesDestination + svc.code + '.json',
    processedServiceLibraryData,
    'utf8'
  )
})
