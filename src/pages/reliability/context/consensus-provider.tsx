import { ReliabilityState } from '@/types/ReliabilityState';
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

const DEFAULT_CONTEXT: ReliabilityState = {
  primary: undefined,
  reliability: undefined,
  key: undefined,
};

export const ConsensusStateContext = createContext({
  context: DEFAULT_CONTEXT,
  setConsensusContext: undefined as unknown as Dispatch<SetStateAction<ReliabilityState>>,
});

/**
 * Folder context provider
 *
 * @param children
 * @returns
 */
export function ConsensusStateContextProvider({ children }: { children: ReactNode }) {
  const [context, setConsensusContext] = useState<ReliabilityState>(DEFAULT_CONTEXT);

  return (
    <ConsensusStateContext.Provider
      value={{
        context,
        setConsensusContext,
      }}
    >
      {children}
    </ConsensusStateContext.Provider>
  );
}
