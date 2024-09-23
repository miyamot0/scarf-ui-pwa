import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import { DialogContent, DialogDescription, DialogHeader, DialogOverlay } from '../ui/dialog';
import { ReviewDetailsForm } from '../forms/review_details/review_details_form';
import { AppStateContext } from '../context/data-provider';
import { useContext } from 'react';

export function ReviewDetailsDialog() {
  const { context, dispatch } = useContext(AppStateContext);

  return (
    <Dialog
      open={context.DialogState.dialog_type === 'review_details'}
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
            <DialogTitle>Review Information Editor</DialogTitle>
            <DialogDescription>Edit information related to review</DialogDescription>
          </DialogHeader>

          <ReviewDetailsForm />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
