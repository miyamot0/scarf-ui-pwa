import { useContext, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { cn } from '@/lib/utils';
import { Hero } from '../home/views/hero';
import { toast } from 'sonner';
import { DisplayStateType } from '@/questions/types/DisplayStateTypes';
import { GlobalStateType, SavedGlobalStateType } from '@/questions/types/GlobalStateType';
import { AppStateContext } from '@/components/context/data-provider';
import { PlanningView } from '../home/tabs/planning/planning_view';
import { StudiesView } from '../home/tabs/studies/studies_view';
import { EmpiricalTabView } from '../home/tabs/empirical/empirical_view';
import { VisualsView } from '../home/tabs/visuals/visuals_view';
import { NotesTabView } from '../home/tabs/notes/notes_view';

import archive_1 from '../../assets/archives/Bilingual Communication Training Review_Primary_2024-7-19 (4).json';
import archive_2 from '../../assets/archives/fbbcccbf-df50-40c2-b4eb-5ab171cdc69c.json';
import { useLoaderData } from 'react-router-dom';
import { DefaultStartingValue } from '@/types/app-state';
import PageWrapper from '@/components/layout/page-wrapper';

export async function loader({ params }: any) {
  if (!params.id) return undefined;

  const archived_files = [archive_1, archive_2];

  return archived_files.find((f) => f.ID === params.id);
}

export default function HomePageArchived() {
  const archived_file = useLoaderData() as SavedGlobalStateType | undefined;
  const { context, dispatch } = useContext(AppStateContext);

  useEffect(() => {
    if (archived_file) {
      dispatch({
        type: 'load_external',
        payload: {
          saved_state: {
            ...archived_file,
            DisplayState: 'studies' as DisplayStateType,
          },
        },
      });
    } else {
      dispatch({
        type: 'load_external',
        payload: {
          saved_state: DefaultStartingValue,
        },
      });
    }
  }, []);

  const catch_navigation = (local_state: GlobalStateType, display: DisplayStateType) => {
    if (local_state.DisplayState === display) return;

    if (local_state.ReviewPlans.Status === 'NotStarted') {
      toast('Please complete the planning tab before proceeding.', {
        duration: 2000,
      });

      return;
    }

    dispatch({
      type: 'update_display_state',
      payload: {
        display_state: display,
      },
    });
  };

  return (
    <PageWrapper>
      <Hero />
      <div className="flex flex-col gap-y-4 w-full">
        <Card className="w-full">
          <CardHeader className="flex flex-row justify-between">
            <div className="flex flex-col">
              <CardTitle>{`Archived Review: ${context.ReviewName ?? 'Loading...'}`}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={context.DisplayState} className={cn('w-full flex flex-col gap-y-4')}>
              <TabsList className="w-full flex flex-row border">
                <TabsTrigger
                  value="planning"
                  className="w-full"
                  onClick={() => {
                    if (context.DisplayState === 'planning') return;

                    dispatch({
                      type: 'update_display_state',
                      payload: {
                        display_state: 'planning',
                      },
                    });
                  }}
                >
                  Planning
                </TabsTrigger>
                <TabsTrigger
                  value="studies"
                  className={cn('w-full', context.ReviewPlans.Status === 'NotStarted' ? 'opacity-50' : '')}
                  onClick={() => catch_navigation(context, 'studies')}
                >
                  Coding
                </TabsTrigger>
                <TabsTrigger
                  value="empirical"
                  className={cn('w-full', context.ReviewPlans.Status === 'NotStarted' ? 'opacity-50' : '')}
                  onClick={() => catch_navigation(context, 'empirical')}
                >
                  Data Inspection
                </TabsTrigger>
                <TabsTrigger
                  value="visuals"
                  className={cn('w-full', context.ReviewPlans.Status === 'NotStarted' ? 'opacity-50' : '')}
                  onClick={() => catch_navigation(context, 'visuals')}
                >
                  Data Visualization
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className={cn('w-full', context.ReviewPlans.Status === 'NotStarted' ? 'opacity-50' : '')}
                  onClick={() => catch_navigation(context, 'notes')}
                >
                  Review Notes
                </TabsTrigger>
              </TabsList>
              <TabsContent value="planning">
                <PlanningView readonly={true} />
              </TabsContent>
              <TabsContent value="studies">
                <StudiesView readonly={true} />
              </TabsContent>
              <TabsContent value="empirical">
                <EmpiricalTabView readonly={true} />
              </TabsContent>
              <TabsContent value="visuals">
                <VisualsView />
              </TabsContent>
              <TabsContent value="notes">
                <NotesTabView readonly={true} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
