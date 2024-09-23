import { StudyObject } from '@/questions/types/QuestionTypes';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '../../ui/checkbox';
import { DataTableColumnHeader } from '../general/study_column_header';
import { ActionCell } from './cells/action_cell';
import { StatusCell } from '../general/status_cell';

export const study_columns: ColumnDef<StudyObject>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'StudyID',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
  },
  {
    accessorKey: 'StudyTag',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tag" />,
  },
  {
    accessorKey: 'StudyAuthors',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Authors" />,
  },
  {
    accessorKey: 'StudyTitle',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
  },
  {
    accessorKey: 'StudyJournal',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Journal" />,
  },
  {
    accessorKey: 'StudyYear',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Year" />,
    cell: ({ row }) => <span>{row.original.StudyYear < 0 ? '' : row.original.StudyYear}</span>,
  },
  {
    id: 'StudyStatus',
    accessorKey: 'StudyStatus',
    header: 'Status',
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => <StatusCell Study={row.original} />,
  },
  {
    id: 'actions',
    header: 'Actions',
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => <ActionCell Study={row.original} />,
  },
];
