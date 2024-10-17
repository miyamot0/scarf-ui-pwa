import { Badge } from '@/components/ui/badge';
import { GlobalStateType } from '@/questions/types/GlobalStateType';
import { ReviewTypes } from '@/types/ReviewTypes';

export const PanelStatus = ({ state, type }: { state?: GlobalStateType; type: ReviewTypes }) => {
  const loaded = state?.ReviewType === type;

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
    <div className="flex flex-col gap-y-2">
      <p>{`Rater: ${state.ReviewName}`}</p>
      <p>{`Type: ${state.ReviewType}`}</p>
      <p>{`Study Count: ${state.Studies.length}`}</p>
      <span>
        Status:{' '}
        <Badge variant={'default'} className="ml-2 bg-green-500">
          Loaded
        </Badge>
      </span>
    </div>
  );
};
