import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GlobalStateType } from '@/questions/types/GlobalStateType';
import { ReviewTypes } from '@/types/ReviewTypes';
import { SaveIcon } from 'lucide-react';
import { ConsensusStateContext } from '../context/consensus-provider';
import { useContext } from 'react';

export const PanelStatus = ({ state, type }: { state?: GlobalStateType; type: ReviewTypes }) => {
  const { context } = useContext(ConsensusStateContext);

  const loaded = state?.ReviewType === type;

  function saveTxtToFile(fileName: string, textData: string) {
    const blobData = new Blob([textData], { type: 'text/plain' });
    const urlToBlob = window.URL.createObjectURL(blobData);

    const a = document.createElement('a');
    a.style.setProperty('display', 'none');
    document.body.appendChild(a);
    a.href = urlToBlob;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(urlToBlob);
    a.remove();
  }

  if (!loaded) {
    return (
      <span>
        Status:{' '}
        <Badge variant={'destructive'} className="ml-2 dark:bg-red-600">
          Not Loaded
        </Badge>
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full">
      <p>{`Rater: ${state.ReviewName}`}</p>
      <p>{`Type: ${state.ReviewType}`}</p>
      <p>{`Study Count: ${state.Studies.length}`}</p>
      <span>
        Status:{' '}
        <Badge variant={'default'} className="ml-2 bg-green-500">
          Loaded
        </Badge>
      </span>
      <Button
        size={'sm'}
        className={cn('w-full hidden invisible', {
          'visible flex': loaded,
        })}
        onClick={() => {
          if (state.ReviewType === 'Primary') {
            const f_name = state.ReviewName ?? 'UNNAMED';
            const fileName = `${f_name}.json`;
            const textData = JSON.stringify(context.primary, null, 2);

            saveTxtToFile(fileName, textData);
          }

          if (state.ReviewType === 'Reliability') {
            const f_name = state.ReviewName ?? 'UNNAMED';
            const fileName = `${f_name}.json`;
            const textData = JSON.stringify(context.reliability, null, 2);

            saveTxtToFile(fileName, textData);
          }
        }}
      >
        <SaveIcon className="w-4 h-4 mr-2" /> Download {type} Data
      </Button>
    </div>
  );
};
