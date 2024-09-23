import { QuestionObjectHolder } from '@/questions/types/QuestionTypes'
import internalValidityQuestions from './generated/internal_validity_questions.json'
import externalValidityQuestions from './generated/external_validity_questions.json'
import reportingQuestions from './generated/reporting_questions.json'
import outcomesQuestions from './generated/outcomes_questions.json'
import planningQuestions from './generated/planning_questions.json'

export const InternalValidityQuestions: QuestionObjectHolder[] =
    internalValidityQuestions as unknown as QuestionObjectHolder[]

export const ExternalValidityQuestions: QuestionObjectHolder[] =
    externalValidityQuestions as unknown as QuestionObjectHolder[]

export const ReportingQuestions: QuestionObjectHolder[] =
    reportingQuestions as unknown as QuestionObjectHolder[]

export const OutcomesQuestions: QuestionObjectHolder[] =
    outcomesQuestions as unknown as QuestionObjectHolder[]

export const PlanningQuestions: QuestionObjectHolder[] =
    planningQuestions as unknown as QuestionObjectHolder[]
