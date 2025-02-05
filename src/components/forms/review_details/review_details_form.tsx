import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ReviewDetailsSchema } from './review_details_schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Review_Types } from '@/types/ReviewTypes';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { AppStateContext } from '@/components/context/data-provider';
import { useContext } from 'react';

export function ReviewDetailsForm() {
  const { context, dispatch } = useContext(AppStateContext);

  const form = useForm<z.infer<typeof ReviewDetailsSchema>>({
    resolver: zodResolver(ReviewDetailsSchema),
    defaultValues: {
      title: context?.ReviewName ?? '',
      type: context?.ReviewType ?? 'Primary',
      auto_save: context?.AutoSave ?? false,
      hide_maintenance: context?.HideMaintenance ?? false,
      hide_generalization: context?.HideGeneralization ?? false,
    },
  });

  function onSubmit(values: z.infer<typeof ReviewDetailsSchema>) {
    dispatch({
      type: 'update_review',
      payload: {
        review_name: values.title,
        review_type: values.type,
        auto_save: values.auto_save,
        hide_maintenance: values.hide_maintenance,
        hide_generalization: values.hide_generalization,
      },
    });

    toast('Updated Review Information', {
      description: 'Your data has been saved.',
      duration: 2000,
      dismissible: true,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Title</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Give a name to this review file to distinguish it from others</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={'type'}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Primary or Reliability Coder</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      {Review_Types.map((option) => {
                        return (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormDescription>Select whether file is for a primary or reliability coder</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="auto_save"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg ">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Auto Save Progress</FormLabel>
                <FormDescription>Save to local machine after each update</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hide_maintenance"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg ">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Hide Maintenance Visuals</FormLabel>
                <FormDescription>Hide visuals related to Maintenance</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hide_generalization"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg ">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Hide Generalization Visuals</FormLabel>
                <FormDescription>Hide visuals related to Generalization</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" size={'lg'} className="w-full">
          Update Review
        </Button>
      </form>
    </Form>
  );
}
