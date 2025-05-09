import { StudyObjectPair } from '@/questions/types/QuestionTypes';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../general/study_column_header';
import {
  ExternalValidityQuestionDefault,
  InternalValidityQuestionDefault,
  OutcomesQuestionDefault,
  ReportingQuestionDefault,
} from '@/questions/questions_defaults';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnTooltip } from './study_column_header_tooltip';
import {
  ExternalValidityQuestions,
  InternalValidityQuestions,
  OutcomesQuestions,
  ReportingQuestions,
} from '@/questions/simplified_questions';
import { ConsensusStateContext } from '@/pages/reliability/context/consensus-provider';
import { useContext } from 'react';
import { set } from 'react-hook-form';

const empirical_cols_1 = InternalValidityQuestionDefault.Questions.map((question) => {
  const question_lookup = InternalValidityQuestions.find((q) => q.QuestionID === question.QuestionID);

  return {
    accessorKey: question.QuestionID,
    header: () => (
      <DataTableColumnTooltip title={question.QuestionID} description={question_lookup?.QuestionStem ?? ''} />
    ),
    cell: ({ row }: { row: Row<StudyObjectPair> }) =>
      style_dynamic(
        row.original.primary.InternalValidity.Questions.find((q) => q.QuestionID === question.QuestionID)?.Response,
        row.original.reliability?.InternalValidity.Questions.find((q) => q.QuestionID === question.QuestionID)
          ?.Response,
        question.QuestionID
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
    cell: ({ row }: { row: Row<StudyObjectPair> }) =>
      style_dynamic(
        row.original.primary.ExternalValidity.Questions.find((q) => q.QuestionID === question.QuestionID)?.Response,
        row.original.reliability?.ExternalValidity.Questions.find((q) => q.QuestionID === question.QuestionID)
          ?.Response,
        question.QuestionID
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
    cell: ({ row }: { row: Row<StudyObjectPair> }) =>
      style_dynamic(
        row.original.primary.Reporting.Questions.find((q) => q.QuestionID === question.QuestionID)?.Response,
        row.original.reliability?.Reporting.Questions.find((q) => q.QuestionID === question.QuestionID)?.Response,
        question.QuestionID
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
    cell: ({ row }: { row: Row<StudyObjectPair> }) =>
      style_dynamic(
        row.original.primary.Outcomes.Questions.find((q) => q.QuestionID === question.QuestionID)?.Response,
        row.original.reliability?.Outcomes.Questions.find((q) => q.QuestionID === question.QuestionID)?.Response,
        question.QuestionID
      ),
    enableHiding: false,
    enableSorting: false,
  };
});

function MismatchedEntry({ Primary, Reliability, Key }: { Primary: string; Reliability: string; Key: string }) {
  const { setConsensusContext } = useContext(ConsensusStateContext);

  return (
    <div
      className="flex flex-col gap-1 border border-red-500 rounded p-1 hover:bg-red-500"
      onClick={() => {
        setConsensusContext((prev) => ({
          ...prev,
          key: Key,
        }));
      }}
    >
      <div className="text-nowrap flex gap-2 items-center">
        <span>Primary: </span>
        <Badge variant={'outline'} className="whitespace-nowrap mt-1 w-full flex justify-center">
          {Primary}
        </Badge>
      </div>
      <div className="text-nowrap flex gap-2  items-center">
        <span>Reliability: </span>
        <Badge variant={'outline'} className="whitespace-nowrap mt-1 w-full flex justify-center">
          {Reliability}
        </Badge>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const style_dynamic = (primary: any, reliability: any, key: string) => {
  if (!primary && !reliability) return <></>;

  if (primary && reliability && primary === reliability)
    return <Badge className={'bg-green-500 whitespace-nowrap'}>{primary}</Badge>;

  return <MismatchedEntry Primary={primary} Reliability={reliability} Key={key} />;
};

export function BuildColumns(): ColumnDef<StudyObjectPair>[] {
  return [
    {
      accessorKey: 'StudyID',
      header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    },
    {
      accessorKey: 'StudyTag',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tag" />,
      cell: ({ row }) => style_dynamic(row.original.primary.StudyTag, row.original.reliability?.StudyTag, 'StudyTag'),
    },
    {
      accessorKey: 'StudyAuthors',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Authors" />,
      cell: ({ row }) =>
        style_dynamic(row.original.primary.StudyAuthors, row.original.reliability?.StudyAuthors, 'StudyAuthors'),
    },
    {
      accessorKey: 'StudyTitle',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
      cell: ({ row }) =>
        style_dynamic(row.original.primary.StudyTitle, row.original.reliability?.StudyTitle, 'StudyTitle'),
    },
    {
      accessorKey: 'StudyJournal',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Journal" />,
      cell: ({ row }) =>
        style_dynamic(row.original.primary.StudyJournal, row.original.reliability?.StudyJournal, 'StudyJournal'),
    },
    {
      accessorKey: 'StudyYear',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Year" />,
      cell: ({ row }) => (
        <Badge
          className={cn(
            row.original.primary.StudyYear &&
              row.original.reliability?.StudyYear &&
              row.original.primary.StudyYear === row.original.reliability?.StudyYear
              ? 'bg-green-500'
              : 'bg-red-500'
          )}
        >
          {row.original.primary.StudyYear < 0 ? '' : row.original.primary.StudyYear}
        </Badge>
      ),
    },
    ...empirical_cols_1,
    ...empirical_cols_2,
    ...empirical_cols_3,
    ...empirical_cols_4,
  ];
}
