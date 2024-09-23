import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '../../ui/button';
import React, { useContext } from 'react';
import { Input } from '../../ui/input';
import { DataTablePagination } from '../general/study_table_pagination';
import { DataTableViewOptions } from '../general/study_table_column_toggle';
import { DeleteIcon } from 'lucide-react';
import { StudyObject } from '@/questions/types/QuestionTypes';
import { toast } from 'sonner';
import { AppStateContext } from '@/components/context/data-provider';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: StudyObject[];
}

export function StudyStatusDataTable<TData, TValue>({ columns, data }: DataTableProps<StudyObject, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    StudyID: false,
  });
  const [rowSelection, setRowSelection] = React.useState({});
  const { dispatch } = useContext(AppStateContext);

  const table = useReactTable<StudyObject>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    enableMultiRowSelection: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const selected_rows = table.getSelectedRowModel().rows;

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center justify-between">
        <Input
          placeholder="Filter by study title"
          value={(table.getColumn('StudyTitle')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('StudyTitle')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex flex-row gap-x-2">
          {selected_rows.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              className="ml-auto hidden h-8 lg:flex "
              onClick={() => {
                const selected_ids = selected_rows.map((r) => r.original).map((r) => r.StudyID);

                dispatch({
                  type: 'remove',
                  payload: { study_ids: selected_ids },
                });

                toast('Dataset Updated.', {
                  description: 'Specific record(s) have been removed.',
                  duration: 2000,
                  dismissible: true,
                });
              }}
            >
              <DeleteIcon size={18} className="mr-2" />
              Delete Selected
            </Button>
          )}

          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No Studies Entered.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
