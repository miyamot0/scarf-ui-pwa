import { useForm } from 'react-hook-form';
import { StudyDetailsSchema } from './study_details_schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StudyObject } from '@/questions/types/QuestionTypes';
import { toast } from 'sonner';
import { useContext } from 'react';
import { AppStateContext } from '@/components/context/data-provider';

export function StudyDetailsForm({ study }: { study?: StudyObject }) {
  const { dispatch } = useContext(AppStateContext);

  const form = useForm<z.infer<typeof StudyDetailsSchema>>({
    resolver: zodResolver(StudyDetailsSchema),
    defaultValues: {
      code: study?.StudyTag ?? '',
      authors: study?.StudyAuthors ?? '',
      title: study?.StudyTitle ?? '',
      journal: study?.StudyJournal ?? '',
      year: study?.StudyYear ?? -1,
    },
  });

  function onSubmit(values: z.infer<typeof StudyDetailsSchema>) {
    if (!study) throw new Error('Study should not be undefined');

    const updated_study: StudyObject = {
      ...study,
      StudyTag: values.code,
      StudyAuthors: values.authors,
      StudyTitle: values.title,
      StudyJournal: values.journal,
      StudyYear: values.year,
    };

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
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Study Code</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>This is a unique code for the study (Recommended).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="authors"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Study Authors</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Input the study authors, separated by a semicolon.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Study Title</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Input the title of the study.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="journal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Study Journal</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Input the journal the study was published in.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Study Year</FormLabel>
              <FormControl>
                <Input placeholder="" type="number" {...field} />
              </FormControl>
              <FormDescription>Input the year that the study was published.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size={'lg'} className="w-full">
          Update Study
        </Button>
      </form>
    </Form>
  );
}
