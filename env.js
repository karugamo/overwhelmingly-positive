/* global require process module */
const envalid = require('envalid')

const env = envalid.cleanEnv(process.env, {
  YOUTUBE_KEY: envalid.str(),
  MONGO_DB_PW: envalid.str()
})

module.exports = env
