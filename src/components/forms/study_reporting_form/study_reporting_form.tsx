import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { QuestionObjectHolder, QuestionType, StudyObject } from '@/questions/types/QuestionTypes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GetSelectOptionsFromTag } from '../inputs/select_options';
import { StudyReportingSchema } from './study_reporting_schema';
import { ReportingQuestions } from '@/questions/simplified_questions';
import { toast } from 'sonner';
import { AppStateContext } from '@/components/context/data-provider';
import { useContext } from 'react';

export function StudyReportingForm({ study }: { study?: StudyObject }) {
  const { dispatch } = useContext(AppStateContext);

  const form = useForm<z.infer<typeof StudyReportingSchema>>({
    resolver: zodResolver(StudyReportingSchema),
    defaultValues: {
      Reporting_1: study?.Reporting.Questions.find((q) => q.QuestionID === 'Reporting_1')?.Response,
      Reporting_2: study?.Reporting.Questions.find((q) => q.QuestionID === 'Reporting_2')?.Response,
      Reporting_3: study?.Reporting.Questions.find((q) => q.QuestionID === 'Reporting_3')?.Response,
      Reporting_4: study?.Reporting.Questions.find((q) => q.QuestionID === 'Reporting_4')?.Response,
      Reporting_5: study?.Reporting.Questions.find((q) => q.QuestionID === 'Reporting_5')?.Response,
      Reporting_6: study?.Reporting.Questions.find((q) => q.QuestionID === 'Reporting_6')?.Response,
      Reporting_7: study?.Reporting.Questions.find((q) => q.QuestionID === 'Reporting_7')?.Response,
      Reporting_8: study?.Reporting.Questions.find((q) => q.QuestionID === 'Reporting_8')?.Response,
      Reporting_9: study?.Reporting.Questions.find((q) => q.QuestionID === 'Reporting_9')?.Response,
      Reporting_10: study?.Reporting.Questions.find((q) => q.QuestionID === 'Reporting_10')?.Response,
      Reporting_11: study?.Reporting.Questions.find((q) => q.QuestionID === 'Reporting_11')?.Response,
      Reporting_12: study?.Reporting.Questions.find((q) => q.QuestionID === 'Reporting_12')?.Response,
      Reporting_13: study?.Reporting.Questions.find((q) => q.QuestionID === 'Reporting_13')?.Response,
    },
  });

  function onSubmit(values: z.infer<typeof StudyReportingSchema>) {
    if (!study) throw new Error('Study should not be undefined');

    let questions = study.Reporting.Questions;

    let t: keyof QuestionObjectHolder;

    // @ts-ignore
    for (t in values) {
      questions = questions.map((q) => {
        if (q.QuestionID === t) {
          const keyTyped = t as keyof typeof values;
          q.Response = values[keyTyped];
        }
        return q;
      });
    }

    const updated_study = {
      ...study,
      Reporting: {
        ...study.Reporting,
        Questions: questions,
        Status: 'Completed',
      },
    } satisfies StudyObject;

    dispatch({
      type: 'update_study',
      payload: { study_id: study.StudyID, updatedData: updated_study },
    });

    toast('Study Data Updated.', {
      description: 'Inspect the main table to review current progress.',
      duration: 2000,
      dismissible: true,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {study?.Reporting.Questions.map((question) => {
          const questionStem =
            question.QuestionStem ?? ReportingQuestions.find((q) => q.QuestionID === question.QuestionID)?.QuestionStem;

          const questionInstruction =
            question.QuestionInstruction ??
            ReportingQuestions.find((q) => q.QuestionID === question.QuestionID)?.QuestionInstruction;

          const questionType: string | undefined =
            question.QuestionType ?? ReportingQuestions.find((q) => q.QuestionID === question.QuestionID)?.QuestionType;

          if (!questionType) throw new Error('QuestionType is undefined');

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
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        {GetSelectOptionsFromTag(questionType as QuestionType).map((option) => {
                          return (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormDescription>{questionInstruction}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        <Button type="submit" size={'lg'} className="w-full">
          Update Study
        </Button>
      </form>
    </Form>
  );
}
