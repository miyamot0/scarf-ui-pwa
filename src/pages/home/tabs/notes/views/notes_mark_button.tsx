import { Toggle } from '@/components/ui/toggle'
import { useSlate } from 'slate-react'
import { isMarkActive, toggleMark } from '../helpers/slate_helpers'

export const MarkButton = ({ format, icon }: { format: any; icon: any }) => {
    const editor = useSlate()

    return (
        <Toggle
            pressed={isMarkActive(editor, format)}
            onPressedChange={() => {
                toggleMark(editor, format)
            }}
            className="border p-3 shadow"
        >
            {icon}
        </Toggle>
    )
}
