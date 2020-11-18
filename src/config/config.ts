export type Config = {
  env: string
  port: number
  uri: string
}

export const config = (): Config => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 3000,
  uri: process.env.MONGO_SERVER
})
