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
      {readonly ? <StudyPlanningFormRO readonly={true} context={context!} /> : <StudyPlanningForm />}
    </div>
  );
}
