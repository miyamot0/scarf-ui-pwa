import {
    InternalValidityQuestions,
    ExternalValidityQuestions,
    ReportingQuestions,
    OutcomesQuestions,
} from '@/questions/simplified_questions'
import { TypeOfValidityObject } from './types/QuestionTypes'

// TODO: This is a temporary solution to the problem of the default question language
const DEFAULT_LOCALE = 'en-us'

export const InternalValidityQuestionDefault: TypeOfValidityObject = {
    Status: 'NotStarted',
    Questions: InternalValidityQuestions.filter(
        (q) => q.Locale === DEFAULT_LOCALE
    ).map((question) => {
        return {
            ...question,
            QuestionInstruction: undefined,
            QuestionStem: undefined,
            QuestionType: undefined,
            Category: undefined,
        }
    }),
}

export const ExternalValidityQuestionDefault: TypeOfValidityObject = {
    Status: 'NotStarted',
    Questions: ExternalValidityQuestions.filter(
        (q) => q.Locale === DEFAULT_LOCALE
    ).map((question) => {
        return {
            ...question,
            QuestionInstruction: undefined,
            QuestionStem: undefined,
            QuestionType: undefined,
            Category: undefined,
        }
    }),
}

export const ReportingQuestionDefault: TypeOfValidityObject = {
    Status: 'NotStarted',
    Questions: ReportingQuestions.filter(
        (q) => q.Locale === DEFAULT_LOCALE
    ).map((question) => {
        return {
            ...question,
            QuestionInstruction: undefined,
            QuestionStem: undefined,
            QuestionType: undefined,
            Category: undefined,
        }
    }),
}

export const OutcomesQuestionDefault: TypeOfValidityObject = {
    Status: 'NotStarted',
    Questions: OutcomesQuestions.filter((q) => q.Locale === DEFAULT_LOCALE).map(
        (question) => {
            return {
                ...question,
                QuestionInstruction: undefined,
                QuestionStem: undefined,
                QuestionType: undefined,
                Category: undefined,
            }
        }
    ),
}
