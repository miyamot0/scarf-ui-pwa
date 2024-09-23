// instructions_view.test.tsx

import { render, screen } from '@testing-library/react'
import { Provider } from 'jotai'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DefaultStartingValue } from '@/atoms/db_atom'
import { InstructionsView } from '../instructions_view'

jest.doMock('jotai', () => ({
    useAtom: jest.fn().mockReturnValue([DefaultStartingValue]),
}))

describe('InstructionsView', () => {
    beforeEach(() => {
        render(
            <TooltipProvider>
                <Provider>
                    <InstructionsView />
                </Provider>
            </TooltipProvider>
        )
    })

    it('renders InstructionsView component', () => {
        const heading = screen.getByText('General Instructions')
        expect(heading).toBeInTheDocument()
    })

    it('renders the correct heading', () => {
        const heading = screen.getByRole('heading', {
            name: /General Instructions/i,
        })
        expect(heading).toBeInTheDocument()
    })
})
