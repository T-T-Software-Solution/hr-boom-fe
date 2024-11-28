import type {
  MRT_ColumnDef,
  MRT_PaginationState,
  MRT_RowData,
  MRT_TableOptions,
} from 'mantine-react-table';
import type { Dispatch, SetStateAction } from 'react';

// Ensure T extends MRT_RowData
export const createTableConfig = <T extends MRT_RowData>({
  columns,
  data,
  totalCount,
  pagination,
  setPagination,
  isEventLoading,
  isError,
  errorMessage,
}: {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  totalCount: number;
  pagination: MRT_PaginationState;
  setPagination: Dispatch<SetStateAction<MRT_PaginationState>>;
  isEventLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}): MRT_TableOptions<T> => ({
  columns,
  data,
  rowCount: totalCount,
  enableRowNumbers: true,
  onPaginationChange: (updater) => {
    const newState =
      typeof updater === 'function'
        ? updater({
            pageIndex: pagination.pageIndex - 1,
            pageSize: pagination.pageSize,
          })
        : updater;
    const { pageIndex, pageSize } = newState;
    setPagination({
      pageIndex: pageIndex + 1,
      pageSize,
    });
  },
  state: {
    showSkeletons: isEventLoading,
    isLoading: isEventLoading,
    pagination: {
      pageIndex: pagination.pageIndex - 1,
      pageSize: pagination.pageSize,
    },
    showAlertBanner: isError,
    showProgressBars: false,
  },
  mantineToolbarAlertBannerProps: isEventLoading
    ? { color: 'red', children: errorMessage || 'Error while loading data' }
    : undefined,
  enableRowSelection: false,
  enableColumnResizing: true,
  enableColumnOrdering: true,
  columnFilterDisplayMode: 'popover',
  paginationDisplayMode: 'pages',
  positionToolbarAlertBanner: 'bottom',
  enableColumnPinning: true,
  enableRowActions: true,
  enableSorting: false,
  enableGlobalFilter: false,
  enableColumnFilters: false,
  manualPagination: true,
  displayColumnDefOptions: {
    'mrt-row-select': {
      size: 0,
      grow: false,
    },
    'mrt-row-actions': {
      minSize: 150,
    },
  },
  initialState: {
    density: 'xs',
    columnPinning: {
      left: ['mrt-row-expand', 'mrt-row-select', 'mrt-row-number'],
      right: ['mrt-row-actions'],
    },
  },
  mantinePaperProps: {
    shadow: 'lg',
    radius: 'md',
    py: 'md',
  },
});
