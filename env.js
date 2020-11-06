const envalid = require('envalid')

const env = envalid.cleanEnv(process.env, {
  YOUTUBE_KEY: envalid.str()
})

module.exports = env
