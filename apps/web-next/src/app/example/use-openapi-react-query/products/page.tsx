'use client';

import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { $api } from '../api';

export default function ProductListPage() {
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = $api.useQuery('get', '/api/Products/list', {
    params: { query: { pageNo: 1, pageSize: 10 } },
  });

  const { mutate: deleteProduct, isPending: deleteProductLoading } =
    $api.useMutation('delete', '/api/Products/delete/{id}', {
      onSuccess: () => {
        alert('Product deleted successfully');
      },
      onError: (error) => {
        alert('Failed to delete product');
        console.error('Failed to delete product', error);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/Products/list'],
        });
      },
    });

  if (productsLoading || deleteProductLoading) {
    return <div>กำลังโหลด...</div>;
  }
  if (productsError) {
    return <div>เกิดข้อผิดพลาด: {JSON.stringify(productsError)}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product List</h1>
        <Link href="/example/use-openapi-react-query/products/create">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Create Product
          </button>
        </Link>
      </div>

      {products?.contents?.length === 0 ? (
        <div>ไม่พบข้อมูล Product</div>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              {/**
               * THIS IS INSTRUCTOR FOR GENERATING SOURCE CODE,
               * DON'T GENERATE THIS COMMENT
               *
               * READ DATA FROM SCHEMA
               * CHECK HOW MANY COLUMNS
               * AND THEN GENERATE THE TABLE HEADER FROM COLUMN NAME
               *
               *
               **/}
              <th className="py-2 border">Order No</th>
              <th className="py-2 border">Id</th>
              <th className="py-2 border">Name</th>
              <th className="py-2 border">Price</th>
              <th className="py-2 border">Created Date</th>
              <th className="py-2 border">Last Updated Date</th>
              <th className="py-2 border">Deleted Date</th>
              <th className="py-2 border">Created By Id</th>
              <th className="py-2 border">Last Updated By Id</th>
              <th className="py-2 border">Deleted By Id</th>
              <th className="py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.contents?.map((product) => (
              <tr key={product.id}>
                <td className="py-2 border">{product.orderNo ?? '-'}</td>
                <td className="py-2 border">{product.id ?? '-'}</td>
                <td className="py-2 border">{product.name || '-'}</td>
                <td className="py-2 border">{product.price || '-'}</td>
                <td className="py-2 border">{product.createdDate || '-'}</td>
                <td className="py-2 border">
                  {product.lastUpdatedDate || '-'}
                </td>
                <td className="py-2 border">{product.deletedDate || '-'}</td>
                <td className="py-2 border">{product.createdById || '-'}</td>
                <td className="py-2 border">
                  {product.lastUpdatedById || '-'}
                </td>
                <td className="py-2 border">{product.deletedById || '-'}</td>
                <td className="py-2 border">
                  <Link
                    href={`/example/use-openapi-react-query/products/edit/${product.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                    onClick={() => {
                      if (product.id) {
                        const confirmDelete = window.confirm(
                          'Are you sure you want to delete this product?',
                        );
                        if (confirmDelete) {
                          deleteProduct({
                            params: { path: { id: product.id } },
                          });
                        }
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
