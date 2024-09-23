import type { GlobalStateType } from '@/questions/types/GlobalStateType';
import {
  InternalValidityQuestionDefault,
  ExternalValidityQuestionDefault,
  ReportingQuestionDefault,
  OutcomesQuestionDefault,
} from '@/questions/questions_defaults';
import type { DatabaseAction } from './reducer_types';
import { v4 as uuidv4 } from 'uuid';
import { StudyObject } from '@/questions/types/QuestionTypes';
import { DefaultStartingValue, generateRandomStartState } from '@/types/app-state';

const KEY_LOCAL_STORAGE = 'scarf-web-ui';

const SaveToLocalStorage = (state: GlobalStateType) => {
  localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(state));
};

export const database_reducer = (state: GlobalStateType, action: DatabaseAction) => {
  let new_state;

  switch (action.type) {
    case 'load_local':
      const value = localStorage.getItem(KEY_LOCAL_STORAGE);

      if (value) {
        return {
          ...(JSON.parse(value) as GlobalStateType),
          Loaded: true,
        };
      }

      return state;

    case 'load_external':
      return action.payload.saved_state;

    case 'reset':
      return DefaultStartingValue;

    case 'save_local':
      SaveToLocalStorage(state);

      return {
        ...state,
        NeedSave: false,
      };
    case 'generate_random':
      return generateRandomStartState(state);

    case 'add':
      const new_study: StudyObject = {
        StudyID: uuidv4(),
        StudyTag: '',
        StudyAuthors: '',
        StudyTitle: '',
        StudyJournal: '',
        StudyYear: -1,
        InternalValidity: InternalValidityQuestionDefault,
        ExternalValidity: ExternalValidityQuestionDefault,
        Reporting: ReportingQuestionDefault,
        Outcomes: OutcomesQuestionDefault,
        PublicationType: 'Unclassified',
      };

      new_state = {
        ...state,
        Studies: [...state.Studies, new_study],
      };

      if (state.AutoSave) {
        SaveToLocalStorage(new_state);
        return new_state;
      }

      return { ...new_state, NeedSave: true };
    case 'bulk_import_studies':
      new_state = {
        ...state,
        DialogState: {
          dialog_type: undefined,
          study: undefined,
        },
        Studies: [...state.Studies, ...action.payload.studies],
      };

      if (state.AutoSave) {
        SaveToLocalStorage(new_state);
        return new_state;
      }

      return { ...new_state, NeedSave: true };
    case 'remove':
      new_state = {
        ...state,
        Studies: state.Studies.filter((item) => !action.payload.study_ids.includes(item.StudyID)),
      };

      if (state.AutoSave) {
        SaveToLocalStorage(new_state);
        return new_state;
      }

      return { ...new_state, NeedSave: true };
    case 'update_display_state':
      new_state = {
        ...state,
        DisplayState: action.payload.display_state,
      };

      if (state.AutoSave) SaveToLocalStorage(new_state);

      return new_state;
    case 'update_dialog_state':
      new_state = {
        ...state,
        DialogState: action.payload.dialog_state,
      };

      if (state.AutoSave) SaveToLocalStorage(new_state);

      return new_state;
    case 'update_study':
      new_state = {
        ...state,
        DialogState: {
          dialog_type: undefined,
          study: undefined,
        },
        Studies: state.Studies.map((item) =>
          item.StudyID === action.payload.study_id ? { ...item, ...action.payload.updatedData } : item
        ),
      };

      if (state.AutoSave) {
        SaveToLocalStorage(new_state);
        return new_state;
      }

      return { ...new_state, NeedSave: true };
    case 'update_study_category':
      new_state = {
        ...state,
        Studies: state.Studies.map((item) =>
          item.StudyID === action.payload.study_id ? { ...item, PublicationType: action.payload.category } : item
        ),
      };

      if (state.AutoSave) {
        SaveToLocalStorage(new_state);
        return new_state;
      }

      return { ...new_state, NeedSave: true };
    case 'update_review':
      new_state = {
        ...state,
        DialogState: {
          dialog_type: undefined,
          study: undefined,
        },
        ReviewName: action.payload.review_name,
        ReviewType: action.payload.review_type,
        AutoSave: action.payload.auto_save,
      };

      if (state.AutoSave) {
        SaveToLocalStorage(new_state);
        return new_state;
      }

      return { ...new_state, NeedSave: true };
    case 'update_notes':
      new_state = {
        ...state,
        Notes: action.payload.notes,
      };

      if (state.AutoSave) {
        SaveToLocalStorage(new_state);
        return new_state;
      }

      return { ...new_state, NeedSave: true };

    case 'update_review_plans':
      new_state = {
        ...state,
        ReviewPlans: action.payload.plans,
      };

      if (state.AutoSave) {
        SaveToLocalStorage(new_state);
        return new_state;
      }

      return { ...new_state, NeedSave: true };
    default:
      return state;
  }
};
