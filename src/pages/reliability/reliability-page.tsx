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
              <CardTitle>Reliability Check</CardTitle>
              <CardDescription>Compute user agreement and view correspondence</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-4">
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
