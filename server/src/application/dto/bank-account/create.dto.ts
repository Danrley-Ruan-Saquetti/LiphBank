import { z } from 'zod'

export const bankAccountSchemaCreate = z.object({})

export type BankAccountCreateDTO = z.input<typeof bankAccountSchemaCreate>