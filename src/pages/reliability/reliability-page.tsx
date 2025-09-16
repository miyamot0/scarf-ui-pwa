import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Hero } from './views/hero';
import { AgreementStatus } from './views/agreement_status';
import { DataInputPanelWithRef } from './views/data_input_panels';
import PageWrapper from '@/components/layout/page-wrapper';
import { ConsensusStateContextProvider } from './context/consensus-provider';
import { ConsensusDialog } from '@/components/dialogs/consensus_dialog';

export function ReliabilityPage() {
  return (
    <ConsensusStateContextProvider>
      <PageWrapper>
        <Hero />

        <div className="flex flex-col gap-y-4 w-full">
          <Card>
            <CardHeader>
              <CardTitle>Reliability Assessment and Evaluation</CardTitle>
              <CardDescription>Compute user agreement and work toward consensus</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <p>
                  This page is designed to compare TWO SCARF data sets (i.e., Primary and Reliability coding) and
                  support reaching 100% agreement across both coders. Instances of diagreement will be highlighted in{' '}
                  <span className="text-red-700 font-bold">RED</span> to prompt discussion and resolve disagreements.
                  Instructions for using this page are provided below and in the information section of the webapp.
                </p>
                <ol className="list-decimal list-inside">
                  <li>Load Primary and Reliability data sets using the associated buttons below.</li>
                  <li>
                    Inspect the resulting table for areas of disagreement indicated by a{' '}
                    <span className="text-red-700 font-bold">RED</span> color.
                  </li>
                  <li>
                    Clicking on the cells with disagreement will open a dialog that will allow you to update BOTH
                    datasets with the value the pair (or tiebreaker) feels is most correct for the field and
                    demonstration.
                  </li>
                  <li>
                    Once coded to complete agreement, both of the updated datasets (Primary and Reliability) can be
                    downloaded using fields near the initial upload buttons.
                  </li>
                </ol>
              </div>
              <div className="flex flex-col lg:flex-row gap-y-4 gap-x-4">
                <DataInputPanelWithRef coderType={'Primary'} />

                <DataInputPanelWithRef coderType={'Reliability'} />
              </div>
            </CardContent>
          </Card>

          <AgreementStatus />
        </div>

        {/* Dialogs */}
        <ConsensusDialog />
      </PageWrapper>
    </ConsensusStateContextProvider>
  );
}
