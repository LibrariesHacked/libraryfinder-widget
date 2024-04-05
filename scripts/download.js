import { writeFile } from 'fs'
import { get } from 'https'

const url = 'https://libraryon.org/api/libraries'
const filePath = './data/libraries.json'

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
