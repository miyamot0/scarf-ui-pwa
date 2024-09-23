import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import { DialogContent, DialogDescription, DialogHeader, DialogOverlay } from '../ui/dialog';
import { StudyReportingForm } from '../forms/study_reporting_form/study_reporting_form';
import { useContext } from 'react';
import { AppStateContext } from '../context/data-provider';

export function StudyReportingDialog() {
  const { context, dispatch } = useContext(AppStateContext);

  return (
    <Dialog
      open={context.DialogState.dialog_type === 'study_reporting'}
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
            <DialogDescription>{`Editing reporting metrics`}</DialogDescription>
          </DialogHeader>

          <StudyReportingForm study={context.DialogState.study} />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
