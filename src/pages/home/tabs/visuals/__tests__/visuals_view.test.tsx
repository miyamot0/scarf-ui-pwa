// instructions_view.test.tsx

import { render, screen } from '@testing-library/react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { VisualsView } from '../visuals_view'
import { DefaultStartingValueExpanded, dbAtom } from '@/atoms/db_atom'
import { JotaiTestProvider } from '@/__testing__/JotaiTestProvider'

describe('VisualsView', () => {
    beforeEach(() => {
        render(
            <TooltipProvider>
                <JotaiTestProvider
                    initialValues={[[dbAtom, DefaultStartingValueExpanded]]}
                >
                    <VisualsView />
                </JotaiTestProvider>
            </TooltipProvider>
        )
    })

    it('renders VisualsView component', () => {
        const heading = screen.getByText('Marker Type:')
        expect(heading).toBeInTheDocument()
    })
})
