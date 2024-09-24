import { z } from 'zod'

export const StudyInternalValiditySchema = z.object({
    DV_Measurement_1: z.string(),
    DV_Measurement_2: z.string(),
    DV_Measurement_3: z.string(),
    DV_Measurement_4: z.string(),
    DV_Measurement_5: z.string(),
    DV_Measurement_6: z.string(),
    DV_Measurement_7: z.string(),

    Design_Appropriateness_1: z.string(),
    Design_Appropriateness_2: z.string(),
    Design_Appropriateness_3: z.string(),
    Design_Appropriateness_4: z.string(),

    Fidelity_1: z.string(),
    Fidelity_2: z.string(),
    Fidelity_3: z.string(),
    Fidelity_4: z.string(),
    Fidelity_5: z.string(),
})
