import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useProductIds } from '../hooks/useProductIds';
import Footer from '../components/Footer';
import '../css/AllCollection.css';

const products = [
    { id: 1, name: 'Helix', price: 120 },
    { id: 2, name: 'Arc', price: 80 },
    { id: 3, name: 'Forma', price: 150 },
    { id: 4, name: 'Lux', price: 200 },
    { id: 5, name: 'Nova', price: 130 },
    { id: 6, name: 'Aura', price: 180 },
];

function AllCollection() {
    const { getIdByName } = useProductIds();
    const [isDark, setIsDark] = useState(false);
    const gridRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        document.title = 'All Collection | Vita';

        gsap.fromTo(
            headerRef.current,
            { opacity: 0, y: -24 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
        );

        const cards = gridRef.current?.children;
        if (cards) {
            gsap.fromTo(
                Array.from(cards),
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.07, ease: 'power3.out', delay: 0.2 }
            );
        }

        return () => {
            document.title = 'Vita';
        };
    }, []);

    return (
        <div className={`all-collection-page ${isDark ? 'dark' : ''}`}>
            <div className="all-collection-inner">
                <div ref={headerRef} className="all-collection-header">
                    <h1 className="all-collection-title">All Collection</h1>

                    <button
                        className="products-toggle"
                        onClick={() => setIsDark(!isDark)}
                        aria-label="Toggle dark mode"
                    >
                        <div className={`toggle-track ${isDark ? 'active' : ''}`}>
                            <div className="toggle-thumb" />
                        </div>
                    </button>
                </div>

                <div ref={gridRef} className="all-collection-grid">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="ac-product-card"
                            style={{ cursor: getIdByName(product.name) ? 'pointer' : 'default' }}
                            onClick={() => {
                                const realId = getIdByName(product.name);
                                if (realId) window.open(`/product/${realId}`, '_blank');
                            }}
                        >
                            <div className="ac-product-img-wrapper">
                                <img
                                    src={`/products/ürün${product.id}-off.png`}
                                    alt={product.name}
                                    className="ac-product-img ac-product-img-off"
                                />
                                <img
                                    src={`/products/ürün${product.id}-on.png`}
                                    alt={product.name}
                                    className="ac-product-img ac-product-img-on"
                                />
                            </div>
                            <div className="ac-product-info">
                                <h3 className="ac-product-name">{product.name}</h3>
                                <p className="ac-product-price">${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AllCollection;
