import { Badge } from '@/components/ui/badge'
import { AestheticRow } from '../views/aesthetic_row'
import { HeadingComponent } from '../views/heading_component'

export const PeerReviewDataSection = () => {
    return (
        <>
            <HeadingComponent Text="Peer Reviewed/Publication Status" />

            <div className="flex flex-col gap-y-4">
                <AestheticRow
                    Badge={
                        <Badge
                            variant={'outline'}
                            className="whitespace-nowrap mt-1 w-full flex justify-center"
                        >
                            Unclassified
                        </Badge>
                    }
                    Text="Newly-add studies are labeled as 'Unclassified' by default and must be edited based on publication status."
                />

                <AestheticRow
                    Badge={
                        <Badge className="whitespace-nowrap bg-gray-500 hover:bg-gray-600 mt-1 w-full flex justify-center">
                            Unpublished
                        </Badge>
                    }
                    Text="Unpublished studies, or 'gray literature', are coded as 'Unpublished' in the study record."
                />

                <AestheticRow
                    Badge={
                        <Badge className="whitespace-nowrap bg-green-500 hover:bg-green-600 mt-1 w-full flex justify-center">
                            Published
                        </Badge>
                    }
                    Text="Studies that have been peer-reviewed and published in academic journals are code as 'Published' in the study record."
                />
            </div>
        </>
    )
}
