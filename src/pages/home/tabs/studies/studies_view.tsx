import { Button } from '@/components/ui/button';
import { EditIcon, FilePlus2Icon, HardDriveDownloadIcon, SaveIcon } from 'lucide-react';
import { study_columns } from '@/components/tables/dashboard/study_status_columns';
import { StudyStatusDataTable } from '@/components/tables/dashboard/study_status_table';
import { HeadingComponent } from '../instructions/views/heading_component';
import { toast } from 'sonner';
import { useContext } from 'react';
import { AppStateContext } from '@/components/context/data-provider';

export function StudiesView({ readonly }: { readonly?: boolean }) {
  const { context, dispatch } = useContext(AppStateContext);

  return (
    <div className="flex flex-col gap-y-4">
      {!readonly && (
        <>
          <HeadingComponent Text="Study Coding" />
          <p>
            This tab provides a method for adding, coding, and monitoring the progress of study coding in the planned
            data set. By default, the app does not perform any local or external saving without explicit actions from
            the user. Data is saved to the local browser using the{' '}
            <SaveIcon
              size={14}
              className="inline border border-input bg-background hover:bg-accent hover:text-accent-foreground h-7 rounded-md px-1 py-1 w-8"
            />{' '}
            button available in the menu bar. Users are recommended to regularly export their data using the{' '}
            <HardDriveDownloadIcon
              size={14}
              className="inline border border-input bg-background hover:bg-accent hover:text-accent-foreground h-7 rounded-md px-1 py-1 w-8"
            />{' '}
            button to ensure that their data is not accidentally deleted or overwritten.
          </p>
          <p>
            The table below allows for users to add and edit studies as necessary. Users can add a new record to the
            data set using the button below the table and individual study records can be modified using the{' '}
            <EditIcon
              size={14}
              className="inline border border-input bg-background hover:bg-accent hover:text-accent-foreground h-7 rounded-md px-1 py-1 w-8"
            />{' '}
            button available on the respective table row. The completeness of a specific study record will be indicated
            in the Status column.
          </p>

          <hr />
        </>
      )}

      <StudyStatusDataTable
        data={context.Studies}
        columns={
          readonly ? study_columns.filter((col) => col.id !== 'actions' && col.id !== 'StudyStatus') : study_columns
        }
      />

      {!readonly && (
        <Button
          size={'lg'}
          className="w-full"
          onClick={() => {
            dispatch({ type: 'add' });

            toast('Study Appended to Dataset', {
              description: 'See the main table to begin coding.',
              duration: 2000,
              dismissible: true,
            });
          }}
        >
          <FilePlus2Icon size={20} className="mr-2" />
          Add Study
        </Button>
      )}
    </div>
  );
}
