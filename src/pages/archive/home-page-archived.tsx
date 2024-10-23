import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { cn } from '@/lib/utils';
import { Hero } from '../home/views/hero';
import { toast } from 'sonner';
import { DisplayStateType } from '@/questions/types/DisplayStateTypes';
import { GlobalStateType, SavedGlobalStateType } from '@/questions/types/GlobalStateType';
import { PlanningView } from '../home/tabs/planning/planning_view';
import { StudiesView } from '../home/tabs/studies/studies_view';
import { EmpiricalTabView } from '../home/tabs/empirical/empirical_view';
import { VisualsView } from '../home/tabs/visuals/visuals_view';
import { NotesTabView } from '../home/tabs/notes/notes_view';

import { useLoaderData } from 'react-router-dom';
import { DefaultStartingValue } from '@/types/app-state';
import PageWrapper from '@/components/layout/page-wrapper';

// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
export async function loader({ params }: any) {
  if (!params.id) return undefined;

  const response = await fetch(`/archives/${params.id}.json`);
  return await response.json();
}

export default function HomePageArchived() {
  const archived_file = useLoaderData() as SavedGlobalStateType | undefined;

  const [state, setActiveState] = useState<GlobalStateType>(
    archived_file
      ? {
          ...archived_file,
          DisplayState: 'studies' as DisplayStateType,
        }
      : DefaultStartingValue
  );

  const catch_navigation = (local_state: GlobalStateType, display: DisplayStateType) => {
    if (local_state.DisplayState === display) return;

    if (local_state.ReviewPlans.Status === 'NotStarted') {
      toast('Please complete the planning tab before proceeding.', {
        duration: 2000,
      });

      return;
    }

    setActiveState((prev: GlobalStateType) => {
      return {
        ...prev,
        DisplayState: display,
      };
    });
  };

  return (
    <PageWrapper>
      <Hero />
      <div className="flex flex-col gap-y-4 w-full">
        <Card className="w-full">
          <CardHeader className="flex flex-row justify-between">
            <div className="flex flex-col">
              <CardTitle>{`Archived Review: ${state.ReviewName ?? 'Loading...'}`}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={state.DisplayState} className={cn('w-full flex flex-col gap-y-4')}>
              <TabsList className="w-full flex flex-wrap md:flex-nowrap flex-row border h-fit">
                <TabsTrigger
                  value="planning"
                  className="w-full"
                  onClick={() => {
                    if (state.DisplayState === 'planning') return;

                    setActiveState((prev: GlobalStateType) => {
                      return {
                        ...prev,
                        DisplayState: 'planning',
                      };
                    });
                  }}
                >
                  Planning
                </TabsTrigger>
                <TabsTrigger
                  value="studies"
                  className={cn('w-full', state.ReviewPlans.Status === 'NotStarted' ? 'opacity-50' : '')}
                  onClick={() => catch_navigation(state, 'studies')}
                >
                  Coding
                </TabsTrigger>
                <TabsTrigger
                  value="empirical"
                  className={cn('w-full', state.ReviewPlans.Status === 'NotStarted' ? 'opacity-50' : '')}
                  onClick={() => catch_navigation(state, 'empirical')}
                >
                  Data Inspection
                </TabsTrigger>
                <TabsTrigger
                  value="visuals"
                  className={cn('w-full', state.ReviewPlans.Status === 'NotStarted' ? 'opacity-50' : '')}
                  onClick={() => catch_navigation(state, 'visuals')}
                >
                  Data Visualization
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className={cn('w-full', state.ReviewPlans.Status === 'NotStarted' ? 'opacity-50' : '')}
                  onClick={() => catch_navigation(state, 'notes')}
                >
                  Review Notes
                </TabsTrigger>
              </TabsList>
              <TabsContent value="planning">
                <PlanningView readonly={true} context={state} />
              </TabsContent>
              <TabsContent value="studies">
                <StudiesView readonly={true} context={state} />
              </TabsContent>
              <TabsContent value="empirical">
                <EmpiricalTabView readonly={true} context={state} />
              </TabsContent>
              <TabsContent value="visuals">
                <VisualsView context={state} />
              </TabsContent>
              <TabsContent value="notes">
                <NotesTabView readonly={true} state={state} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
