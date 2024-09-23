import { PublicationType } from '@/questions/types/QuestionTypes'

export type CommonVisualOutput = {
    Tag: string
    ID: string
    IV: number
    EV: number
    Reporting: number
    Outcome: number
    Maintained: number
    MaintenanceWindow: number
    Generalized: number
    GeneralizationRigor: number
    RatingOutcome: string
    RatingMaintenance: string
    DegreeMaintenance: string
    RatingGeneralization: string
    DegreeGeneralization: string
    Type: PublicationType
    Authors: string
}
