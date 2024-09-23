const fsObj = require('fs');
const ndbi = require('./assets/ndbi_data.json');

const { v4: uuidv4 } = require('uuid');

const internalValidityQuestions = require('./generated/internal_validity_questions.json') as QuestionObjectHolder[];
const externalValidityQuestions = require('./generated/external_validity_questions.json') as QuestionObjectHolder[];
const reportingQuestions = require('./generated/reporting_questions.json') as QuestionObjectHolder[];
const outcomesQuestions = require('./generated/outcomes_questions.json') as QuestionObjectHolder[];

const planningQuestions = require('./generated/planning_questions.json') as QuestionObjectHolder[];

/*
type DisplayDialogType =
  | undefined
  | 'study_import'
  | 'review_details'
  | 'study_details'
  | 'study_internal_validity'
  | 'study_external_validity'
  | 'study_reporting'
  | 'study_outcomes';

type DialogStateType = {
  dialog_type: DisplayDialogType;
  study: undefined | StudyObject;
};

type DisplayStateType = 'instructions' | 'studies' | 'visuals' | 'metrics' | 'empirical' | 'notes' | 'planning';

type GlobalStateType = {
  DialogState: DialogStateType;
  DisplayState: DisplayStateType;
  Studies: StudyObject[];
  ReviewPlans: TypeOfPlanningObject;
};
*/

type QuestionCategory =
  | 'DV Measurement'
  | 'Design Appropriateness'
  | 'Fidelity'
  | 'Social Validity'
  | 'Generality & Boundedness'
  | 'Maintenance'
  | 'Reporting'
  | 'Outcomes';

type QuestionType =
  | 'YesNo'
  | 'Text'
  | 'YesNoNotPossible'
  | 'YesNoPartial'
  | 'YesNoNotApplicable'
  | 'YesNoNotApplicableForSome'
  | 'CbPcbG'
  | 'YIntOnlyYBothNo'
  | 'GeneralizationOutcomes'
  | 'MaintenancePeriod'
  | 'PrimarySecondaryUnknown'
  | 'ConditionChangeCharacterization'
  | 'ConditionChangeCharacterizationNA';

type QuestionObjectHolder = {
  Category?: QuestionCategory;
  QuestionID: string;
  QuestionStem?: string;
  QuestionInstruction?: string;
  QuestionType?: QuestionType;
  Response?: string;
  Locale?: 'en-us';
};

type PublicationType = 'Journal' | 'Proceeding' | 'Preprint' | 'Unpublished' | 'Unclassified';

type ResponseStatus = 'NotStarted' | 'InProgress' | 'Completed';

type TypeOfValidityObject = {
  Status: ResponseStatus;
  Questions: QuestionObjectHolder[];
};

type TypeOfPlanningObject = {
  Status: ResponseStatus;
  Questions: QuestionObjectHolder[];
};

type StudyObject = {
  StudyID: string;
  StudyTag: string;
  StudyAuthors: string;
  StudyTitle: string;
  StudyJournal: string;
  StudyYear: number;
  InternalValidity: TypeOfValidityObject;
  ExternalValidity: TypeOfValidityObject;
  Reporting: TypeOfValidityObject;
  Outcomes: TypeOfValidityObject;
  PublicationType: PublicationType;
};

try {
  let custom_state = {
    DialogState: {
      dialog_type: undefined,
      study: undefined,
    },
    DisplayState: 'instructions',
    Studies: [] as StudyObject[],
    ReviewName: 'NDBI Review',
    ReviewType: 'Primary',
    ReviewPlans: {
      Status: 'Completed',
      Questions: planningQuestions.map((question) => {
        return {
          ...question,
          Response: '[Not Provided]',
        };
      }),
    } satisfies TypeOfPlanningObject,
  };

  console.log('Converting NDBI Data...');
  console.log(`N Studies = ${ndbi.length}`);

  for (let i = 0; i < ndbi.length; i++) {
    const individual_study_entry = ndbi[i];

    const string_splits = individual_study_entry.StudyName.split('.');
    const author_first_string = string_splits[0];
    const year_string = string_splits[1];

    let new_study: StudyObject = {
      StudyID: uuidv4(),
      StudyTag: individual_study_entry.StudyName,
      StudyAuthors: `${author_first_string} et al. (${year_string})`,
      StudyTitle: '[Not Provided]',
      StudyJournal: '[Not Provided]',
      StudyYear: parseInt(year_string) ?? -1,
      InternalValidity: {
        Status: 'Completed',
        Questions: [],
      },
      ExternalValidity: {
        Status: 'Completed',
        Questions: [],
      },
      Reporting: {
        Status: 'Completed',
        Questions: [],
      },
      Outcomes: {
        Status: 'Completed',
        Questions: [],
      },
      PublicationType: individual_study_entry.Status,
    };

    const skips = ['StudyID', 'StudyName', 'StudyAuthors', 'Status'];

    Object.keys(individual_study_entry).forEach((key) => {
      if (skips.includes(key)) return;

      let question = internalValidityQuestions.find((question) => question.QuestionID === key);

      if (question) {
        new_study.InternalValidity.Questions.push({
          QuestionID: question.QuestionID,
          Response: individual_study_entry[key],
        });
        return;
      }

      question = externalValidityQuestions.find((question) => question.QuestionID === key);

      if (question) {
        new_study.ExternalValidity.Questions.push({
          QuestionID: question.QuestionID,
          Response: individual_study_entry[key],
        });
        return;
      }

      question = reportingQuestions.find((question) => question.QuestionID === key);

      if (question) {
        new_study.Reporting.Questions.push({
          QuestionID: question.QuestionID,
          Response: individual_study_entry[key],
        });
        return;
      }

      question = outcomesQuestions.find((question) => question.QuestionID === key);

      if (question) {
        new_study.Outcomes.Questions.push({
          QuestionID: question.QuestionID,
          Response: individual_study_entry[key],
        });
        return;
      }
    });

    custom_state.Studies.push(new_study);
  }

  console.log('Successfully written to disk.');

  let fileOutputName = './questions/generated/ndbi_output_state.json';

  fsObj.writeFileSync(fileOutputName, JSON.stringify(custom_state, null, 2));
} catch (error) {
  console.log('Error converting external validity questions: ', error);
}
