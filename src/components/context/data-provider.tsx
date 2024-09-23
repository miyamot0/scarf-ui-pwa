import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GlobalStateType } from '@/questions/types/GlobalStateType';
import { DefaultStartingValue } from '@/types/app-state';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { DatabaseAction } from './reducers/reducer_types';
import { database_reducer } from './reducers/reducer';

export type GlobalContextType = {
  context: GlobalStateType;
  dispatch: (action: DatabaseAction) => void;
  saveSettings: (context: GlobalStateType) => void;
};

const KEY_LOCAL_STORAGE = 'scarf-web-ui';

export const AppStateContext = createContext({
  context: DefaultStartingValue,
  setAppContext: undefined as unknown as Dispatch<SetStateAction<GlobalStateType>>,
  dispatch: undefined as unknown as (action: DatabaseAction) => void,
});

/**
 * Folder context provider
 *
 * @param children
 * @returns
 */
export function AppStateContextProvider({ children }: { children: ReactNode }) {
  const [context, setAppContext] = useState<GlobalStateType>(DefaultStartingValue);

  const dispatch = (action: DatabaseAction) => {
    const new_context = database_reducer(context, action);

    setAppContext(new_context);

    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(new_context));
  };

  useEffect(() => {
    const settings = localStorage.getItem(KEY_LOCAL_STORAGE);
    if (settings) {
      const parsedSettings = JSON.parse(settings);

      if (parsedSettings) {
        setAppContext(parsedSettings);
      }
    }

    () => {};
  }, []);

  return (
    <TooltipProvider>
      <AppStateContext.Provider
        value={{
          context,
          dispatch,
          setAppContext,
        }}
      >
        {children}
        <Toaster richColors expand={false} duration={3000} />
      </AppStateContext.Provider>
    </TooltipProvider>
  );
}
