import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import '../css/Products.css';

const products = [
    { id: 1, name: 'Helix', price: 120 },
    { id: 2, name: 'Arc', price: 80 },
    { id: 3, name: 'Forma', price: 150 },
    { id: 4, name: 'Lux', price: 200 },
    { id: 5, name: 'Nova', price: 130 },
    { id: 6, name: 'Aura', price: 180 },
];

function Products() {
    const [isDark, setIsDark] = useState(false);
    const gridRef = useRef(null);
    const sectionRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const cards = gridRef.current?.children;
        if (!cards) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;

                    gsap.to(Array.from(cards), {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: 'power3.out',
                    });
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            className={`products-section relative w-full overflow-hidden ${isDark ? 'dark' : ''}`}
            ref={sectionRef}
        >
            <div className="px-8 py-20">
                <div className="flex items-center justify-between mb-16">
                    <h2 className="products-title text-4xl font-medium tracking-wide">
                        Products
                    </h2>
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

                <div
                    className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8"
                    ref={gridRef}
                >
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-img-wrapper">
                                <img
                                    src={`/products/ürün${product.id}-off.png`}
                                    alt={product.name}
                                    className="product-img product-img-off"
                                />
                                <img
                                    src={`/products/ürün${product.id}-on.png`}
                                    alt={product.name}
                                    className="product-img product-img-on"
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="text-lg font-medium tracking-wide">{product.name}</h3>
                                <p className="text-sm opacity-60 mt-1">${product.price}</p>
                            </div>
                        </div>
                    ))}

                    <div className="product-card col-span-2 md:col-span-3 flex justify-center mt-8 mb-4">
                        <button className={`group flex items-center gap-3 px-8 py-3.5 rounded-full text-sm font-medium tracking-0.1em uppercase transition-colors duration-300 ${isDark
                            ? 'bg-white text-black hover:bg-neutral-200'
                            : 'bg-black text-white hover:bg-neutral-800'
                            }`}>
                            View All Collection
                            <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Products;
