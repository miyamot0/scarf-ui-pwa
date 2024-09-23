import { Badge } from '@/components/ui/badge'
import { AestheticRow } from '../views/aesthetic_row'
import { HeadingComponent } from '../views/heading_component'

export const SpecificActionsSection = () => {
    return (
        <>
            <HeadingComponent Text="Specific Actions" />

            <div className="flex flex-col gap-y-4">
                <AestheticRow
                    Badge={
                        <Badge
                            variant={'outline'}
                            className="whitespace-nowrap mt-1 w-full flex justify-center"
                        >
                            Add Study
                        </Badge>
                    }
                    Text="This button allows researchers to add a new study to the dataset."
                />

                <AestheticRow
                    Badge={
                        <Badge
                            variant={'outline'}
                            className="whitespace-nowrap mt-1 w-full flex justify-center"
                        >
                            Save Data
                        </Badge>
                    }
                    Text="This button lets you save the current state of the dataset to your
                local storage. Local storage is not a secure location, and it is
                wiped should you clear your browser storage, so be sure to save
                your data to a secure/permanent location."
                />

                <AestheticRow
                    Badge={
                        <Badge
                            variant={'outline'}
                            className="whitespace-nowrap mt-1 w-full flex justify-center"
                        >
                            Export Data
                        </Badge>
                    }
                    Text="Exporting your data allows you to save your dataset to a file on your computer. This file can be shared with others, and can be re-imported into the application at a later time. This is a more secure way to save/preserve your data over time."
                />

                <AestheticRow
                    Badge={
                        <Badge
                            variant={'outline'}
                            className="whitespace-nowrap mt-1 w-full flex justify-center"
                        >
                            Import Data
                        </Badge>
                    }
                    Text="Importing data allows you to load a dataset from a file on your computer. This file must be in the correct format, and must have been exported from this application."
                />

                <AestheticRow
                    Badge={
                        <Badge
                            variant={'outline'}
                            className="whitespace-nowrap mt-1 w-full flex justify-center"
                        >
                            Actions
                        </Badge>
                    }
                    Text="Each record can be edited via the respective action button on the right side of the record. This allows you to update the data for a specific study."
                />

                <AestheticRow
                    Badge={
                        <Badge
                            variant={'outline'}
                            className="whitespace-nowrap mt-1 w-full flex justify-center"
                        >
                            Delete Record
                        </Badge>
                    }
                    Text="Selecting records and clicking the delete button will remove the selected records from the dataset. This action cannot be undone, so be sure you want to delete the records before you do so."
                />
            </div>
        </>
    )
}
