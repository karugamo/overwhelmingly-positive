const envalid = require('envalid')

const env = envalid.cleanEnv(process.env, {
  YOUTUBE_KEY: envalid.str(),
  UPDATE_YOUTUBE: envalid.bool({default: false}),
  UPDATE_DETAILS: envalid.bool({default: true})
})

module.exports = env
