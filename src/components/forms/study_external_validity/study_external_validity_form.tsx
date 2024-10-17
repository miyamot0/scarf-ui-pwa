import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { QuestionObjectHolder, QuestionType, StudyObject } from '@/questions/types/QuestionTypes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GetSelectOptionsFromTag } from '../inputs/select_options';
import { StudyExternalValiditySchema } from './study_external_validity_schema';
import { ExternalValidityQuestions } from '@/questions/simplified_questions';
import { toast } from 'sonner';
import { AppStateContext } from '@/components/context/data-provider';
import { useContext } from 'react';

export function StudyExternalValidityForm({ study }: { study?: StudyObject }) {
  const { dispatch } = useContext(AppStateContext);

  const form = useForm<z.infer<typeof StudyExternalValiditySchema>>({
    resolver: zodResolver(StudyExternalValiditySchema),
    defaultValues: {
      Social_Validity_1: study?.ExternalValidity.Questions.find((q) => q.QuestionID === 'Social_Validity_1')?.Response,
      Social_Validity_2: study?.ExternalValidity.Questions.find((q) => q.QuestionID === 'Social_Validity_2')?.Response,
      Social_Validity_3: study?.ExternalValidity.Questions.find((q) => q.QuestionID === 'Social_Validity_3')?.Response,
      Social_Validity_4: study?.ExternalValidity.Questions.find((q) => q.QuestionID === 'Social_Validity_4')?.Response,
      Social_Validity_5: study?.ExternalValidity.Questions.find((q) => q.QuestionID === 'Social_Validity_5')?.Response,
      Generality_Boundedness_1: study?.ExternalValidity.Questions.find(
        (q) => q.QuestionID === 'Generality_Boundedness_1'
      )?.Response,
      Generality_Boundedness_2: study?.ExternalValidity.Questions.find(
        (q) => q.QuestionID === 'Generality_Boundedness_2'
      )?.Response,
      Generality_Boundedness_3: study?.ExternalValidity.Questions.find(
        (q) => q.QuestionID === 'Generality_Boundedness_3'
      )?.Response,
      Generality_Boundedness_4: study?.ExternalValidity.Questions.find(
        (q) => q.QuestionID === 'Generality_Boundedness_4'
      )?.Response,
      Generality_Boundedness_5: study?.ExternalValidity.Questions.find(
        (q) => q.QuestionID === 'Generality_Boundedness_5'
      )?.Response,
      Generality_Boundedness_6: study?.ExternalValidity.Questions.find(
        (q) => q.QuestionID === 'Generality_Boundedness_6'
      )?.Response,
      Generality_Boundedness_7: study?.ExternalValidity.Questions.find(
        (q) => q.QuestionID === 'Generality_Boundedness_7'
      )?.Response,
      Maintenance_1: study?.ExternalValidity.Questions.find((q) => q.QuestionID === 'Maintenance_1')?.Response,
      Maintenance_2: study?.ExternalValidity.Questions.find((q) => q.QuestionID === 'Maintenance_2')?.Response,
      Maintenance_3: study?.ExternalValidity.Questions.find((q) => q.QuestionID === 'Maintenance_3')?.Response,
    },
  });

  function onSubmit(values: z.infer<typeof StudyExternalValiditySchema>) {
    if (!study) throw new Error('Study should not be undefined');

    let questions = JSON.parse(JSON.stringify(study.ExternalValidity.Questions)) as QuestionObjectHolder[];

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
      ExternalValidity: {
        ...study.ExternalValidity,
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
    if (question.QuestionID === 'Social_Validity_1' && value === 'No') {
      form.setValue('Social_Validity_2', 'N/A');
      form.setValue('Social_Validity_3', 'N/A');
      form.setValue('Social_Validity_4', 'N/A');
      form.setValue('Social_Validity_5', 'N/A');

      form.trigger('Social_Validity_2');
      form.trigger('Social_Validity_3');
      form.trigger('Social_Validity_4');
      form.trigger('Social_Validity_5');
    }

    if (question.QuestionID === 'Generality_Boundedness_1' && value === 'No') {
      form.setValue('Generality_Boundedness_2', 'N/A');
      form.trigger('Generality_Boundedness_2');
    }

    if (question.QuestionID === 'Generality_Boundedness_3' && value === 'No') {
      form.setValue('Generality_Boundedness_4', 'N/A');
      form.trigger('Generality_Boundedness_4');
    }

    if (question.QuestionID === 'Generality_Boundedness_5' && value === 'No') {
      form.setValue('Generality_Boundedness_6', 'N/A');
      form.trigger('Generality_Boundedness_6');
    }

    if (question.QuestionID === 'Maintenance_1' && value === 'No') {
      form.setValue('Maintenance_2', 'N/A');
      form.setValue('Maintenance_3', 'N/A');

      form.trigger('Maintenance_2');
      form.trigger('Maintenance_3');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {study?.ExternalValidity.Questions.map((question) => {
          const questionStem =
            question.QuestionStem ??
            ExternalValidityQuestions.find((q) => q.QuestionID === question.QuestionID)?.QuestionStem;

          const questionInstruction =
            question.QuestionInstruction ??
            ExternalValidityQuestions.find((q) => q.QuestionID === question.QuestionID)?.QuestionInstruction;

          const questionType: string | undefined =
            question.QuestionType ??
            ExternalValidityQuestions.find((q) => q.QuestionID === question.QuestionID)?.QuestionType;

          if (!questionType) throw new Error('QuestionType is undefined');

          return (
            <FormField
              key={question.QuestionID}
              control={form.control}
              // @ts-expect-error - TS is not able to infer the type of t
              name={question.QuestionID}
              render={({ field }) => {
                return (
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
                );
              }}
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
