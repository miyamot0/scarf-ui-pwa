import { QuestionObjectHolder, StudyObjectPair } from '@/questions/types/QuestionTypes';
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

const GetResponses = (
  QuestionsPrimary: QuestionObjectHolder[],
  QuestionsReliability: QuestionObjectHolder[],
  QuestionID: string
) => {
  const PrimaryResponse = QuestionsPrimary.find((q) => q.QuestionID === QuestionID)?.Response;

  const ReliabilityResponse = QuestionsReliability.find((q) => q.QuestionID === QuestionID)?.Response;

  return { PrimaryResponse, ReliabilityResponse };
};

const PrepareContext = (Key: string[], StudyID: string, Primary?: string, Reliability?: string) => {
  return {
    Key,
    StudyID,
    Primary,
    Reliability,
  } satisfies ContextQueryType;
};

const empirical_cols_1 = InternalValidityQuestionDefault.Questions.map((question) => {
  const question_lookup = InternalValidityQuestions.find((q) => q.QuestionID === question.QuestionID);

  return {
    accessorKey: question.QuestionID,
    header: () => (
      <DataTableColumnTooltip title={question.QuestionID} description={question_lookup?.QuestionStem ?? ''} />
    ),
    cell: ({ row }: { row: Row<StudyObjectPair> }) => {
      const { PrimaryResponse, ReliabilityResponse } = GetResponses(
        row.original.primary.InternalValidity.Questions,
        row.original.reliability?.InternalValidity.Questions ?? [],
        question.QuestionID
      );

      const ctx = PrepareContext(
        ['InternalValidity', question.QuestionID],
        row.original.primary.StudyID,
        PrimaryResponse,
        ReliabilityResponse
      );

      return style_dynamic(PrimaryResponse, ReliabilityResponse, ctx);
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
      const { PrimaryResponse, ReliabilityResponse } = GetResponses(
        row.original.primary.ExternalValidity.Questions,
        row.original.reliability?.ExternalValidity.Questions ?? [],
        question.QuestionID
      );

      const ctx = PrepareContext(
        ['ExternalValidity', question.QuestionID],
        row.original.primary.StudyID,
        PrimaryResponse,
        ReliabilityResponse
      );

      return style_dynamic(PrimaryResponse, ReliabilityResponse, ctx);
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
      const { PrimaryResponse, ReliabilityResponse } = GetResponses(
        row.original.primary.Reporting.Questions,
        row.original.reliability?.Reporting.Questions ?? [],
        question.QuestionID
      );

      const ctx = PrepareContext(
        ['Reporting', question.QuestionID],
        row.original.primary.StudyID,
        PrimaryResponse,
        ReliabilityResponse
      );

      return style_dynamic(PrimaryResponse, ReliabilityResponse, ctx);
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
      const { PrimaryResponse, ReliabilityResponse } = GetResponses(
        row.original.primary.Outcomes.Questions,
        row.original.reliability?.Outcomes.Questions ?? [],
        question.QuestionID
      );

      const ctx = PrepareContext(
        ['Outcomes', question.QuestionID],
        row.original.primary.StudyID,
        PrimaryResponse,
        ReliabilityResponse
      );

      return style_dynamic(PrimaryResponse, ReliabilityResponse, ctx);
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
        style_dynamic(
          row.original.primary.StudyTag,
          row.original.reliability?.StudyTag,
          PrepareContext(
            ['StudyTag'],
            row.original.primary.StudyID,
            row.original.primary.StudyTag ?? '',
            row.original.reliability?.StudyTag ?? ''
          )
        ),
    },
    {
      accessorKey: 'StudyAuthors',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Authors" />,
      cell: ({ row }) =>
        style_dynamic(
          row.original.primary.StudyAuthors,
          row.original.reliability?.StudyAuthors,
          PrepareContext(
            ['StudyAuthors'],
            row.original.primary.StudyID,
            row.original.primary.StudyAuthors ?? '',
            row.original.reliability?.StudyAuthors ?? ''
          )
        ),
    },
    {
      accessorKey: 'StudyTitle',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
      cell: ({ row }) =>
        style_dynamic(
          row.original.primary.StudyTitle,
          row.original.reliability?.StudyTitle,
          PrepareContext(
            ['StudyTitle'],
            row.original.primary.StudyID,
            row.original.primary.StudyTitle ?? '',
            row.original.reliability?.StudyTitle ?? ''
          )
        ),
    },
    {
      accessorKey: 'StudyJournal',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Journal" />,
      cell: ({ row }) =>
        style_dynamic(
          row.original.primary.StudyJournal,
          row.original.reliability?.StudyJournal,
          PrepareContext(
            ['StudyJournal'],
            row.original.primary.StudyID,
            row.original.primary.StudyJournal ?? '',
            row.original.reliability?.StudyJournal ?? ''
          )
        ),
    },
    {
      accessorKey: 'StudyYear',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Year" />,
      cell: ({ row }) =>
        style_dynamic(
          row.original.primary.StudyYear,
          row.original.reliability?.StudyYear,
          PrepareContext(
            ['StudyYear'],
            row.original.primary.StudyID,
            row.original.primary.StudyYear?.toString() ?? '',
            row.original.reliability?.StudyYear?.toString() ?? ''
          )
        ),
    },
    ...empirical_cols_1,
    ...empirical_cols_2,
    ...empirical_cols_3,
    ...empirical_cols_4,
  ];
}
