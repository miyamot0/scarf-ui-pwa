import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { CalculateAgreement } from '../helpers/reli_scoring'
import { ReliabilityState } from '@/types/ReliabilityState'
import { StudyReliDataTable } from '@/components/tables/reli/study_reli_table'
import { study_columns } from '@/components/tables/reli/study_reli_columns'
import { StudyObjectPair } from '@/questions/types/QuestionTypes'

export const AgreementStatus = ({ state }: { state: ReliabilityState }) => {
    if (state.primary && state.reliability) {
        const agreement = CalculateAgreement(
            state.primary.Studies,
            state.reliability.Studies
        )

        const study_pairs: StudyObjectPair[] = state.primary.Studies.map(
            (primary_study) => {
                const reliability = state.reliability?.Studies?.find(
                    (s) => s.StudyID === primary_study.StudyID
                )

                return {
                    primary: primary_study,
                    reliability,
                }
            }
        )

        return (
            <>
                <Card>
                    <CardHeader>
                        <CardTitle>Agreement Status</CardTitle>
                        <CardDescription>
                            Information on agreement is provided in the space
                            below
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-y-4">
                        <div className="flex flex-col gap-y-0">
                            <p>{`Total Percentage Overall Agreement: ${agreement.TotalPercent}`}</p>
                            <p>
                                {`Internal Validity = ${agreement.IV.Percent}, `}
                                {`External Validity = ${agreement.EV.Percent}, `}
                                {`Reporting = ${agreement.Reporting.Percent}, `}
                                {`Outcomes = ${agreement.Outcomes.Percent}`}
                            </p>
                        </div>

                        <StudyReliDataTable
                            columns={study_columns}
                            data={study_pairs}
                        />
                    </CardContent>
                </Card>
            </>
        )
    } else {
        return <div></div>
    }
}
