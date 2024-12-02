'use client';

import { useQueryClient } from '@tanstack/react-query';
import type { shoppingPaths } from '@tt-ss-hr/api';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { $api } from '../../../api';

type Product = NonNullable<
  shoppingPaths['/api/Products/update/{id}']['put']['requestBody']
>['content']['application/json'];

export default function EditProductPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = $api.useQuery('get', '/api/Products/{id}', {
    params: { path: { id: id as string } },
  });

  useEffect(() => {
    if (productData) {
      setProduct(productData);
    }
  }, [productData]);

  const { mutate: updateProduct, isPending: updateProductLoading } =
    $api.useMutation('put', '/api/Products/update/{id}', {
      onSuccess: () => {
        alert('Product updated successfully');
        router.push('/example/use-openapi-react-query/products');
      },
      onError: (error) => {
        alert('Failed to update product');
        console.error('Failed to update product', error);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/Products/list'],
        });
      },
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProduct({
      params: { path: { id: id as string } },
      body: product,
    });
  };

  if (productLoading) {
    return <div>กำลังโหลด...</div>;
  }

  if (productError) {
    return <div>เกิดข้อผิดพลาด: {JSON.stringify(productError)}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <fieldset disabled={updateProductLoading}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={product?.name ?? ''}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              value={product?.price ?? ''}
              onChange={(e) =>
                setProduct({
                  ...product,
                  price: e.target.value ? Number(e.target.value) : undefined,
                })
              }
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={updateProductLoading}
          >
            {updateProductLoading ? 'Updating...' : 'Update Product'}
          </button>
        </form>
      </fieldset>
    </div>
  );
}
