import { ContextQueryType } from '@/pages/reliability/context/consensus-provider';
import { GlobalStateType } from '@/questions/types/GlobalStateType';

export type ReliabilityState = {
  primary?: GlobalStateType;
  reliability?: GlobalStateType;
  state?: ContextQueryType;
};
