import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import { QuestionObjectHolder } from '@/questions/types/QuestionTypes'

export function StudyTitle({ text }: { text: string }) {
    return (
        <th className="[writing-mode:vertical-lr] rotate-180 text-start pt-2">
            {text}
        </th>
    )
}

export function StudyItemTooltip({
    Question,
}: {
    Question?: QuestionObjectHolder
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className="pr-2 whitespace-nowrap">
                    {Question?.QuestionID.replaceAll('_', ' ')}
                </div>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
                <p className="max-w-[300px]">{Question?.QuestionStem}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export function StudyCodedBlock({ Response }: { Response?: string }) {
    let coding = 'gray'

    switch (Response) {
        case 'Yes':
        case 'SCD':
        case '>= 1 Month':
        case 'Generalized':
        case 'Yes, Both Conditions':
            coding = 'green'
            break
        case 'No':
        case 'None':
        case 'Post Only':
        case 'Immediately after Cessation':
        case 'Context Bound':
            coding = 'red'
            break
        case 'Partial':
        case 'For Some':
        case 'Intermittent':
        case 'Pre/Post':
        case '>= 1 Week':
        case '>= 2 Weeks':
        case 'Partially Context Bound':
        case 'Yes, Intervention Only':
            coding = 'yellow'
            break
    }

    return (
        <td
            className="data-[coding=green]:bg-green-500 data-[coding=red]:bg-red-300 data-[coding=yellow]:bg-amber-400 bg-gray-200 rounded border-transparent"
            data-coding={coding}
        ></td>
    )
}
