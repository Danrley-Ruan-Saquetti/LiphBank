import { z } from 'zod'

export const peopleCreateSchema = z.object({

})

export type PeopleCreateDTO = z.infer<typeof peopleCreateSchema>