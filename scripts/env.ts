import * as envalid from "envalid";

const env = envalid.cleanEnv(process.env, {
  YOUTUBE_KEY: envalid.str(),
});

export default env;
