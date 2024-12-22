import { writeFile } from 'fs'
import { get } from 'https'

const librariesUrl = 'https://libraryon.org/api/libraries'
const servicesUrl =
  'https://api-geography.librarydata.uk/rest/libraryauthorities'
const servicesFilePath = './data/services.json'

// Documentation for the LibaryOn API is https://libraryon.org/api-docs/v1
// Library services available at https://api-geography.librarydata.uk/rest/libraryauthorities
const downloadFile = (url, filePath) => {
  get(url, response => {
    let data = ''

    response.on('data', chunk => {
      data += chunk
    })

    response.on('end', () => {
      writeFile(filePath, data, error => {
        if (error) {
          console.error('Error saving JSON file:', error)
        } else {
          console.log('JSON file saved successfully')
        }
      })
    })
  }).on('error', error => {
    console.error('Error downloading JSON:', error)
  })
}

downloadFile(librariesUrl + '?page=1', './data/libraries1.json')
downloadFile(librariesUrl + '?page=2', './data/libraries2.json')
downloadFile(librariesUrl + '?page=3', './data/libraries3.json')
downloadFile(librariesUrl + '?page=4', './data/libraries4.json')
downloadFile(servicesUrl, servicesFilePath)
