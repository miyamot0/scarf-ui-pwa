// instructions_view.test.tsx

import { render, screen } from '@testing-library/react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DefaultStartingValueExpanded, dbAtom } from '@/atoms/db_atom'
import { StudiesView } from '../studies_view'
import { JotaiTestProvider } from '@/__testing__/JotaiTestProvider'

describe('StudiesView', () => {
    beforeEach(() => {
        render(
            <TooltipProvider>
                <JotaiTestProvider
                    initialValues={[[dbAtom, DefaultStartingValueExpanded]]}
                >
                    <StudiesView />
                </JotaiTestProvider>
            </TooltipProvider>
        )
    })

    it('renders StudiesView component', () => {
        const heading = screen.getByText('Study Coding')
        expect(heading).toBeInTheDocument()
    })

    it('renders the correct heading', () => {
        const heading = screen.getByRole('heading', {
            name: /Study Coding/i,
        })
        expect(heading).toBeInTheDocument()
    })
})
