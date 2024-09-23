import { AppStateContext } from '@/components/context/data-provider';
import PageWrapper from '@/components/layout/page-wrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DisplayStateType } from '@/questions/types/DisplayStateTypes';
import { GlobalStateType } from '@/questions/types/GlobalStateType';
import { useContext, useRef } from 'react';
import { toast } from 'sonner';
import { Hero } from './views/hero';
import { ButtonBar } from './views/button_bar';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReviewDetailsDialog } from '@/components/dialogs/review_details_dialog';
import { StudyDetailsDialog } from '@/components/dialogs/study_details_dialog';
import { StudyExternalValidityDialog } from '@/components/dialogs/study_external_validity_dialog';
import { StudyImportDialog } from '@/components/dialogs/study_import_dialog';
import { StudyInternalValidityDialog } from '@/components/dialogs/study_internal_validity_dialog';
import { StudyOutcomesDialog } from '@/components/dialogs/study_outcomes_dialog';
import { StudyReportingDialog } from '@/components/dialogs/study_reporting_dialog';

export default function HomePage() {
  const { context, dispatch } = useContext(AppStateContext);
  const refFileInput = useRef<HTMLInputElement>(null);

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
      <div className="flex flex-col gap-y-4">
        <Card className="w-full">
          <CardHeader className="flex flex-row justify-between">
            <div className="flex flex-col">
              <CardTitle>{`Review Name: ${context.ReviewName ?? 'UNNAMED'}`}</CardTitle>
              <CardDescription>{`Reviewer Type: ${context.ReviewType ?? 'Primary'}`}</CardDescription>
            </div>

            <ButtonBar state={context} dispatch={undefined as any} refFileInput={refFileInput} />
          </CardHeader>
          <CardContent>
            <Tabs value={context.DisplayState} className={cn('w-full flex flex-col gap-y-4')}>
              <TabsList className="w-full flex flex-row border">
                <TabsTrigger
                  value="instructions"
                  className="w-full"
                  onClick={() => {
                    if (context.DisplayState === 'instructions') return;

                    dispatch({
                      type: 'update_display_state',
                      payload: {
                        display_state: 'instructions',
                      },
                    });
                  }}
                >
                  Instructions
                </TabsTrigger>
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
              <TabsContent value="instructions">
                <div>Temp 1</div>
                {
                  //<InstructionsView />
                }
              </TabsContent>
              <TabsContent value="planning">
                <div>Temp 2</div>
                {
                  //<PlanningView />
                }
              </TabsContent>
              <TabsContent value="studies">
                <div>Temp 3</div>
                {
                  //<StudiesView />
                }
              </TabsContent>
              <TabsContent value="empirical">
                <div>Temp 4</div>
                {
                  //<EmpiricalTabView />
                }
              </TabsContent>
              <TabsContent value="visuals">
                <div>Temp 5</div>
                {
                  //<VisualsView />
                }
              </TabsContent>
              <TabsContent value="notes">
                <div>Temp 6</div>
                {
                  //<NotesTabView />
                }
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Dialogs */}
        <StudyImportDialog />
        <ReviewDetailsDialog />
        <StudyDetailsDialog />
        <StudyInternalValidityDialog />
        <StudyExternalValidityDialog />
        <StudyReportingDialog />
        <StudyOutcomesDialog />
      </div>
    </PageWrapper>
  );
}
