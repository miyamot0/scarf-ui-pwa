import { z } from 'zod'

export const StudyOutcomesSchema = z.object({
    Outcomes_1: z.string(),
    Outcomes_2: z.string(),
    Outcomes_3: z.string(),
    Outcomes_4: z.string(),
    Outcomes_5: z.string(),
    Outcomes_6: z.string(),
})
