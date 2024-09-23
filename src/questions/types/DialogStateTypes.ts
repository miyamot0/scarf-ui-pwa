import { StudyObject } from './QuestionTypes'

type DisplayDialogType =
    | undefined
    | 'study_import'
    | 'review_details'
    | 'study_details'
    | 'study_internal_validity'
    | 'study_external_validity'
    | 'study_reporting'
    | 'study_outcomes'

export type DialogStateType = {
    dialog_type: DisplayDialogType
    study: undefined | StudyObject
}
