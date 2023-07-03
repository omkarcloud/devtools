const env = process.env.NODE_ENV

const Config = {
  DOMAIN_NAME: 'www.omkar.cloud', 
  IS_DEV : env == "development",
  IS_PRODUCTION : env == "production",
}

export default Config
