import type {
    QuestionObjectHolder,
    StudyObject,
} from '@/questions/types/QuestionTypes'

export const CompareResponsesInAreas = (
    primary: QuestionObjectHolder[],
    reli: QuestionObjectHolder[]
) => {
    let count = 0
    let total = 0

    primary.forEach((question) => {
        const primary_question = question
        const reliability_question = reli.find(
            (q) => q.QuestionID === primary_question.QuestionID
        )

        if (reliability_question) {
            const primary_response = primary_question.Response
            const reliability_response = reliability_question.Response

            if (primary_response === reliability_response) {
                count++
            }

            total++
        }
    })

    return {
        count,
        total,
        percent: Math.round((count / total) * 100),
    }
}

type CalculateAgreementReturn = {
    TotalCount: number
    TotalTotal: number
    TotalPercent: number
    IV: {
        Count: number
        Total: number
        Percent: number
    }
    EV: {
        Count: number
        Total: number
        Percent: number
    }
    Reporting: {
        Count: number
        Total: number
        Percent: number
    }
    Outcomes: {
        Count: number
        Total: number
        Percent: number
    }
}

export const CalculateAgreement = (
    primary: StudyObject[],
    reli: StudyObject[]
): CalculateAgreementReturn => {
    let iv_count = 0
    let iv_total = 0
    let ev_count = 0
    let ev_total = 0
    let reporting_count = 0
    let reporting_total = 0
    let outcomes_count = 0
    let outcomes_total = 0

    primary.forEach((study) => {
        const primary_study = study
        const reliability_study = reli.find(
            (s) => s.StudyID === primary_study.StudyID
        )

        if (reliability_study) {
            const primary_internal = primary_study.InternalValidity.Questions
            const reliability_internal =
                reliability_study.InternalValidity.Questions

            const iv_number = CompareResponsesInAreas(
                primary_internal,
                reliability_internal
            )

            const primary_external = primary_study.ExternalValidity.Questions
            const reliability_external =
                reliability_study.ExternalValidity.Questions

            const ev_number = CompareResponsesInAreas(
                primary_external,
                reliability_external
            )

            const primary_reporting = primary_study.Reporting.Questions
            const reliability_reporting = reliability_study.Reporting.Questions

            const reporting_number = CompareResponsesInAreas(
                primary_reporting,
                reliability_reporting
            )

            const primary_outcomes = primary_study.Outcomes.Questions
            const reliability_outcomes = reliability_study.Outcomes.Questions

            const outcomes_number = CompareResponsesInAreas(
                primary_outcomes,
                reliability_outcomes
            )

            iv_count += iv_number.count
            iv_total += iv_number.total

            ev_count += ev_number.count
            ev_total += ev_number.total

            reporting_count += reporting_number.count
            reporting_total += reporting_number.total

            outcomes_count += outcomes_number.count
            outcomes_total += outcomes_number.total
        }
    })

    const count = iv_count + ev_count + reporting_count + outcomes_count
    const total = iv_total + ev_total + reporting_total + outcomes_total

    return {
        TotalCount: count,
        TotalTotal: total,
        TotalPercent: Math.round((count / total) * 100),
        IV: {
            Count: iv_count,
            Total: iv_total,
            Percent: Math.round((iv_count / iv_total) * 100),
        },
        EV: {
            Count: ev_count,
            Total: ev_total,
            Percent: Math.round((ev_count / ev_total) * 100),
        },
        Reporting: {
            Count: reporting_count,
            Total: reporting_total,
            Percent: Math.round((reporting_count / reporting_total) * 100),
        },
        Outcomes: {
            Count: outcomes_count,
            Total: outcomes_total,
            Percent: Math.round((outcomes_count / outcomes_total) * 100),
        },
    }
}
