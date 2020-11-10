/* globals require exports */
const fs = require('fs')

exports.saveToJson = function saveToJson(name, data) {
  const json = JSON.stringify(data, null, ' ')
  fs.writeFileSync(`../${name}.json`, json)
}
