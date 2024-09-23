'use client'

import { z } from 'zod'

export const StudyExternalValiditySchema = z.object({
    Social_Validity_1: z.string(),
    Social_Validity_2: z.string(),
    Social_Validity_3: z.string(),
    Social_Validity_4: z.string(),
    Social_Validity_5: z.string(),

    Generality_Boundedness_1: z.string(),
    Generality_Boundedness_2: z.string(),
    Generality_Boundedness_3: z.string(),
    Generality_Boundedness_4: z.string(),
    Generality_Boundedness_5: z.string(),
    Generality_Boundedness_6: z.string(),
    Generality_Boundedness_7: z.string(),

    Maintenance_1: z.string(),
    Maintenance_2: z.string(),
    Maintenance_3: z.string(),
})
