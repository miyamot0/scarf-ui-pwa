import { HeadingComponent } from '../instructions/views/heading_component';
import { GlobalStateType } from '@/questions/types/GlobalStateType';
import { StudyPlanningFormRO } from '@/components/forms/study_planning/study_planning_form_readonly';
import { StudyPlanningForm } from '@/components/forms/study_planning/study_planning_form';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function PlanningView({ readonly = false, context }: { readonly?: boolean; context?: GlobalStateType }) {
  const [loaded, isLoaded] = useState(false);

  useEffect(() => {
    isLoaded(true);
  }, []);

  return (
    <div
      className={cn('flex flex-col gap-y-4 transition-opacity', {
        'opacity-100': loaded,
        'opacity-0': !loaded,
      })}
    >
      {!readonly && (
        <>
          <HeadingComponent Text="Review Planning" />
          <p>
            The purpose of this tab is for researchers to identify the purpose of their review, and to establish
            criteria for their review that allows them to take their specific contexts into consideration. For example,
            a researcher assessing interventions for severe challenging behavior might find fewer data points per
            condition adequate, due to ethical or safety reasons, while a researcher assessing interventions fo academic
            skills might require at least five data points per condition.
          </p>
          <hr />
        </>
      )}

      {readonly ? <StudyPlanningFormRO readonly={true} context={context!} /> : <StudyPlanningForm />}
    </div>
  );
}
