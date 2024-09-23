import { dbAtom } from '@/atoms/db_atom'
import { database_reducer } from '@/atoms/reducers/reducer'
import { useReducerAtomLocal as useReducerAtom } from '@/components/hooks/useReducerAtomLocal'
import React, { useMemo, useCallback } from 'react'
import { Descendant, createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'
import {
    AlignCenterIcon,
    AlignJustifyIcon,
    AlignLeftIcon,
    AlignRightIcon,
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
} from 'lucide-react'
import isHotkey from 'is-hotkey'
import { MenuToolbar } from './views/notes_toolbar'
import { NotesElement } from './views/notes_element'
import { NotesLeaf } from './views/notes_leaf'
import { BlockButton } from './views/notes_block_button'
import { MarkButton } from './views/notes_mark_button'
import { toggleMark } from './helpers/slate_helpers'
import { HOTKEYS } from './types/slate_types'

const initialValue = [
    {
        type: 'paragraph',
        children: [
            {
                text: 'Enter notes for the review here as necessary or helpful.',
            },
        ],
    },
] satisfies Descendant[]

export function NotesTabView({ readonly }: { readonly?: boolean }) {
    const [state, dispatch] = useReducerAtom(dbAtom, database_reducer)
    const editor = useMemo(() => withHistory(withReact(createEditor())), [])

    const renderElement = useCallback(
        (props: any) => <NotesElement {...props} />,
        []
    )
    const renderLeaf = useCallback((props: any) => <NotesLeaf {...props} />, [])

    return (
        <Slate
            editor={editor}
            initialValue={state.Notes ?? initialValue}
            onChange={(value: Descendant[]) => {
                if (readonly) return

                const isAstChange = editor.operations.some(
                    (op) => 'set_selection' !== op.type
                )
                if (isAstChange) {
                    dispatch({
                        type: 'update_notes',
                        payload: {
                            notes: value,
                        },
                    })
                }
            }}
        >
            {!readonly && (
                <MenuToolbar>
                    <MarkButton
                        format="bold"
                        icon={<BoldIcon className="h-4 w-4" />}
                    />
                    <MarkButton
                        format="italic"
                        icon={<ItalicIcon className="h-4 w-4" />}
                    />
                    <MarkButton
                        format="underline"
                        icon={<UnderlineIcon className="h-4 w-4" />}
                    />

                    <BlockButton
                        format="left"
                        icon={<AlignLeftIcon className="h-4 w-4 p-0 m-0" />}
                    />
                    <BlockButton
                        format="center"
                        icon={<AlignCenterIcon className="h-4 w-4" />}
                    />
                    <BlockButton
                        format="right"
                        icon={<AlignRightIcon className="h-4 w-4" />}
                    />
                    <BlockButton
                        format="justify"
                        icon={<AlignJustifyIcon className="h-4 w-4" />}
                    />
                </MenuToolbar>
            )}
            <Editable
                className="p-2 border rounded"
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                spellCheck
                autoFocus
                readOnly={readonly}
                onKeyDown={(event) => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event as any)) {
                            event.preventDefault()
                            //@ts-ignore Pull by name
                            const mark = HOTKEYS[hotkey]
                            toggleMark(editor, mark)
                        }
                    }
                }}
            />
        </Slate>
    )
}
