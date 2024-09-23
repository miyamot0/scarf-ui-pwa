import { QuestionType } from '@/questions/types/QuestionTypes'

export const OptionsYesNo = ['Yes', 'No'] as const
export const OptionsYesNoPartial = ['Yes', 'No', 'Partial'] as const
export const OptionsYesNoNA = ['Yes', 'No', 'N/A'] as const
export const OptionsYesNoNAForSome = ['Yes', 'No', 'For Some', 'N/A'] as const
export const OptionsYesNoNotPossible = ['Yes', 'No', 'Not Possible'] as const
export const OptionsContext = [
    'Context Bound',
    'Partially Context Bound',
    'Generalized',
] as const
export const OptionsFidelity = [
    'Yes, Intervention Only',
    'Yes, Both Conditions',
    'No',
] as const
export const OptionsGeneralizationOutcomesMeasured = [
    'SCD',
    'Intermittent',
    'Pre/Post',
    'Post Only',
    'None',
    'N/A',
] as const
export const OptionsMaintenancePeriod = [
    'Immediately after Cessation',
    '>= 1 Week',
    '>= 2 Weeks',
    '>= 1 Month',
    'N/A',
] as const

export const PrimarySecondaryUnknown = [
    'Primary',
    'Secondary',
    'Unknown',
] as const

export const StrongWeakCounterTherapeutic = [
    'Strong',
    'Weak',
    'Inconsistent',
    'Null',
    'Countertherapeutic',
] as const

export const StrongWeakCounterTherapeuticNA = [
    'Strong',
    'Weak',
    'Inconsistent',
    'Null',
    'Countertherapeutic',
    'N/A',
] as const

export function GetSelectOptionsFromTag(type: QuestionType) {
    switch (type) {
        case 'YesNo':
            return OptionsYesNo
        case 'YesNoNotApplicable':
            return OptionsYesNoNA
        case 'YesNoNotPossible':
            return OptionsYesNoNotPossible
        case 'CbPcbG':
            return OptionsContext
        case 'YIntOnlyYBothNo':
            return OptionsFidelity
        case 'GeneralizationOutcomes':
            return OptionsGeneralizationOutcomesMeasured
        case 'YesNoNotApplicableForSome':
            return OptionsYesNoNAForSome
        case 'MaintenancePeriod':
            return OptionsMaintenancePeriod
        case 'YesNoPartial':
            return OptionsYesNoPartial
        case 'PrimarySecondaryUnknown':
            return PrimarySecondaryUnknown
        case 'ConditionChangeCharacterization':
            return StrongWeakCounterTherapeutic
        case 'ConditionChangeCharacterizationNA':
            return StrongWeakCounterTherapeuticNA

        default:
            throw new Error(`Invalid Question Type: ${type}`)
    }
}
