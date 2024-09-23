// study_details_form.test.tsx
import {
    render,
    fireEvent,
    waitFor,
    getAllByRole,
} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Provider } from 'jotai'
import { DefaultStartingValue } from '@/atoms/db_atom'
import { StudyObject } from '@/questions/types/QuestionTypes'
import { StudyExternalValidityForm } from '../study_external_validity_form'
import {
    ExternalValidityQuestionDefault,
    InternalValidityQuestionDefault,
    OutcomesQuestionDefault,
    ReportingQuestionDefault,
} from '@/questions/questions_defaults'

jest.doMock('jotai/utils', () => ({
    useReducerAtom: jest
        .fn()
        .mockReturnValue([DefaultStartingValue, jest.fn()]),
}))

describe('StudyExternalValidityForm', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })

    it('calls onSubmit when the form is submitted', async () => {
        const testStudy: StudyObject = {
            StudyID: '1',
            StudyTag: '001',
            StudyAuthors: '---',
            StudyTitle: '---',
            StudyJournal: '---',
            StudyYear: 2000,
            InternalValidity: InternalValidityQuestionDefault,
            ExternalValidity: ExternalValidityQuestionDefault,
            Reporting: ReportingQuestionDefault,
            Outcomes: OutcomesQuestionDefault,
            PublicationType: 'Unclassified',
        }

        const { getByLabelText, getByRole, getAllByRole, container } = render(
            <TooltipProvider>
                <Provider>
                    <StudyExternalValidityForm study={testStudy} />
                </Provider>
            </TooltipProvider>
        )

        const select = container.querySelectorAll('select')

        fireEvent.change(select[0]!, {
            target: { value: 'No' },
        })

        fireEvent.change(select[5]!, {
            target: { value: 'No' },
        })

        fireEvent.change(select[6]!, {
            target: { value: 'No' },
        })

        fireEvent.change(select[7]!, {
            target: { value: 'No' },
        })

        fireEvent.change(select[9]!, {
            target: { value: 'No' },
        })

        fireEvent.change(select[11]!, {
            target: { value: 'No' },
        })

        fireEvent.change(select[12]!, {
            target: { value: 'No' },
        })

        const button = getAllByRole('button')

        await act(async () => {
            fireEvent.click(button[button.length - 1])
        })
    })
})
