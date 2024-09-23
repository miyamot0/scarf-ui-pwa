import { PanelStatus } from './data_set_status';
import { forwardRef } from 'react';
import { ReviewTypes } from '@/types/ReviewTypes';
import { ReliabilityState } from '@/types/ReliabilityState';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useForwardRef } from '@/components/hooks/useForwardRef';

interface CustomInputProps extends React.ComponentPropsWithoutRef<'input'> {
  coderType: ReviewTypes;
  reliabilityState: ReliabilityState;
  setReliState: (state: ReliabilityState) => void;
}

export const DataInputPanelWithRef = forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
  const { coderType, reliabilityState, setReliState } = props;

  const relevantState = coderType === 'Primary' ? reliabilityState.primary : reliabilityState.reliability;

  const inputRef = useForwardRef<HTMLInputElement>(ref);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{`${coderType} Coder`}</CardTitle>
        <CardDescription>{`Input relevant file for the ${coderType} role`}</CardDescription>
      </CardHeader>
      <CardContent>
        <input
          ref={inputRef}
          id={coderType}
          type="file"
          accept="application/JSON"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = (e) => {
                const text = e.target?.result as string;
                const state = JSON.parse(text);

                if (coderType === 'Primary') {
                  setReliState({
                    ...reliabilityState,
                    primary: state,
                  });
                } else {
                  setReliState({
                    ...reliabilityState,
                    reliability: state,
                  });
                }

                if (state.ReviewType !== coderType) {
                  toast.error('Error: Mismatched file type', {
                    description: `An incorrect coder file was loaded as a ${coderType} coder file`,
                    duration: 2000,
                  });

                  inputRef?.current?.setAttribute('value', '');
                  inputRef?.current?.setAttribute('type', 'text');
                  inputRef?.current?.setAttribute('type', 'file');
                }
              };
              reader.readAsText(file);
            }
          }}
        />
      </CardContent>
      <CardFooter>
        <PanelStatus state={relevantState} type={coderType} />
      </CardFooter>
    </Card>
  );
});

DataInputPanelWithRef.displayName = 'DataInputPanelWithRef';
