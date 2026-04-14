import { useEffect, useState } from 'react';
import axios from 'axios';

// Sadece alfabetik karakterleri bırak, vita prefix'ini sil
// 'VITA-HELIX', 'VITA HELIX', 'HELIX', 'Helix' → hepsi 'helix'
const normalize = (name) =>
    name
        .toLowerCase()
        .replace(/^vita[-\s]*/i, '')   // baştan vita- veya vita  sil
        .replace(/[^a-z]/g, '');        // harf dışı her şeyi sil

export function useProductIds() {
    const [idMap, setIdMap] = useState({});

    useEffect(() => {
        axios.get('https://api.vitalamps.online/get_products.php')
            .then((res) => {
                const list = res.data?.data ?? [];
                const map = {};
                list.forEach((p) => {
                    map[normalize(p.name)] = p.product_id;
                });
                setIdMap(map);
            })
            .catch(() => {});
    }, []);

    const getIdByName = (name) => {
        const key = normalize(name);

        // 1. Exact match
        if (idMap[key] !== undefined) return idMap[key];

        // 2. Fuzzy fallback: API key içinde bizim key geçiyorsa eşleş
        //    (ör: 'vitahelix'.includes('helix') → true)
        for (const [k, id] of Object.entries(idMap)) {
            if (k.includes(key) || key.includes(k)) return id;
        }

        return null;
    };

    return { getIdByName };
}
