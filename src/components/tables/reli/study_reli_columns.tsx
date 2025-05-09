import { StudyObjectPair } from '@/questions/types/QuestionTypes';
import { ColumnDef, Row } from '@tanstack/react-table';
import { DataTableColumnHeader } from '../general/study_column_header';
import {
  ExternalValidityQuestionDefault,
  InternalValidityQuestionDefault,
  OutcomesQuestionDefault,
  ReportingQuestionDefault,
} from '@/questions/questions_defaults';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnTooltip } from './study_column_header_tooltip';
import {
  ExternalValidityQuestions,
  InternalValidityQuestions,
  OutcomesQuestions,
  ReportingQuestions,
} from '@/questions/simplified_questions';
import { ConsensusStateContext, ContextQueryType } from '@/pages/reliability/context/consensus-provider';
import { useContext } from 'react';

const empirical_cols_1 = InternalValidityQuestionDefault.Questions.map((question) => {
  const question_lookup = InternalValidityQuestions.find((q) => q.QuestionID === question.QuestionID);

  return {
    accessorKey: question.QuestionID,
    header: () => (
      <DataTableColumnTooltip title={question.QuestionID} description={question_lookup?.QuestionStem ?? ''} />
    ),
    cell: ({ row }: { row: Row<StudyObjectPair> }) => {
      const primary_response = row.original.primary.InternalValidity.Questions.find(
        (q) => q.QuestionID === question.QuestionID
      )?.Response;

      const reliability_response = row.original.reliability?.InternalValidity.Questions.find(
        (q) => q.QuestionID === question.QuestionID
      )?.Response;

      return style_dynamic(primary_response, reliability_response, {
        Key: ['InternalValidity', question.QuestionID],
        StudyID: row.original.primary.StudyID,
        Primary: primary_response,
        Reliability: reliability_response,
      } satisfies ContextQueryType);
    },

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

    cell: ({ row }: { row: Row<StudyObjectPair> }) => {
      const primary_response = row.original.primary.ExternalValidity.Questions.find(
        (q) => q.QuestionID === question.QuestionID
      )?.Response;

      const reliability_response = row.original.reliability?.ExternalValidity.Questions.find(
        (q) => q.QuestionID === question.QuestionID
      )?.Response;

      return style_dynamic(primary_response, reliability_response, {
        Key: ['ExternalValidity', question.QuestionID],
        StudyID: row.original.primary.StudyID,
        Primary: primary_response,
        Reliability: reliability_response,
      } satisfies ContextQueryType);
    },

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

    cell: ({ row }: { row: Row<StudyObjectPair> }) => {
      const primary_response = row.original.primary.Reporting.Questions.find(
        (q) => q.QuestionID === question.QuestionID
      )?.Response;

      const reliability_response = row.original.reliability?.Reporting.Questions.find(
        (q) => q.QuestionID === question.QuestionID
      )?.Response;

      return style_dynamic(primary_response, reliability_response, {
        Key: ['Reporting', question.QuestionID],
        StudyID: row.original.primary.StudyID,
        Primary: primary_response,
        Reliability: reliability_response,
      } satisfies ContextQueryType);
    },

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

    cell: ({ row }: { row: Row<StudyObjectPair> }) => {
      const primary_response = row.original.primary.Outcomes.Questions.find(
        (q) => q.QuestionID === question.QuestionID
      )?.Response;

      const reliability_response = row.original.reliability?.Outcomes.Questions.find(
        (q) => q.QuestionID === question.QuestionID
      )?.Response;

      return style_dynamic(primary_response, reliability_response, {
        Key: ['Outcomes', question.QuestionID],
        StudyID: row.original.primary.StudyID,
        Primary: primary_response,
        Reliability: reliability_response,
      } satisfies ContextQueryType);
    },

    enableHiding: false,
    enableSorting: false,
  };
});

function MismatchedEntry({
  Primary,
  Reliability,
  ConsensusContext,
}: {
  Primary: string;
  Reliability: string;
  ConsensusContext: ContextQueryType;
}) {
  const { setConsensusContext } = useContext(ConsensusStateContext);

  return (
    <div
      className="flex flex-col gap-1 border border-red-500 rounded p-1 hover:bg-red-500"
      onClick={() => {
        setConsensusContext((prev) => ({
          ...prev,
          state: ConsensusContext,
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
const style_dynamic = (primary: any, reliability: any, ctx: ContextQueryType) => {
  if (!primary || !reliability) return <></>;

  if (primary && reliability && primary === reliability)
    return <Badge className={'bg-green-500 whitespace-nowrap'}>{primary}</Badge>;

  return <MismatchedEntry Primary={primary} Reliability={reliability} ConsensusContext={ctx} />;
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
      cell: ({ row }) =>
        style_dynamic(row.original.primary.StudyTag, row.original.reliability?.StudyTag, {
          Key: ['StudyTag'],
          StudyID: row.original.primary.StudyID,
          Primary: row.original.primary.StudyTag ?? '',
          Reliability: row.original.reliability?.StudyTag ?? '',
        } satisfies ContextQueryType),
    },
    {
      accessorKey: 'StudyAuthors',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Authors" />,
      cell: ({ row }) =>
        style_dynamic(row.original.primary.StudyAuthors, row.original.reliability?.StudyAuthors, {
          Key: ['StudyAuthors'],
          StudyID: row.original.primary.StudyID,
          Primary: row.original.primary.StudyAuthors ?? '',
          Reliability: row.original.reliability?.StudyAuthors ?? '',
        } satisfies ContextQueryType),
    },
    {
      accessorKey: 'StudyTitle',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
      cell: ({ row }) =>
        style_dynamic(row.original.primary.StudyTitle, row.original.reliability?.StudyTitle, {
          Key: ['StudyTitle'],
          StudyID: row.original.primary.StudyID,
          Primary: row.original.primary.StudyTitle ?? '',
          Reliability: row.original.reliability?.StudyTitle ?? '',
        } satisfies ContextQueryType),
    },
    {
      accessorKey: 'StudyJournal',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Journal" />,
      cell: ({ row }) =>
        style_dynamic(row.original.primary.StudyJournal, row.original.reliability?.StudyJournal, {
          Key: ['StudyJournal'],
          StudyID: row.original.primary.StudyID,
          Primary: row.original.primary.StudyJournal ?? '',
          Reliability: row.original.reliability?.StudyJournal ?? '',
        } satisfies ContextQueryType),
    },
    {
      accessorKey: 'StudyYear',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Year" />,
      cell: ({ row }) =>
        style_dynamic(row.original.primary.StudyYear, row.original.reliability?.StudyYear, {
          Key: ['StudyYear'],
          StudyID: row.original.primary.StudyID,
          Primary: row.original.primary.StudyYear?.toString() ?? '',
          Reliability: row.original.reliability?.StudyYear?.toString() ?? '',
        } satisfies ContextQueryType),
    },
    ...empirical_cols_1,
    ...empirical_cols_2,
    ...empirical_cols_3,
    ...empirical_cols_4,
  ];
}
