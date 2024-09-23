// reli_scoring.test.ts
import {
    QuestionObjectHolder,
    StudyObject,
} from '@/questions/types/QuestionTypes'
import { CompareResponsesInAreas, CalculateAgreement } from '../reli_scoring'

describe('CompareResponsesInAreas', () => {
    it('counts the matching and total responses correctly', () => {
        const primary = [
            { QuestionID: '1', Response: 'Yes' },
            { QuestionID: '2', Response: 'No' },
            { QuestionID: '3', Response: 'Yes' },
        ] as QuestionObjectHolder[]

        const reli = [
            { QuestionID: '1', Response: 'Yes' },
            { QuestionID: '2', Response: 'Yes' },
            { QuestionID: '3', Response: 'Yes' },
        ] as QuestionObjectHolder[]

        const result = CompareResponsesInAreas(primary, reli)

        expect(result).toEqual({ count: 2, total: 3, percent: 67 })
    })
})

describe('CalculateAgreement', () => {
    it('calculates the agreement percentage correctly', () => {
        const primary = [
            {
                StudyID: '1',
                InternalValidity: {
                    Questions: [
                        { QuestionID: '1', Response: 'Yes' },
                        { QuestionID: '2', Response: 'No' },
                    ],
                },
                ExternalValidity: {
                    Questions: [{ QuestionID: '3', Response: 'Yes' }],
                },
                Reporting: {
                    Questions: [{ QuestionID: '4', Response: 'Yes' }],
                },
                Outcomes: { Questions: [{ QuestionID: '5', Response: 'No' }] },
            },
        ] as StudyObject[]

        const reli = [
            {
                StudyID: '1',
                InternalValidity: {
                    Questions: [
                        { QuestionID: '1', Response: 'Yes' },
                        { QuestionID: '2', Response: 'Yes' },
                    ],
                },
                ExternalValidity: {
                    Questions: [{ QuestionID: '3', Response: 'Yes' }],
                },
                Reporting: { Questions: [{ QuestionID: '4', Response: 'No' }] },
                Outcomes: { Questions: [{ QuestionID: '5', Response: 'Yes' }] },
            },
        ] as StudyObject[]

        const agreement = CalculateAgreement(primary, reli)

        expect(agreement).toEqual({
            IV: {
                Count: 1,
                Total: 2,
                Percent: 50,
            },
            EV: {
                Count: 1,
                Total: 1,
                Percent: 100,
            },
            Reporting: {
                Count: 0,
                Total: 1,
                Percent: 0,
            },
            Outcomes: {
                Count: 0,
                Total: 1,
                Percent: 0,
            },
            TotalCount: 2,
            TotalTotal: 5,
            TotalPercent: 40,
        })
    })
})
