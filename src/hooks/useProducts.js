import { useQuery } from '@tanstack/react-query';
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

async function fetchProducts() {
    const res = await client.get('/get_products.php');
    const raw = res.data?.data ?? [];
    return raw.map(normalizeProduct);
}

export function useProducts() {
    return useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 5 * 60 * 1000,
    });
}
