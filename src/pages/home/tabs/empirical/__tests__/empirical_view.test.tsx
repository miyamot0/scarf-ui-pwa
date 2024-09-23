// empirical_view.test.tsx

import { render, screen } from '@testing-library/react'
import { EmpiricalTabView } from '../empirical_view'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DefaultStartingValueExpanded, dbAtom } from '@/atoms/db_atom'
import { JotaiTestProvider } from '@/__testing__/JotaiTestProvider'

describe('EmpiricalTabView', () => {
    beforeEach(() => {
        render(
            <TooltipProvider>
                <JotaiTestProvider
                    initialValues={[[dbAtom, DefaultStartingValueExpanded]]}
                >
                    <EmpiricalTabView />
                </JotaiTestProvider>
            </TooltipProvider>
        )
    })

    it('renders EmpiricalTabView component', () => {
        const heading = screen.getByText('Data Inspection and Review')
        expect(heading).toBeInTheDocument()
    })

    it('renders the correct heading', () => {
        const heading = screen.getByRole('heading', {
            name: /Data Inspection and Review/i,
        })
        expect(heading).toBeInTheDocument()
    })
})
