import { useForm } from 'react-hook-form'
import { StudyDetailsSchema } from './study_planning_schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { dbAtom } from '@/atoms/db_atom'
import { useReducerAtomLocal as useReducerAtom } from '@/components/hooks/useReducerAtomLocal'
import { database_reducer } from '@/atoms/reducers/reducer'
import { toast } from 'sonner'
import { Textarea } from '@/components/ui/textarea'
import { TypeOfPlanningObject } from '@/questions/types/QuestionTypes'

export function StudyPlanningForm({
    readonly = false,
}: {
    readonly?: boolean
}) {
    const [state, dispatch] = useReducerAtom(dbAtom, database_reducer)

    const form = useForm<z.infer<typeof StudyDetailsSchema>>({
        resolver: zodResolver(StudyDetailsSchema),
        defaultValues: {
            Plan_General_1: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_General_1'
            )?.Response,
            Plan_General_2: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_General_2'
            )?.Response,
            Plan_General_3: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_General_3'
            )?.Response,
            Plan_General_4: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_General_4'
            )?.Response,
            Plan_Reporting_1: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Reporting_1'
            )?.Response,
            Plan_Reporting_2: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Reporting_2'
            )?.Response,
            Plan_Reporting_3: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Reporting_3'
            )?.Response,
            Plan_Reporting_4: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Reporting_4'
            )?.Response,
            Plan_Reporting_5: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Reporting_5'
            )?.Response,
            Plan_Reporting_6: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Reporting_6'
            )?.Response,
            Plan_Reporting_7: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Reporting_7'
            )?.Response,
            Plan_DV_Measurement_4: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_DV_Measurement_4'
            )?.Response,
            Plan_DV_Measurement_5: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_DV_Measurement_5'
            )?.Response,
            Plan_Reporting_8: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Reporting_8'
            )?.Response,
            Plan_Reporting_9: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Reporting_9'
            )?.Response,
            Plan_Reporting_10: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Reporting_10'
            )?.Response,
            Plan_Reporting_11: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Reporting_11'
            )?.Response,
            Plan_Reporting_12: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Reporting_12'
            )?.Response,
            Plan_Fidelity_2: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Fidelity_2'
            )?.Response,
            Plan_Fidelity_3: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Fidelity_3'
            )?.Response,
            Plan_Fidelity_4: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Fidelity_4'
            )?.Response,
            Plan_Social_Validity_1: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Social_Validity_1'
            )?.Response,
            Plan_Generality_Boundedness_1: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Generality_Boundedness_1'
            )?.Response,
            Plan_Generality_Boundedness_3: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Generality_Boundedness_3'
            )?.Response,
            Plan_Generality_Boundedness_5: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Generality_Boundedness_5'
            )?.Response,
            Plan_Maintenance_1: state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === 'Plan_Maintenance_1'
            )?.Response,
        },
    })

    function onSubmit(values: z.infer<typeof StudyDetailsSchema>) {
        const updated_questions = Object.keys(values).map((key) => {
            const question = state.ReviewPlans.Questions.find(
                (q) => q.QuestionID === key
            )

            if (!question) throw new Error('Question not found in state.')

            return {
                ...question,
                Response: values[key as keyof typeof values],
            }
        })

        const updated_plans: TypeOfPlanningObject = {
            Status: 'Completed',
            Questions: updated_questions,
        }

        dispatch({
            type: 'update_review_plans',
            payload: { plans: updated_plans },
        })

        toast('Study Plans Updated.', {
            description: 'You may begin inserting studies and coding.',
            duration: 2000,
            dismissible: true,
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {state.ReviewPlans.Questions.map((question) => {
                    const questionStem = question.QuestionStem
                    const questionInstruction = question.QuestionInstruction

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

                                    <FormDescription>
                                        {questionInstruction}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )
                })}

                {readonly !== true && (
                    <Button type="submit" size={'lg'} className="w-full">
                        Update Review
                    </Button>
                )}
            </form>
        </Form>
    )
}
