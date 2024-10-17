import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { QuestionObjectHolder, QuestionType, StudyObject } from '@/questions/types/QuestionTypes';
import { StudyInternalValiditySchema } from './study_internal_validity_schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GetSelectOptionsFromTag } from '../inputs/select_options';
import { InternalValidityQuestions } from '@/questions/simplified_questions';
import { toast } from 'sonner';
import { AppStateContext } from '@/components/context/data-provider';
import { useContext } from 'react';

export function StudyInternalValidityForm({ study }: { study?: StudyObject }) {
  const { dispatch } = useContext(AppStateContext);

  const form = useForm<z.infer<typeof StudyInternalValiditySchema>>({
    resolver: zodResolver(StudyInternalValiditySchema),
    defaultValues: {
      DV_Measurement_1: study?.InternalValidity.Questions.find((q) => q.QuestionID === 'DV_Measurement_1')?.Response,
      DV_Measurement_2: study?.InternalValidity.Questions.find((q) => q.QuestionID === 'DV_Measurement_2')?.Response,
      DV_Measurement_3: study?.InternalValidity.Questions.find((q) => q.QuestionID === 'DV_Measurement_3')?.Response,
      DV_Measurement_4: study?.InternalValidity.Questions.find((q) => q.QuestionID === 'DV_Measurement_4')?.Response,
      DV_Measurement_5: study?.InternalValidity.Questions.find((q) => q.QuestionID === 'DV_Measurement_5')?.Response,
      DV_Measurement_6: study?.InternalValidity.Questions.find((q) => q.QuestionID === 'DV_Measurement_6')?.Response,
      DV_Measurement_7: study?.InternalValidity.Questions.find((q) => q.QuestionID === 'DV_Measurement_7')?.Response,
      Design_Appropriateness_1: study?.InternalValidity.Questions.find(
        (q) => q.QuestionID === 'Design_Appropriateness_1'
      )?.Response,
      Design_Appropriateness_2: study?.InternalValidity.Questions.find(
        (q) => q.QuestionID === 'Design_Appropriateness_2'
      )?.Response,
      Design_Appropriateness_3: study?.InternalValidity.Questions.find(
        (q) => q.QuestionID === 'Design_Appropriateness_3'
      )?.Response,
      Design_Appropriateness_4: study?.InternalValidity.Questions.find(
        (q) => q.QuestionID === 'Design_Appropriateness_4'
      )?.Response,
      Fidelity_1: study?.InternalValidity.Questions.find((q) => q.QuestionID === 'Fidelity_1')?.Response,
      Fidelity_2: study?.InternalValidity.Questions.find((q) => q.QuestionID === 'Fidelity_2')?.Response,
      Fidelity_3: study?.InternalValidity.Questions.find((q) => q.QuestionID === 'Fidelity_3')?.Response,
      Fidelity_4: study?.InternalValidity.Questions.find((q) => q.QuestionID === 'Fidelity_4')?.Response,
      Fidelity_5: study?.InternalValidity.Questions.find((q) => q.QuestionID === 'Fidelity_5')?.Response,
    },
  });

  function onSubmit(values: z.infer<typeof StudyInternalValiditySchema>) {
    if (!study) throw new Error('Study should not be undefined');

    let questions = study.InternalValidity.Questions;

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
      InternalValidity: {
        ...study.InternalValidity,
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
        {study?.InternalValidity.Questions.map((question) => {
          const questionStem =
            question.QuestionStem ??
            InternalValidityQuestions.find((q) => q.QuestionID === question.QuestionID)?.QuestionStem;

          const questionInstruction =
            question.QuestionInstruction ??
            InternalValidityQuestions.find((q) => q.QuestionID === question.QuestionID)?.QuestionInstruction;

          const questionType: string | undefined =
            question.QuestionType ??
            InternalValidityQuestions.find((q) => q.QuestionID === question.QuestionID)?.QuestionType;

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
