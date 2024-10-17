import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { QuestionObjectHolder, QuestionType, StudyObject } from '@/questions/types/QuestionTypes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GetSelectOptionsFromTag } from '../inputs/select_options';
import { StudyOutcomesSchema } from './study_outcomes_schema';
import { OutcomesQuestions } from '@/questions/simplified_questions';
import { toast } from 'sonner';
import { AppStateContext } from '@/components/context/data-provider';
import { useContext } from 'react';

export function StudyOutcomesForm({ study }: { study?: StudyObject }) {
  const { dispatch } = useContext(AppStateContext);

  const form = useForm<z.infer<typeof StudyOutcomesSchema>>({
    resolver: zodResolver(StudyOutcomesSchema),
    defaultValues: {
      Outcomes_1: study?.Outcomes.Questions.find((q) => q.QuestionID === 'Outcomes_1')?.Response,
      Outcomes_2: study?.Outcomes.Questions.find((q) => q.QuestionID === 'Outcomes_2')?.Response,
      Outcomes_3: study?.Outcomes.Questions.find((q) => q.QuestionID === 'Outcomes_3')?.Response,
      Outcomes_4: study?.Outcomes.Questions.find((q) => q.QuestionID === 'Outcomes_4')?.Response,
      Outcomes_5: study?.Outcomes.Questions.find((q) => q.QuestionID === 'Outcomes_5')?.Response,
      Outcomes_6: study?.Outcomes.Questions.find((q) => q.QuestionID === 'Outcomes_6')?.Response,
    },
  });

  function onSubmit(values: z.infer<typeof StudyOutcomesSchema>) {
    if (!study) throw new Error('Study should not be undefined');

    let questions = JSON.parse(JSON.stringify(study.Outcomes.Questions)) as QuestionObjectHolder[];

    let t: keyof QuestionObjectHolder;

    // @ts-expect-error - TS is not able to infer the type of t
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
      Outcomes: {
        ...study.Outcomes,
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

  function manual_overrides(question: QuestionObjectHolder, value: string) {
    if (question.QuestionID === 'Outcomes_2' && value === 'No') {
      form.setValue('Outcomes_3', 'N/A');
      form.trigger('Outcomes_3');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {study?.Outcomes.Questions.map((question) => {
          const questionStem =
            question.QuestionStem ?? OutcomesQuestions.find((q) => q.QuestionID === question.QuestionID)?.QuestionStem;

          const questionInstruction =
            question.QuestionInstruction ??
            OutcomesQuestions.find((q) => q.QuestionID === question.QuestionID)?.QuestionInstruction;

          const questionType: string | undefined =
            question.QuestionType ?? OutcomesQuestions.find((q) => q.QuestionID === question.QuestionID)?.QuestionType;

          if (!questionType) throw new Error('QuestionType is undefined');

          return (
            <FormField
              key={question.QuestionID}
              control={form.control}
              // @ts-expect-error - TS is not able to infer the type of t
              name={question.QuestionID}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{questionStem}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        manual_overrides(question, value);
                      }}
                      defaultValue={field.value}
                      value={field.value}
                    >
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
