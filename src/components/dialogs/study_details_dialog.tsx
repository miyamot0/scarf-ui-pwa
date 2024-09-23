import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import { DialogContent, DialogDescription, DialogHeader, DialogOverlay } from '../ui/dialog';
import { StudyDetailsForm } from '../forms/study_details/study_details_form';
import { useContext } from 'react';
import { AppStateContext } from '../context/data-provider';

export function StudyDetailsDialog() {
  const { context, dispatch } = useContext(AppStateContext);

  return (
    <Dialog
      open={context.DialogState.dialog_type === 'study_details'}
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
            <DialogDescription>{`Editing study with tag: ${context.DialogState.study?.StudyTag}`}</DialogDescription>
          </DialogHeader>

          <StudyDetailsForm study={context.DialogState.study} />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
