import { DialogStateType } from '@/questions/types/DialogStateTypes';
import type { DisplayStateType } from '@/questions/types/DisplayStateTypes';
import type { GlobalStateType } from '@/questions/types/GlobalStateType';
import type { StudyObject, PublicationType, TypeOfPlanningObject } from '@/questions/types/QuestionTypes';
import { ReviewTypes } from '@/types/ReviewTypes';
import { Descendant } from 'slate';

export type DatabaseAction =
  | {
      type: 'load_local';
    }
  | { type: 'load_external'; payload: { saved_state: GlobalStateType; readonly?: boolean } }
  | { type: 'save_local' }
  | { type: 'generate_random' }
  | { type: 'add' }
  | { type: 'add_copy'; payload: { study_id: string } }
  | {
      type: 'update_display_state';
      payload: { display_state: DisplayStateType };
    }
  | {
      type: 'update_dialog_state';
      payload: { dialog_state: DialogStateType };
    }
  | {
      type: 'update_study';
      payload: { study_id: string; updatedData: StudyObject };
    }
  | {
      type: 'update_study_internal_validity';
      payload: { study_id: string; updatedData: StudyObject };
    }
  | { type: 'remove'; payload: { study_ids: string[] } }
  | {
      type: 'update_study_category';
      payload: { study_id: string; category: PublicationType };
    }
  | {
      type: 'update_review';
      payload: {
        review_name: string;
        review_type: ReviewTypes;
        auto_save: boolean;
        hide_maintenance: boolean;
        hide_generalization: boolean;
      };
    }
  | {
      type: 'bulk_import_studies';
      payload: { studies: StudyObject[] };
    }
  | {
      type: 'update_notes';
      payload: {
        notes: Descendant[];
      };
    }
  | {
      type: 'update_review_plans';
      payload: {
        plans: TypeOfPlanningObject;
      };
    }
  | {
      type: 'reset';
    };
