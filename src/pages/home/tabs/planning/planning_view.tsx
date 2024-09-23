import { StudyPlanningForm } from '@/components/forms/study_planning/study_planning_form';
import { HeadingComponent } from '../instructions/views/heading_component';

export function PlanningView({ readonly = false }: { readonly?: boolean }) {
  return (
    <div className="flex flex-col gap-y-4">
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

      <StudyPlanningForm readonly={readonly} />
    </div>
  );
}
