import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalculateAgreement } from '../helpers/reli_scoring';
import { StudyReliDataTable } from '@/components/tables/reli/study_reli_table';
import { BuildColumns } from '@/components/tables/reli/study_reli_columns';
import { StudyObjectPair } from '@/questions/types/QuestionTypes';
import { ConsensusStateContext } from '../context/consensus-provider';
import { useContext } from 'react';
import { cn } from '@/lib/utils';

function StyledSpan({ Text, Number }: { Text: string; Number: number }) {
  return (
    <span>
      {`${Text} = `}
      <span
        className={cn('', {
          'text-red-700 font-bold': Number < 100,
        })}
      >
        {Number}
      </span>
    </span>
  );
}

export const AgreementStatus = () => {
  const { context } = useContext(ConsensusStateContext);
  const built_columns = BuildColumns();

  if (context.primary && context.reliability) {
    const agreement = CalculateAgreement(context.primary.Studies, context.reliability.Studies);

    const study_pairs: StudyObjectPair[] = context.primary.Studies.map((primary_study) => {
      const reliability = context.reliability?.Studies?.find((s) => s.StudyID === primary_study.StudyID);

      return {
        primary: primary_study,
        reliability,
      };
    });

    return (
      <>
        <Card>
          <CardHeader>
            <CardTitle>State of Rater Agreement</CardTitle>
            <CardDescription>Information on agreement is provided in the space below</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-0">
              <p>{`Total Percentage Overall Agreement: ${agreement.TotalPercent}`}</p>
              <div className="">
                <StyledSpan Text="Internal Validity" Number={agreement.IV.Percent} />
                {'; '}
                <StyledSpan Text="External Validity" Number={agreement.EV.Percent} />
                {'; '}
                <StyledSpan Text="Reporting" Number={agreement.Reporting.Percent} />
                {'; '}
                <StyledSpan Text="Outcomes" Number={agreement.Outcomes.Percent} />
              </div>
            </div>

            <StudyReliDataTable columns={built_columns} data={study_pairs} />
          </CardContent>
        </Card>
      </>
    );
  } else {
    return <div></div>;
  }
};
