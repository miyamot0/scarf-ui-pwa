import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import { DialogContent, DialogDescription, DialogHeader, DialogOverlay } from '../ui/dialog';
import { StudyExternalValidityForm } from '../forms/study_external_validity/study_external_validity_form';
import { AppStateContext } from '../context/data-provider';
import { useContext } from 'react';

export function StudyExternalValidityDialog() {
  const { context, dispatch } = useContext(AppStateContext);

  return (
    <Dialog
      open={context.DialogState.dialog_type === 'study_external_validity'}
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
            <DialogDescription>{`Editing external validity metrics`}</DialogDescription>
          </DialogHeader>

          <StudyExternalValidityForm study={context.DialogState.study} />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
