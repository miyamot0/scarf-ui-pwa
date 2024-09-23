import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Hero } from './views/hero';
import { useState } from 'react';
import { ReliabilityState } from '@/types/ReliabilityState';
import { AgreementStatus } from './views/agreement_status';
import { DataInputPanelWithRef } from './views/data_input_panels';
import PageWrapper from '@/components/layout/page-wrapper';

export function ReliabilityPage() {
  const [reliState, setReliState] = useState<ReliabilityState>({});

  return (
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
              <DataInputPanelWithRef coderType={'Primary'} reliabilityState={reliState} setReliState={setReliState} />

              <DataInputPanelWithRef
                coderType={'Reliability'}
                reliabilityState={reliState}
                setReliState={setReliState}
              />
            </div>
          </CardContent>
        </Card>

        <AgreementStatus state={reliState} />
      </div>
    </PageWrapper>
  );
}
