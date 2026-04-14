import { useQuery, useQueryClient } from '@tanstack/react-query';
import client from '../api/opencartClient';

function normalizeProduct(p) {
    return {
        id: String(p.product_id),
        name: p.name,
        price: parseFloat(p.price).toFixed(2),
        description: p.description ?? '',
        model: p.model ?? '',
        quantity: p.quantity ?? 0,
        imageOff: p.image ?? null,
        imageOn: p.image ?? null,
    };
}

async function fetchProductById(id) {
    const res = await client.get('/get_products.php');
    const raw = res.data?.data ?? [];
    const found = raw.find((p) => String(p.product_id) === String(id));
    if (!found) throw new Error('Product not found');
    return normalizeProduct(found);
}

export function useProduct(id) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id),
        // Ürün listesi cache'deyse oradan al, ek istek atma
        initialData: () => {
            const cached = queryClient.getQueryData(['products']);
            return cached?.find((p) => p.id === String(id));
        },
        initialDataUpdatedAt: () =>
            queryClient.getQueryState(['products'])?.dataUpdatedAt,
        staleTime: 5 * 60 * 1000,
    });
}
