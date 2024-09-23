// review_details_form.test.tsx
import { render, fireEvent, waitFor } from '@testing-library/react'
import { ReviewDetailsForm } from '../review_details_form'
import { act } from 'react-dom/test-utils'
import { TooltipProvider } from '@/components/ui/tooltip'
import { JotaiTestProvider } from '@/__testing__/JotaiTestProvider'
import { DefaultStartingValueExpanded, dbAtom } from '@/atoms/db_atom'

describe('ReviewDetailsForm', () => {
    it('renders correctly', () => {
        const { getByLabelText } = render(
            <TooltipProvider>
                <JotaiTestProvider
                    initialValues={[[dbAtom, DefaultStartingValueExpanded]]}
                >
                    <ReviewDetailsForm />
                </JotaiTestProvider>
            </TooltipProvider>
        )

        expect(getByLabelText('Review Title')).toBeInTheDocument()
    })

    it('calls onSubmit when the form is submitted', async () => {
        const { getByLabelText, getByRole, container } = render(
            <TooltipProvider>
                <JotaiTestProvider
                    initialValues={[[dbAtom, DefaultStartingValueExpanded]]}
                >
                    <ReviewDetailsForm />
                </JotaiTestProvider>
            </TooltipProvider>
        )

        fireEvent.change(getByLabelText('Review Title'), {
            target: { value: 'Test Title' },
        })

        const select = container.querySelector('select')

        fireEvent.change(select!, {
            target: { value: 'Reliability' },
        })

        await act(async () => {
            fireEvent.click(getByRole('button', { name: 'Update Review' }))
        })
    })
})
