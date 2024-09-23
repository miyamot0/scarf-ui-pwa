import { DisplayStateType } from './DisplayStateTypes';
import { StudyObject, TypeOfPlanningObject } from './QuestionTypes';
import { ReviewTypes } from '../../types/ReviewTypes';
import { DialogStateType } from './DialogStateTypes';
import { Descendant } from 'slate';

export type GlobalStateType = {
  DialogState: DialogStateType;
  DisplayState: DisplayStateType;
  Studies: StudyObject[];
  ReviewName?: string;
  ReviewType?: ReviewTypes;
  ReviewPlans: TypeOfPlanningObject;
  Loaded?: boolean;
  AutoSave?: boolean;
  Notes?: Descendant[];
  NeedSave: boolean;
  ReadOnly: boolean;
};

export type SavedGlobalStateType = GlobalStateType & {
  ID: string;
  DateSaved: string;
  Title: string;
  Author: string;
};
