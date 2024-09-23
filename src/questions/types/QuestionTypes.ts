export type QuestionCategory =
    | 'DV Measurement'
    | 'Design Appropriateness'
    | 'Fidelity'
    | 'Social Validity'
    | 'Generality & Boundedness'
    | 'Maintenance'
    | 'Reporting'
    | 'Outcomes'

export type QuestionType =
    | 'YesNo'
    | 'Text'
    | 'YesNoNotPossible'
    | 'YesNoPartial'
    | 'YesNoNotApplicable'
    | 'YesNoNotApplicableForSome'
    | 'CbPcbG'
    | 'YIntOnlyYBothNo'
    | 'GeneralizationOutcomes'
    | 'MaintenancePeriod'
    | 'PrimarySecondaryUnknown'
    | 'ConditionChangeCharacterization'
    | 'ConditionChangeCharacterizationNA'

export type QuestionObjectHolder = {
    Category?: QuestionCategory
    QuestionID: string
    QuestionStem?: string
    QuestionInstruction?: string
    QuestionType?: QuestionType
    Response?: string
    Locale: 'en-us'
}

export type ResponseStatus = 'NotStarted' | 'InProgress' | 'Completed'

export type PublicationType =
    | 'Journal'
    | 'Proceeding'
    | 'Preprint'
    | 'Unpublished'
    | 'Unclassified'

export type StudyObject = {
    StudyID: string
    StudyTag: string
    StudyAuthors: string
    StudyTitle: string
    StudyJournal: string
    StudyYear: number
    InternalValidity: TypeOfValidityObject
    ExternalValidity: TypeOfValidityObject
    Reporting: TypeOfValidityObject
    Outcomes: TypeOfValidityObject
    PublicationType: PublicationType
}

export type StudyObjectPair = {
    primary: StudyObject
    reliability?: StudyObject
}

export type TypeOfValidityObject = {
    Status: ResponseStatus
    Questions: QuestionObjectHolder[]
}

export type TypeOfPlanningObject = {
    Status: ResponseStatus
    Questions: QuestionObjectHolder[]
}
