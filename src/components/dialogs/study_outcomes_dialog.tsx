import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import { DialogContent, DialogDescription, DialogHeader, DialogOverlay } from '../ui/dialog';
import { StudyOutcomesForm } from '../forms/study_outcomes_form/study_outcomes_form';
import { useContext } from 'react';
import { AppStateContext } from '../context/data-provider';

export function StudyOutcomesDialog() {
  const { context, dispatch } = useContext(AppStateContext);

  return (
    <Dialog
      open={context.DialogState.dialog_type === 'study_outcomes'}
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
      }}
      modal={true}
    >
      <DialogOverlay>
        <DialogContent className="max-h-[80%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Study Information Editor</DialogTitle>
            <DialogDescription>{`Editing outcome metrics`}</DialogDescription>
          </DialogHeader>

          <StudyOutcomesForm study={context.DialogState.study} />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
