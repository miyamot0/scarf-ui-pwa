'use client'

import { z } from 'zod'

export const StudyDetailsSchema = z.object({
    Plan_General_1: z.string().min(1),
    Plan_General_2: z.string().min(1),
    Plan_General_3: z.string().min(1),
    Plan_General_4: z.string().min(1),
    Plan_Reporting_1: z.string().min(1),
    Plan_Reporting_2: z.string().min(1),
    Plan_Reporting_3: z.string().min(1),
    Plan_Reporting_4: z.string().min(1),
    Plan_Reporting_5: z.string().min(1),
    Plan_Reporting_6: z.string().min(1),
    Plan_Reporting_7: z.string().min(1),
    Plan_DV_Measurement_4: z.string().min(1),
    Plan_DV_Measurement_5: z.string().min(1),
    Plan_Reporting_8: z.string().min(1),
    Plan_Reporting_9: z.string().min(1),
    Plan_Reporting_10: z.string().min(1),
    Plan_Reporting_11: z.string().min(1),
    Plan_Reporting_12: z.string().min(1),
    Plan_Fidelity_2: z.string().min(1),
    Plan_Fidelity_3: z.string().min(1),
    Plan_Fidelity_4: z.string().min(1),
    Plan_Social_Validity_1: z.string().min(1),
    Plan_Generality_Boundedness_1: z.string().min(1),
    Plan_Generality_Boundedness_3: z.string().min(1),
    Plan_Generality_Boundedness_5: z.string().min(1),
    Plan_Maintenance_1: z.string().min(1),
})
