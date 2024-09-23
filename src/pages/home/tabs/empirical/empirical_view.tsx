import { StudyEmpiricalDataTable } from '@/components/tables/empirical/study_empirical_table';
import { study_columns } from '@/components/tables/empirical/study_empirical_columns';
import { HeadingComponent } from '../instructions/views/heading_component';
import { AppStateContext } from '@/components/context/data-provider';
import { useContext } from 'react';

export function EmpiricalTabView({ readonly }: { readonly?: boolean }) {
  const { context } = useContext(AppStateContext);

  return (
    <div className="flex flex-col gap-y-4">
      {!readonly && (
        <>
          <HeadingComponent Text="Data Inspection and Review" />
          <p>
            The data inspection tab here provides a high-level interface for viewing the specific data available for
            specific records. There is no ability to modify the data from this view; however, this view allows users to
            sort and query from the entire dataset as well as provide spot-checks for correctly save/entered study data.
          </p>

          <hr />
        </>
      )}

      <StudyEmpiricalDataTable data={context.Studies} columns={study_columns} />
    </div>
  );
}
