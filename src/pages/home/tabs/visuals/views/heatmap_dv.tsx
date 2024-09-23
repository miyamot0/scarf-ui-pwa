import { ExternalValidityQuestions } from '@/questions/simplified_questions'
import { GlobalStateType } from '@/questions/types/GlobalStateType'
import {
    StudyCodedBlock,
    StudyItemTooltip,
    StudyTitle,
} from './views/heatmap_subviews'

export function HeatmapDV(state: GlobalStateType) {
    return (
        <div className="flex flex-col gap-y-4 overflow-x-auto">
            <table className="border-separate border-spacing-[1px]">
                <thead>
                    <tr>
                        <th className="min-w-[200px]"></th>
                        {state.Studies.map((r) => (
                            <StudyTitle
                                key={`ev-header-${r.StudyID}`}
                                text={r.StudyTag}
                            />
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {ExternalValidityQuestions.map((q) => {
                        return (
                            <tr key={`ev-row-${q.QuestionID}`}>
                                <td>
                                    <StudyItemTooltip Question={q} />
                                </td>

                                {state.Studies.map((r) => {
                                    const question =
                                        r.ExternalValidity.Questions.find(
                                            (q2) =>
                                                q2.QuestionID === q.QuestionID
                                        )?.Response

                                    return (
                                        <StudyCodedBlock
                                            key={`code-block-ev-${r.StudyID}`}
                                            Response={question}
                                        />
                                    )
                                })}

                                <td className="w-full"></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
