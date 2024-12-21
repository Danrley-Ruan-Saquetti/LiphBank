import { z } from 'zod'

export const userCreateSchema = z.object({

})

export type UserCreateDTO = z.infer<typeof userCreateSchema>