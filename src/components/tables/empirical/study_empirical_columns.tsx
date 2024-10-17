import { StudyObject } from '@/questions/types/QuestionTypes';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../general/study_column_header';
import {
  ExternalValidityQuestionDefault,
  InternalValidityQuestionDefault,
  OutcomesQuestionDefault,
  ReportingQuestionDefault,
} from '@/questions/questions_defaults';
import { StatusCell } from '../general/status_cell';
import { ArchivedCell } from '../general/archive_cell';
import { DataTableColumnTooltip } from '../reli/study_column_header_tooltip';
import {
  ExternalValidityQuestions,
  InternalValidityQuestions,
  OutcomesQuestions,
  ReportingQuestions,
} from '@/questions/simplified_questions';

const empirical_cols_1 = InternalValidityQuestionDefault.Questions.map((question) => {
  const question_lookup = InternalValidityQuestions.find((q) => q.QuestionID === question.QuestionID);

  return {
    accessorKey: question.QuestionID,
    header: () => (
      <DataTableColumnTooltip title={question.QuestionID} description={question_lookup?.QuestionStem ?? ''} />
    ),
    cell: ({ row }: { row: Row<StudyObject> }) => (
      <span>{row.original.InternalValidity.Questions.find((q) => q.QuestionID === question.QuestionID)?.Response}</span>
    ),
    enableHiding: false,
    enableSorting: false,
  };
});

const empirical_cols_2 = ExternalValidityQuestionDefault.Questions.map((question) => {
  const question_lookup = ExternalValidityQuestions.find((q) => q.QuestionID === question.QuestionID);

  return {
    accessorKey: question.QuestionID,
    header: () => (
      <DataTableColumnTooltip title={question.QuestionID} description={question_lookup?.QuestionStem ?? ''} />
    ),
    cell: ({ row }: { row: Row<StudyObject> }) => (
      <span>{row.original.ExternalValidity.Questions.find((q) => q.QuestionID === question.QuestionID)?.Response}</span>
    ),
    enableHiding: false,
    enableSorting: false,
  };
});

const empirical_cols_3 = ReportingQuestionDefault.Questions.map((question) => {
  const question_lookup = ReportingQuestions.find((q) => q.QuestionID === question.QuestionID);

  return {
    accessorKey: question.QuestionID,
    header: () => (
      <DataTableColumnTooltip title={question.QuestionID} description={question_lookup?.QuestionStem ?? ''} />
    ),
    cell: ({ row }: { row: Row<StudyObject> }) => (
      <span>{row.original.Reporting.Questions.find((q) => q.QuestionID === question.QuestionID)?.Response}</span>
    ),
    enableHiding: false,
    enableSorting: false,
  };
});

const empirical_cols_4 = OutcomesQuestionDefault.Questions.map((question) => {
  const question_lookup = OutcomesQuestions.find((q) => q.QuestionID === question.QuestionID);

  return {
    accessorKey: question.QuestionID,
    header: () => (
      <DataTableColumnTooltip title={question.QuestionID} description={question_lookup?.QuestionStem ?? ''} />
    ),
    cell: ({ row }: { row: Row<StudyObject> }) => (
      <span>{row.original.Outcomes.Questions.find((q) => q.QuestionID === question.QuestionID)?.Response}</span>
    ),
    enableHiding: false,
    enableSorting: false,
  };
});

export const study_columns: ColumnDef<StudyObject>[] = [
  {
    accessorKey: 'StudyID',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: 'StudyStatus',
    header: 'Status',
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => (
      <div className="min-w-[100px]">
        <StatusCell Study={row.original} />
      </div>
    ),
  },
  {
    accessorKey: 'PublicationType',
    header: 'Peer Reviewed',
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => (
      <div className="min-w-[150px]">
        <ArchivedCell Study={row.original} />
      </div>
    ),
  },
  {
    accessorKey: 'StudyTag',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tag" />,
  },
  {
    accessorKey: 'StudyAuthors',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Authors" className="min-w-[200px]" />,
  },
  {
    accessorKey: 'StudyTitle',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" className="min-w-[300px]" />,
  },
  {
    accessorKey: 'StudyJournal',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Journal" className="min-w-[300px]" />,
  },
  {
    accessorKey: 'StudyYear',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Year" />,
    cell: ({ row }) => <span>{row.original.StudyYear < 0 ? '' : row.original.StudyYear}</span>,
  },
  ...empirical_cols_1,
  ...empirical_cols_2,
  ...empirical_cols_3,
  ...empirical_cols_4,
];
