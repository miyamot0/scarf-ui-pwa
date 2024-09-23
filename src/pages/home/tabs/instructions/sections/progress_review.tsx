import { Badge } from '@/components/ui/badge'
import { AestheticRow } from '../views/aesthetic_row'
import { HeadingComponent } from '../views/heading_component'

export const ProgressReviewSection = () => {
    return (
        <>
            <HeadingComponent Text="Coding Progress" />

            <div className="flex flex-col gap-y-4">
                <AestheticRow
                    Badge={
                        <Badge className="whitespace-nowrap bg-red-500 hover:bg-red-600 mt-1 w-full flex justify-center">
                            Not Started
                        </Badge>
                    }
                    Text="Newly-add studies are not yet coded and are highlighted in red."
                />

                <AestheticRow
                    Badge={
                        <Badge className="whitespace-nowrap bg-orange-500 hover:bg-orange-600 mt-1 w-full flex justify-center">
                            In Progress
                        </Badge>
                    }
                    Text="Studies that are partly coded are highlighted in orange to illustrate partial completion."
                />

                <AestheticRow
                    Badge={
                        <Badge className="whitespace-nowrap bg-green-500 hover:bg-green-600 mt-1 w-full flex justify-center">
                            Completed
                        </Badge>
                    }
                    Text="Studies with all fields populated are highlighed in green to display completed records."
                />
            </div>
        </>
    )
}
