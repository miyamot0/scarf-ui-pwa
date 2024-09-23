import { ReactNode } from 'react'

export const AestheticRow = ({
    Badge,
    Text,
}: {
    Badge: ReactNode
    Text: string
}) => {
    return (
        <div className="flex flex-row items-start gap-x-2">
            <div className="flex flex-row justify-center min-w-[115px]">
                {Badge}
            </div>
            {Text}
        </div>
    )
}
