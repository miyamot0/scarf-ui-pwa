// study_details_form.test.tsx
import { render, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Provider } from 'jotai'
import { StudyDetailsForm } from '../study_details_form'
import { StudyObject } from '@/questions/types/QuestionTypes'
import { JotaiTestProvider } from '@/__testing__/JotaiTestProvider'
import { DefaultStartingValueExpanded, dbAtom } from '@/atoms/db_atom'

describe('StudyDetailsForm', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it.skip('calls onSubmit when the form is submitted, should bomb because no id present', async () => {
        const { getByLabelText, getByRole } = render(
            <JotaiTestProvider
                initialValues={[[dbAtom, DefaultStartingValueExpanded]]}
            >
                <Provider>
                    <StudyDetailsForm />
                </Provider>
            </JotaiTestProvider>
        )

        fireEvent.change(getByLabelText('Study Code'), {
            target: { value: '001' },
        })

        fireEvent.change(getByLabelText('Study Authors'), {
            target: { value: '---' },
        })

        fireEvent.change(getByLabelText('Study Title'), {
            target: { value: '---' },
        })

        fireEvent.change(getByLabelText('Study Journal'), {
            target: { value: '---' },
        })

        fireEvent.change(getByLabelText('Study Year'), {
            target: { value: 2000 },
        })

        await act(async () => {
            expect(() => {
                fireEvent.click(getByRole('button', { name: 'Update Study' }))
            }).toThrow('Study should not be undefined')
        })
    })

    it('calls onSubmit when the form is submitted', async () => {
        const testStudy: StudyObject = {
            StudyID: '1',
            StudyTag: '001',
            StudyAuthors: '---',
            StudyTitle: '---',
            StudyJournal: '---',
            StudyYear: 2000,
            InternalValidity: {
                Status: 'NotStarted',
                Questions: [],
            },
            ExternalValidity: {
                Status: 'NotStarted',
                Questions: [],
            },
            Reporting: {
                Status: 'NotStarted',
                Questions: [],
            },
            Outcomes: {
                Status: 'NotStarted',
                Questions: [],
            },
            PublicationType: 'Journal',
        }

        const { getByLabelText, getByRole } = render(
            <TooltipProvider>
                <Provider>
                    <StudyDetailsForm study={testStudy} />
                </Provider>
            </TooltipProvider>
        )

        fireEvent.change(getByLabelText('Study Code'), {
            target: { value: '001' },
        })

        fireEvent.change(getByLabelText('Study Authors'), {
            target: { value: '---' },
        })

        fireEvent.change(getByLabelText('Study Title'), {
            target: { value: '---' },
        })

        fireEvent.change(getByLabelText('Study Journal'), {
            target: { value: '---' },
        })

        fireEvent.change(getByLabelText('Study Year'), {
            target: { value: 2000 },
        })

        await act(async () => {
            fireEvent.click(getByRole('button', { name: 'Update Study' }))
        })
    })
})
