'use client';

import { useQueryClient } from '@tanstack/react-query';
import type { shoppingPaths } from '@tt-ss-hr/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { $api } from '../../api';

type Product = NonNullable<
  shoppingPaths['/api/Products']['post']['requestBody']
>['content']['application/json'];
// ! จุดนี้ต้อง make sure ว่า swagger มีการกำหนด requestBody ถูกต้อง

export default function CreateProductPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [product, setProduct] = useState<Product>();

  const { mutate: createProduct, isPending: createProductLoading } =
    $api.useMutation('post', '/api/Products', {
      onSuccess: () => {
        alert('Product created successfully');
        router.push('/example/use-openapi-react-query/products');
      },
      onError: (error) => {
        alert('Failed to create product');
        console.error('Failed to create product', error);
      },
      onSettled: async () => {
        await queryClient.invalidateQueries({
          queryKey: ['get', '/api/Products/list'],
        });
      },
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduct({
      body: product,
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Product</h1>
      <fieldset disabled={createProductLoading}>
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
            disabled={createProductLoading}
          >
            {createProductLoading ? 'Creating...' : 'Create Product'}
          </button>
        </form>
      </fieldset>
    </div>
  );
}
