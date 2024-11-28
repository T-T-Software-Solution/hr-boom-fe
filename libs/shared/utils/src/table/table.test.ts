import type { MRT_ColumnDef, MRT_PaginationState } from 'mantine-react-table';
import { describe, expect, it, vi } from 'vitest';
import { createTableConfig } from './table';

// Define a mock data type for testing
interface Product {
  id: number;
  name: string;
  price: number;
}

describe('createTableConfig', () => {
  const columns: MRT_ColumnDef<Product>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Product Name' },
    { accessorKey: 'price', header: 'Product Price' },
  ];

  const data: Product[] = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
  ];

  const pagination: MRT_PaginationState = {
    pageIndex: 1,
    pageSize: 10,
  };

  const setPagination = vi.fn();

  it('should create a valid table configuration with default properties', () => {
    const config = createTableConfig<Product>({
      columns,
      data,
      totalCount: 2,
      pagination,
      setPagination,
      isEventLoading: false,
      isError: false,
    });

    expect(config?.initialState?.density).toBe('xs');
    // expect(config?.initialState?.columnPinning?.left).toContain('id');
    expect(config?.state?.pagination).toEqual({
      pageIndex: 0, // Adjusting for the internal zero-indexing of the table
      pageSize: 10,
    });
    expect(config?.state?.showSkeletons).toBe(false);
    expect(config?.state?.isLoading).toBe(false);
    expect(config?.state?.showAlertBanner).toBe(false);
  });

  it('should set loading and error states correctly', () => {
    const config = createTableConfig<Product>({
      columns,
      data,
      totalCount: 2,
      pagination,
      setPagination,
      isEventLoading: true,
      isError: true,
      errorMessage: 'Error while loading data',
    });

    expect(config?.state?.showSkeletons).toBe(true);
    expect(config?.state?.isLoading).toBe(true);
    expect(config?.state?.showAlertBanner).toBe(true);

    expect(config?.mantineToolbarAlertBannerProps).toEqual({
      color: 'red',
      children: 'Error while loading data',
    });
  });

  it('should handle pagination changes correctly', () => {
    const config = createTableConfig<Product>({
      columns,
      data,
      totalCount: 2,
      pagination,
      setPagination,
    });

    // Simulate a pagination change directly
    if (config?.onPaginationChange) {
      config.onPaginationChange((prevState: MRT_PaginationState) => ({
        ...prevState,
        pageIndex: 2,
      }));

      // Expect `setPagination` to have been called with the adjusted page index
      expect(setPagination).toHaveBeenCalledWith({
        pageIndex: 3, // Adjusts by +1 for user-friendly pagination
        pageSize: 10,
      });
    }
  });
});
