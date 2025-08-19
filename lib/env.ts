/* eslint-disable */
import { z } from 'zod'
import tryParseEnv from './try-parse-env';

const EnvSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    TURSO_DATABASE_URL: z.string().min(1, 'TURSO_DATABASE_URL is required'),
    TURSO_AUTH_TOKEN: z.string().optional(),
  })
  .refine((v) => v.NODE_ENV === 'development' || !!v.TURSO_AUTH_TOKEN, {
    path: ['TURSO_AUTH_TOKEN'],
    message: 'TURSO_AUTH_TOKEN is required outside development',
  })

export type Env = z.infer<typeof EnvSchema>

const raw = {
  NODE_ENV: process.env.NODE_ENV,
  TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
  TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
}

const parsed = tryParseEnv(EnvSchema, raw)

const RESERVED_PROPS = new Set([
  'then',
  'catch',
  'finally',
  'toJSON',
  'toString',
  'valueOf',
  'inspect',
])

const isEnvLike = (prop: string) => /^[A-Z0-9_]+$/.test(prop)

const envProxy = new Proxy(Object.freeze(parsed) as Readonly<Env>, {
  get(target, prop, receiver) {
    if (typeof prop !== 'string') return Reflect.get(target, prop, receiver)
    if (prop in target) return Reflect.get(target, prop, receiver)
    if (RESERVED_PROPS.has(prop)) return undefined
    if (isEnvLike(prop)) {
      throw new Error(`Attempted to access undeclared environment variable: ${prop}`)
    }
    return Reflect.get(target, prop, receiver)
  },
})

let cached: Readonly<Env> | null = null
export function getEnv(): Readonly<Env> {
  if (!cached) cached = envProxy
  return cached
}

const env = getEnv()
export default env
