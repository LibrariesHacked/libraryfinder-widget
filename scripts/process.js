import { readFileSync, writeFileSync } from 'fs'

const source = './data/libraryon.json'
const destination = './data/minified-libraryon.json'

const libraryOnData = readFileSync(source, 'utf8')
const libraryonArray = JSON.parse(libraryOnData)
const processedArray = libraryonArray.libraries.map(item => {
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

const processedData = JSON.stringify(processedArray)
writeFileSync(destination, processedData, 'utf8')
