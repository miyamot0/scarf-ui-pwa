import { StudyObject } from '@/questions/types/QuestionTypes'

export function applyConditionalJittering(jitter: boolean, value: number) {
    const randomIntFromInterval = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    return jitter ? value + randomIntFromInterval(-20, 20) / 100 : value
}

export function CalculateOutcomeScore(
    approach: 'Internal Validity' | 'External Validity' | 'Reporting',
    study: StudyObject
) {
    switch (approach) {
        case 'Internal Validity':
            return study.InternalValidity.Questions.reduce((acc, question) => {
                const derived_score = question.Response?.includes('Yes') ? 1 : 0

                return acc + derived_score
            }, 0)
        case 'External Validity':
            return study.ExternalValidity.Questions.reduce((acc, question) => {
                const derived_score = question.Response?.includes('Yes') ? 1 : 0

                return acc + derived_score
            }, 0)
        case 'Reporting':
            return study.Reporting.Questions.reduce((acc, question) => {
                const derived_score = question.Response?.includes('Yes') ? 1 : 0

                return acc + derived_score
            }, 0)
    }
}

export function GenerateStrengthRating(
    metric: 'Functional Relations' | 'Maintenance' | 'Generalization',
    study: StudyObject
) {
    switch (metric) {
        case 'Functional Relations':
            const functional_rel_outcomes = study.Outcomes.Questions.find(
                (q) => q.QuestionID === 'Outcomes_4'
            )

            if (!functional_rel_outcomes)
                throw new Error('Missing outcomes data')

            switch (functional_rel_outcomes.Response) {
                case 'Strong':
                    return 4
                case 'Weak':
                    return 3
                case 'Inconsistent':
                    return 2
                case 'Null':
                    return 1
                case 'Countertherapeutic':
                    return 0
                default:
                    return -1
            }
        case 'Maintenance':
            const maintained_outcomes = study.Outcomes.Questions.find(
                (q) => q.QuestionID === 'Outcomes_5'
            )

            if (!maintained_outcomes) throw new Error('Missing outcomes data')

            switch (maintained_outcomes.Response) {
                case 'Strong':
                    return 4
                case 'Weak':
                    return 3
                case 'Inconsistent':
                    return 2
                case 'Null':
                    return 1
                case 'Countertherapeutic':
                    return 0
                default:
                    return -1
            }
        case 'Generalization':
            const generalized_outcomes = study.Outcomes.Questions.find(
                (q) => q.QuestionID === 'Outcomes_6'
            )

            if (!generalized_outcomes) throw new Error('Missing outcomes data')

            switch (generalized_outcomes.Response) {
                case 'Strong':
                    return 4
                case 'Weak':
                    return 3
                case 'Inconsistent':
                    return 2
                case 'Null':
                    return 1
                case 'Countertherapeutic':
                    return 0
                default:
                    return -1
            }
    }
}

export function GenerateMaintenanceWindow(study: StudyObject) {
    const maintenance_window = study.ExternalValidity.Questions.find(
        (q) => q.QuestionID === 'Maintenance_3'
    )

    if (!maintenance_window) throw new Error('Missing outcomes data')

    switch (maintenance_window.Response) {
        case '>= 1 Month':
            return 3
        case '>= 2 Weeks':
            return 2
        case '>= 1 Week':
            return 1
        case 'Immediately after Cessation':
            return 0
        default:
            return -1
    }
}

export function GenerateGeneralizationRating(study: StudyObject) {
    const maintenance_window = study.ExternalValidity.Questions.find(
        (q) => q.QuestionID === 'Generality_Boundedness_7'
    )

    if (!maintenance_window) throw new Error('Missing outcomes data')

    switch (maintenance_window.Response) {
        case 'SCD':
            return 3
        case 'Intermittent':
            return 2
        case 'Pre/Post':
            return 1
        case 'Post Only':
            return 0
        default:
            return -1
    }
}
