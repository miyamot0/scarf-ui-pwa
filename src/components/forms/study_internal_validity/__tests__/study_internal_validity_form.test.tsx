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
import {
    DefaultStartingValue,
    DefaultStartingValueExpanded,
    dbAtom,
} from '@/atoms/db_atom'
import { StudyObject } from '@/questions/types/QuestionTypes'
import {
    ExternalValidityQuestionDefault,
    InternalValidityQuestionDefault,
    OutcomesQuestionDefault,
    ReportingQuestionDefault,
} from '@/questions/questions_defaults'
import { StudyInternalValidityForm } from '../study_internal_validity_form'
import { JotaiTestProvider } from '@/__testing__/JotaiTestProvider'

jest.doMock('jotai/utils', () => ({
    useReducerAtom: jest
        .fn()
        .mockReturnValue([DefaultStartingValue, jest.fn()]),
}))

describe('StudyInternalValidityForm', () => {
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
                <JotaiTestProvider
                    initialValues={[[dbAtom, DefaultStartingValueExpanded]]}
                >
                    <StudyInternalValidityForm study={testStudy} />
                </JotaiTestProvider>
            </TooltipProvider>
        )

        const select = container.querySelectorAll('select')

        fireEvent.change(select[0]!, {
            target: { value: 'No' },
        })
        fireEvent.change(select[1]!, {
            target: { value: 'No' },
        })
        fireEvent.change(select[2]!, {
            target: { value: 'No' },
        })
        fireEvent.change(select[3]!, {
            target: { value: 'No' },
        })
        fireEvent.change(select[4]!, {
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
        fireEvent.change(select[8]!, {
            target: { value: 'No' },
        })
        fireEvent.change(select[9]!, {
            target: { value: 'No' },
        })
        fireEvent.change(select[10]!, {
            target: { value: 'No' },
        })
        fireEvent.change(select[11]!, {
            target: { value: 'No' },
        })
        fireEvent.change(select[12]!, {
            target: { value: 'No' },
        })
        fireEvent.change(select[13]!, {
            target: { value: 'No' },
        })
        fireEvent.change(select[14]!, {
            target: { value: 'No' },
        })
        fireEvent.change(select[15]!, {
            target: { value: 'No' },
        })

        const button = getAllByRole('button')

        await act(async () => {
            fireEvent.click(button[button.length - 1])
        })
    })
})
