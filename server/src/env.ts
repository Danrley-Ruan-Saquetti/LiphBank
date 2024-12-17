export type Environments = {
  ENVIRONMENT: 'DEVELOPMENT' | 'PRODUCTION' | 'TEST'
  SECRET_PEPPER: string
  DATABASE_URL: string
  JWT_SECRET: string
  PORT: number
  TZ: string
}

export const env = <T extends keyof Environments>(envName: T, defaultValue?: Environments[T]) => {
  return (process.env[envName] ?? defaultValue ?? null) as Environments[T]
}