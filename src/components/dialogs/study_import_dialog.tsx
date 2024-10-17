import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import { DialogContent, DialogDescription, DialogHeader, DialogOverlay } from '../ui/dialog';
import Spreadsheet, { CellBase, Matrix } from 'react-spreadsheet';
import { useContext, useState } from 'react';
import { Button } from '../ui/button';
import { StudyObject } from '@/questions/types/QuestionTypes';
import { v4 as uuidv4 } from 'uuid';
import {
  ExternalValidityQuestionDefault,
  InternalValidityQuestionDefault,
  OutcomesQuestionDefault,
  ReportingQuestionDefault,
} from '@/questions/questions_defaults';
import { toast } from 'sonner';
import { AppStateContext } from '../context/data-provider';
import { useTheme } from '../ui/theme-provider';

const STUDY_LABELS = ['Tag', 'Authors', 'Title', 'Journal', 'Year'];

const DEFAULT_DATA = [
  [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
  [{ value: '' }, { value: '' }, { value: '' }, { value: '' }, { value: '' }],
];

export function StudyImportDialog() {
  const { context, dispatch } = useContext(AppStateContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<Matrix<CellBase<any>>>(DEFAULT_DATA);

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  function onSubmit() {
    const studies: StudyObject[] = [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.forEach((row: (CellBase<any> | undefined)[]) => {
      if (!row) return;

      try {
        const values = [
          row.at(0)!.value.toString().trim(),
          row.at(1)!.value.toString().trim(),
          row.at(2)!.value.toString().trim(),
          row.at(3)!.value.toString().trim(),
          row.at(4)!.value.toString().trim(),
        ];

        const StudyTag = values[0].length > 0 ? values[0] : undefined;
        const StudyAuthors = values[1].length > 0 ? values[1] : undefined;
        const StudyTitle = values[2].length > 0 ? values[2] : undefined;
        const StudyJournal = values[3].length > 0 ? values[3] : undefined;
        const StudyYear = values[4].length > 0 ? values[4] : undefined;

        if (!StudyTag || !StudyAuthors || !StudyTitle || !StudyJournal || !StudyYear) {
          return;
        }

        studies.push({
          StudyID: uuidv4(),
          StudyTag: StudyTag ?? '',
          StudyTitle: StudyTitle ?? '',
          StudyAuthors: StudyAuthors ?? '',
          StudyJournal: StudyJournal ?? '',
          StudyYear: StudyYear ? parseInt(StudyYear) : -1,
          InternalValidity: { ...InternalValidityQuestionDefault },
          ExternalValidity: { ...ExternalValidityQuestionDefault },
          Reporting: { ...ReportingQuestionDefault },
          Outcomes: { ...OutcomesQuestionDefault },
          PublicationType: 'Unclassified',
        } satisfies StudyObject);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        return;
      }
    });

    if (studies.length === 0) {
      toast.error('Failed to import studies', {
        duration: 2000,
        dismissible: true,
        description: 'No complete records were found in the widget.',
      });
    } else {
      dispatch({
        type: 'bulk_import_studies',
        payload: { studies },
      });

      toast(`Imported ${studies.length} studies into data set.`, {
        duration: 2000,
        dismissible: true,
        description: 'Review the imported data set to ensure correct import.',
      });
    }
  }

  return (
    <Dialog
      open={context.DialogState.dialog_type === 'study_import'}
      onOpenChange={() => {
        dispatch({
          type: 'update_dialog_state',
          payload: {
            dialog_state: {
              dialog_type: undefined,
              study: undefined,
            },
          },
        });

        setData(DEFAULT_DATA);
      }}
      modal={true}
    >
      <DialogOverlay>
        <DialogContent className="max-h-[80%] overflow-y-auto max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Study Import Widget</DialogTitle>
            <DialogDescription>You may paste in spreadsheet data to bulk import studies.</DialogDescription>
          </DialogHeader>

          <Spreadsheet
            darkMode={isDark}
            data={data}
            onChange={setData}
            columnLabels={STUDY_LABELS}
            hideRowIndicators={false}
            RowIndicator={undefined}
          />

          <Button size={'lg'} onClick={onSubmit}>
            Bulk Import
          </Button>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
