import { z } from 'zod'

export const StudyDetailsSchema = z.object({
    code: z.string().min(1),
    authors: z.string().min(1),
    title: z.string().min(1),
    journal: z.string(),
    year: z.coerce.number().int().min(0),
})
