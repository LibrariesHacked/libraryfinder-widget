import { readFileSync, writeFileSync } from 'fs'

const source = './data/libraryon.json'
const destination = './data/minified-libraryon.json'

const libraryOnData = readFileSync(source, 'utf8')
const libraryonArray = JSON.parse(libraryOnData)
const processedArray = libraryonArray.libraries.map(item => {
  const {
    name,
    data_entry: { service_id: serviceId, longitude, latitude }
  } = item
  return [name, serviceId, longitude, latitude]
})

const processedData = JSON.stringify(processedArray)
writeFileSync(destination, processedData, 'utf8')
