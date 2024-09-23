import { render } from '@testing-library/react'
import { PanelStatus } from '../data_set_status'
import { DefaultStartingValue } from '@/atoms/db_atom'

describe('PanelStatus', () => {
    it('renders without error', () => {
        render(
            <PanelStatus
                state={{
                    ...DefaultStartingValue,
                    ReviewType: 'Primary',
                    DisplayState: 'empirical',
                }}
                type="Primary"
            />
        )
    })

    it('renders without error', () => {
        render(
            <PanelStatus
                state={{
                    ...DefaultStartingValue,
                    ReviewType: 'Primary',
                    DisplayState: 'empirical',
                }}
                type="Reliability"
            />
        )
    })
})
