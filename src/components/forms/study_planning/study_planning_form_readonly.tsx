import { useForm } from 'react-hook-form';
import { StudyDetailsSchema } from './study_planning_schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { GlobalStateType } from '@/questions/types/GlobalStateType';

export function StudyPlanningFormRO({ readonly = false, context }: { readonly?: boolean; context: GlobalStateType }) {
  const form = useForm<z.infer<typeof StudyDetailsSchema>>({
    resolver: zodResolver(StudyDetailsSchema),
    defaultValues: {
      Plan_General_1: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_General_1')?.Response,
      Plan_General_2: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_General_2')?.Response,
      Plan_General_3: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_General_3')?.Response,
      Plan_General_4: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_General_4')?.Response,
      Plan_Reporting_1: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Reporting_1')?.Response,
      Plan_Reporting_2: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Reporting_2')?.Response,
      Plan_Reporting_3: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Reporting_3')?.Response,
      Plan_Reporting_4: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Reporting_4')?.Response,
      Plan_Reporting_5: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Reporting_5')?.Response,
      Plan_Reporting_6: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Reporting_6')?.Response,
      Plan_Reporting_7: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Reporting_7')?.Response,
      Plan_DV_Measurement_4: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_DV_Measurement_4')
        ?.Response,
      Plan_DV_Measurement_5: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_DV_Measurement_5')
        ?.Response,
      Plan_Reporting_8: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Reporting_8')?.Response,
      Plan_Reporting_9: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Reporting_9')?.Response,
      Plan_Reporting_10: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Reporting_10')?.Response,
      Plan_Reporting_11: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Reporting_11')?.Response,
      Plan_Reporting_12: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Reporting_12')?.Response,
      Plan_Fidelity_2: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Fidelity_2')?.Response,
      Plan_Fidelity_3: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Fidelity_3')?.Response,
      Plan_Fidelity_4: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Fidelity_4')?.Response,
      Plan_Social_Validity_1: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Social_Validity_1')
        ?.Response,
      Plan_Generality_Boundedness_1: context.ReviewPlans.Questions.find(
        (q) => q.QuestionID === 'Plan_Generality_Boundedness_1'
      )?.Response,
      Plan_Generality_Boundedness_3: context.ReviewPlans.Questions.find(
        (q) => q.QuestionID === 'Plan_Generality_Boundedness_3'
      )?.Response,
      Plan_Generality_Boundedness_5: context.ReviewPlans.Questions.find(
        (q) => q.QuestionID === 'Plan_Generality_Boundedness_5'
      )?.Response,
      Plan_Maintenance_1: context.ReviewPlans.Questions.find((q) => q.QuestionID === 'Plan_Maintenance_1')?.Response,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-8">
        {context.ReviewPlans.Questions.map((question) => {
          const questionStem = question.QuestionStem;
          const questionInstruction = question.QuestionInstruction;

          return (
            <FormField
              key={question.QuestionID}
              control={form.control}
              // @ts-ignore
              name={question.QuestionID}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{questionStem}</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" {...field} />
                  </FormControl>

                  <FormDescription>{questionInstruction}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        {readonly !== true && (
          <Button type="submit" size={'lg'} className="w-full">
            Update Review
          </Button>
        )}
      </form>
    </Form>
  );
}
