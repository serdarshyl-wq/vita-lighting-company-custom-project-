import { useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import Footer from '../components/Footer';
import '../css/ResultPages.css';

function Success() {
    const [searchParams] = useSearchParams();
    const orderId    = searchParams.get('orderId');
    const invoiceUrl = searchParams.get('invoiceUrl');
    const contentRef = useRef(null);

    useEffect(() => {
        document.title = 'Order Confirmed | Vita';
        gsap.fromTo(
            contentRef.current,
            { opacity: 0, y: 48 },
            { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }
        );
        return () => { document.title = 'Vita'; };
    }, []);

    return (
        <div className="rp-page">
            <div className="rp-topbar">
                <Link to="/" className="rp-brand">VITA</Link>
            </div>

            <div className="rp-content" ref={contentRef} style={{ opacity: 0 }}>
                <div className="rp-icon rp-icon--success">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                </div>

                <h1 className="rp-title">Ödemeniz Başarıyla Alındı</h1>
                <p className="rp-subtitle">Siparişiniz için teşekkür ederiz. En kısa sürede hazırlanmaya başlanacaktır.</p>

                {orderId && (
                    <div className="rp-meta">
                        <span className="rp-meta-label">Sipariş No</span>
                        <span className="rp-meta-value">{orderId}</span>
                    </div>
                )}

                {invoiceUrl && (
                    <div className="rp-invoice">
                        <p className="rp-invoice-label">e-Faturanız başarıyla oluşturuldu.</p>
                        <a
                            href={invoiceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rp-btn rp-btn--invoice"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Faturayı İndir (PDF)
                        </a>
                    </div>
                )}

                <Link to="/" className="rp-btn rp-btn--primary">Ana Sayfaya Dön</Link>
            </div>

            <Footer />
        </div>
    );
}

export default Success;
