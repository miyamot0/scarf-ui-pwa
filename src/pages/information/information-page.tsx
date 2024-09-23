import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Hero } from './views/hero';
import { PlanningSection } from './views/step_1_planning';
import { ExecutionSection } from './views/step_2_execution';
import { EvaluationSection } from './views/step_3_evaluation';
import { ExportingSection } from './views/step_4_exporting';
import PageWrapper from '@/components/layout/page-wrapper';

export function InformationPage() {
  return (
    <PageWrapper>
      <Hero />
      <div className="flex flex-col gap-y-4 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Planning and using SCARF-UI</CardTitle>
            <CardDescription>Guidelines and suggestions regarding the use of SCARF-UI for research</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-xl">Step 1. Planning Review and Study Protocols</AccordionTrigger>
                <AccordionContent>
                  <PlanningSection />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-xl">Step 2. Executing Study/Review Protocol</AccordionTrigger>
                <AccordionContent>
                  <ExecutionSection />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-xl">Step 3. Summarizing and Interpreting Findings</AccordionTrigger>
                <AccordionContent>
                  <EvaluationSection />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-xl">Step 4. Exporting Figures and Final Data</AccordionTrigger>
                <AccordionContent>
                  <ExportingSection />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
