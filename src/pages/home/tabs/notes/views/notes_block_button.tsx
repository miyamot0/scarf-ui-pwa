import { Toggle } from '@/components/ui/toggle'
import { isBlockActive, toggleBlock } from '../helpers/slate_helpers'
import { useSlate } from 'slate-react'
import { TEXT_ALIGN_TYPES } from '../types/slate_types'

export const BlockButton = ({ format, icon }: { format: any; icon: any }) => {
    const editor = useSlate()

    return (
        <Toggle
            pressed={isBlockActive(
                editor,
                format,
                TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
            )}
            onPressedChange={() => {
                toggleBlock(editor, format)
            }}
            className="border shadow"
        >
            {icon}
        </Toggle>
    )
}
