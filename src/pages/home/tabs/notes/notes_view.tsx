import { useMemo, useCallback, useContext } from 'react';
import { Descendant, createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
} from 'lucide-react';
import isHotkey from 'is-hotkey';
import { MenuToolbar } from './views/notes_toolbar';
import { NotesElement } from './views/notes_element';
import { NotesLeaf } from './views/notes_leaf';
import { BlockButton } from './views/notes_block_button';
import { MarkButton } from './views/notes_mark_button';
import { toggleMark } from './helpers/slate_helpers';
import { HOTKEYS } from './types/slate_types';
import { AppStateContext } from '@/components/context/data-provider';
import { GlobalStateType } from '@/questions/types/GlobalStateType';

const initialValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'Enter notes for the review here as necessary or helpful.',
      },
    ],
  },
] as unknown as Descendant[];

export function NotesTabView({ readonly, state }: { readonly?: boolean; state?: GlobalStateType }) {
  const { context, dispatch } = useContext(AppStateContext);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderElement = useCallback((props: any) => <NotesElement {...props} />, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderLeaf = useCallback((props: any) => <NotesLeaf {...props} />, []);

  const state_to_manage = readonly ? state! : context;

  return (
    <Slate
      editor={editor}
      initialValue={state_to_manage.Notes ?? initialValue}
      onChange={(value: Descendant[]) => {
        if (readonly) return;

        const isAstChange = editor.operations.some((op) => 'set_selection' !== op.type);
        if (isAstChange) {
          dispatch({
            type: 'update_notes',
            payload: {
              notes: value,
            },
          });
        }
      }}
    >
      {!readonly && (
        <MenuToolbar>
          <MarkButton format="bold" icon={<BoldIcon className="h-4 w-4" />} />
          <MarkButton format="italic" icon={<ItalicIcon className="h-4 w-4" />} />
          <MarkButton format="underline" icon={<UnderlineIcon className="h-4 w-4" />} />

          <BlockButton format="left" icon={<AlignLeftIcon className="h-4 w-4 p-0 m-0" />} />
          <BlockButton format="center" icon={<AlignCenterIcon className="h-4 w-4" />} />
          <BlockButton format="right" icon={<AlignRightIcon className="h-4 w-4" />} />
          <BlockButton format="justify" icon={<AlignJustifyIcon className="h-4 w-4" />} />
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              // @ts-expect-error - TS doesn't like the type of hotkey
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
}
