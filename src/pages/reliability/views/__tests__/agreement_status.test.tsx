import { render } from '@testing-library/react'
import { AgreementStatus } from '../agreement_status'
import { ReliabilityState } from '@/types/ReliabilityState'
import { DefaultStartingValueExpanded } from '@/atoms/db_atom'
import { GlobalStateType } from '@/questions/types/GlobalStateType'

describe('AgreementStatus', () => {
    it('renders without error', () => {
        const state: ReliabilityState = {
            primary: DefaultStartingValueExpanded as GlobalStateType,
            reliability: {
                ...DefaultStartingValueExpanded,
                ReviewType: 'Reliability',
            } as GlobalStateType,
        }

        render(<AgreementStatus state={state} />)
    })

    it('renders empty if undefined', () => {
        const state: ReliabilityState = {
            primary: undefined,
            reliability: undefined,
        }

        render(<AgreementStatus state={state} />)
    })
})
