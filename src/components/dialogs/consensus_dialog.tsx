import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import { DialogContent, DialogDescription, DialogHeader, DialogOverlay } from '../ui/dialog';
import { useContext } from 'react';
import { ConsensusStateContext } from '@/pages/reliability/context/consensus-provider';

export function ConsensusDialog() {
  const { context, setConsensusContext } = useContext(ConsensusStateContext);

  return (
    <Dialog
      open={context.key !== undefined}
      onOpenChange={() => {
        setConsensusContext((prev) => ({
          ...prev,
          key: undefined,
        }));
      }}
      modal={true}
    >
      <DialogOverlay>
        <DialogContent className="max-h-[80%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Resolve Disagreements</DialogTitle>
            <DialogDescription>Confirm coding for: {context.key}</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4"></div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
