export type Environment = {
  ENVIRONMENT: 'DEVELOPMENT' | 'PRODUCTION' | 'TEST'
  SECRET_PEPPER: string
  DATABASE_URL: string
  JWT_SECRET: string
  JWT_EXPIRATION: string
  PORT: number
  TZ: string
}

export function env<T extends keyof Environment>(name: T, defaultValue?: Environment[T]) {
  return (process.env[name] ?? defaultValue ?? null) as Environment[T]
}