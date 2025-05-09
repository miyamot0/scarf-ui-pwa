import { Dialog, DialogTitle } from '@radix-ui/react-dialog';
import { DialogContent, DialogDescription, DialogHeader, DialogOverlay } from '../ui/dialog';
import { useContext } from 'react';
import { ConsensusStateContext } from '@/pages/reliability/context/consensus-provider';
import { Button } from '../ui/button';
import { GlobalStateType } from '@/questions/types/GlobalStateType';
import { TypeOfValidityObject } from '@/questions/types/QuestionTypes';
import { toast } from 'sonner';

type ConsensusAction = 'Primary' | 'Reliability' | 'None';

export function ConsensusDialog() {
  const { context, setConsensusContext } = useContext(ConsensusStateContext);

  const { state } = context;

  const handleClose = () => {
    setConsensusContext((prev) => ({
      ...prev,
      state: undefined,
    }));
  };

  const handleUpdate = (decision: ConsensusAction) => {
    if (state === undefined) return;

    const { StudyID, Key, Primary, Reliability } = state;

    const depth = Key.length;

    if (decision === 'Primary') {
      let new_reliability = { ...context.reliability } as unknown as GlobalStateType;

      new_reliability.Studies = new_reliability.Studies?.map((study) => {
        if (study.StudyID === StudyID) {
          if (depth === 1) {
            return {
              ...study,
              [Key[0]]: Primary,
            };
          } else if (depth === 2) {
            let new_category = study[Key[0] as keyof typeof study] as TypeOfValidityObject;

            const updated_questions = new_category.Questions.map((question) => {
              if (question.QuestionID === Key[1]) {
                return {
                  ...question,
                  Response: Primary,
                };
              }

              return question;
            });

            return {
              ...study,
              [Key[0]]: {
                ...new_category,
                Questions: updated_questions,
              },
            };
          }
        }

        return study;
      });

      setConsensusContext({
        primary: context.primary,
        reliability: new_reliability,
        state: undefined,
      });

      toast('Updated record for Reliability recorder.', {
        description: 'Inspect the main table to review on-going consensus.',
        duration: 2000,
        dismissible: true,
      });
    }

    if (decision === 'Reliability') {
      let new_primary = { ...context.primary } as unknown as GlobalStateType;

      new_primary.Studies = new_primary.Studies?.map((study) => {
        if (study.StudyID === StudyID) {
          if (depth === 1) {
            return {
              ...study,
              [Key[0]]: Reliability,
            };
          } else if (depth === 2) {
            let new_category = study[Key[0] as keyof typeof study] as TypeOfValidityObject;

            const updated_questions = new_category.Questions.map((question) => {
              if (question.QuestionID === Key[1]) {
                return {
                  ...question,
                  Response: Reliability,
                };
              }

              return question;
            });

            return {
              ...study,
              [Key[0]]: {
                ...new_category,
                Questions: updated_questions,
              },
            };
          }
        }

        return study;
      });

      setConsensusContext({
        primary: new_primary,
        reliability: context.reliability,
        state: undefined,
      });

      toast('Updated record for Primary recorder.', {
        description: 'Inspect the main table to review on-going consensus.',
        duration: 2000,
        dismissible: true,
      });
    }
  };

  return (
    <Dialog open={state !== undefined} onOpenChange={() => handleClose()} modal={true}>
      <DialogOverlay>
        <DialogContent className="max-h-[80%] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Resolve Disagreements</DialogTitle>
            <DialogDescription>
              Confirm coding for: {context.state?.Key[context.state.Key.length - 1]}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-4 items-center">
              <div className="col-span-1">Primary: </div>
              <Button className="col-span-3 line-clamp-1 text-ellipsis" onClick={() => handleUpdate('Primary')}>
                {context.state?.Primary}
              </Button>
            </div>

            <div className="grid grid-cols-4 items-center">
              <div className="col-span-1">Reliability: </div>
              <Button className="col-span-3 line-clamp-1 text-ellipsis" onClick={() => handleUpdate('Reliability')}>
                {context.state?.Reliability}
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
