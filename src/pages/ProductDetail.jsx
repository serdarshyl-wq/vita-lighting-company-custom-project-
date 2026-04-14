import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';
import Footer from '../components/Footer';
import CheckoutDrawer from '../components/CheckoutDrawer';
import '../css/ProductDetail.css';

const API_URL = 'https://api.vitalamps.online/get_products.php';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const imgColRef = useRef(null);
    const infoColRef = useRef(null);

    // Veri çekme
    useEffect(() => {
        setIsLoading(true);
        setIsError(false);

        axios.get(API_URL)
            .then((res) => {
                const list = res.data?.data ?? [];
                const found = list.find((p) => Number(p.product_id) === Number(id));
                if (found) {
                    setProduct(found);
                } else {
                    setIsError(true);
                }
            })
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false));
    }, [id]);

    // Sekme başlığı
    useEffect(() => {
        document.title = product ? `${product.name} | Vita` : 'Vita';
        return () => { document.title = 'Vita'; };
    }, [product]);

    // GSAP giriş animasyonu
    useEffect(() => {
        if (!product) return;
        gsap.fromTo(
            imgColRef.current,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }
        );
        gsap.fromTo(
            infoColRef.current,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 }
        );
    }, [product]);

    const imageUrl = product?.image ?? null;
    const price = product?.price ? parseFloat(product.price).toFixed(2) : null;
    const inStock = parseInt(product?.quantity ?? 0) > 0;

    return (
        <div className="pd-page">
            {/* Top bar */}
            <div className="pd-topbar">
                <Link to="/" className="pd-brand">VITA</Link>
            </div>

            {/* Content */}
            <div className="pd-main">
                {/* Image column */}
                <div className="pd-image-col" ref={imgColRef} style={{ opacity: 0 }}>
                    {isLoading && <div className="pd-skeleton-img" />}
                    {isError && <div className="pd-skeleton-img" style={{ opacity: 0.2 }} />}
                    {product && imageUrl && (
                        <div className="pd-img-wrapper">
                            <img
                                src={imageUrl}
                                alt={product.name}
                                className="pd-img"
                            />
                        </div>
                    )}
                </div>

                {/* Info column */}
                <div className="pd-info-col" ref={infoColRef} style={{ opacity: 0 }}>
                    {isLoading && (
                        <>
                            <p className="pd-label" style={{ opacity: 1 }}>Yükleniyor...</p>
                            <div className="pd-skeleton-line h-3 w-16" />
                            <div className="pd-skeleton-line h-12 w-64 mt-2" />
                            <div className="pd-skeleton-line h-6 w-24 mt-2" />
                            <div className="pd-divider mt-4" />
                            <div className="space-y-2 mt-4">
                                <div className="pd-skeleton-line h-3 w-full" />
                                <div className="pd-skeleton-line h-3 w-5/6" />
                                <div className="pd-skeleton-line h-3 w-4/6" />
                            </div>
                        </>
                    )}

                    {isError && (
                        <div className="space-y-4">
                            <p style={{ fontSize: '1rem', fontWeight: 500 }}>Ürün bulunamadı.</p>
                            <p className="pd-label">ID: {id} ile eşleşen ürün yok. Konsolu kontrol et.</p>
                            <button
                                className="pd-btn-secondary"
                                style={{ width: 'auto', padding: '0.75rem 1.5rem' }}
                                onClick={() => navigate('/')}
                            >
                                Ana Sayfaya Dön
                            </button>
                        </div>
                    )}

                    {product && (
                        <>
                            <span className="pd-label">Vita Lighting</span>

                            <h1 className="pd-name">{product.name}</h1>

                            <p className="pd-price">${price}</p>

                            <div className="pd-divider" />

                            {product.description && (
                                <div
                                    className="pd-description"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            )}

                            {product.model && (
                                <p className="pd-label">Model: {product.model}</p>
                            )}

                            <p className={`pd-stock ${inStock ? 'in-stock' : ''}`}>
                                {inStock
                                    ? `In Stock — ${product.quantity} units`
                                    : 'Out of Stock'}
                            </p>

                            <div className="pd-divider" />

                            <div className="pd-cta">
                                <button
                                    className="pd-btn-primary"
                                    onClick={() => setIsDrawerOpen(true)}
                                >
                                    Buy Now
                                </button>
                                <button className="pd-btn-secondary">
                                    Add to Wishlist
                                </button>
                            </div>


                        </>
                    )}
                </div>
            </div>

            <Footer />

            <CheckoutDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                product={product}
            />
        </div>
    );
}

export default ProductDetail;
