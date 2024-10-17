import { StudyEmpiricalDataTable } from '@/components/tables/empirical/study_empirical_table';
import { study_columns } from '@/components/tables/empirical/study_empirical_columns';
import { HeadingComponent } from '../instructions/views/heading_component';
import { GlobalStateType } from '@/questions/types/GlobalStateType';
import { StudyEmpiricalDataTableRO } from '@/components/tables/empirical/study_empirical_tableRO';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function EmpiricalTabView({ readonly, context }: { readonly?: boolean; context?: GlobalStateType }) {
  const [loaded, isLoaded] = useState(false);

  useEffect(() => {
    isLoaded(true);
  }, []);

  return (
    <div
      className={cn('flex flex-col gap-y-4 transition-opacity', {
        'opacity-100': loaded,
        'opacity-0': !loaded,
      })}
    >
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

      {readonly ? (
        <StudyEmpiricalDataTableRO columns={study_columns} context={context!} />
      ) : (
        <StudyEmpiricalDataTable columns={study_columns} />
      )}
    </div>
  );
}
