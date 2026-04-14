import { useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import gsap from 'gsap';
import Footer from '../components/Footer';
import '../css/ResultPages.css';

function Fail() {
    const [searchParams] = useSearchParams();
    const reason = searchParams.get('reason');
    const contentRef = useRef(null);

    useEffect(() => {
        document.title = 'Payment Failed | Vita';
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
                <div className="rp-icon rp-icon--fail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>

                <h1 className="rp-title">Ödeme Başarısız</h1>
                <p className="rp-subtitle">İşleminiz gerçekleştirilemedi. Lütfen bilgilerinizi kontrol ederek tekrar deneyiniz.</p>

                {reason && (
                    <div className="rp-reason">
                        <span className="rp-reason-text">{reason}</span>
                    </div>
                )}

                <div className="rp-actions">
                    <Link to="/collection" className="rp-btn rp-btn--primary">Koleksiyona Dön</Link>
                    <button className="rp-btn rp-btn--secondary" onClick={() => history.back()}>Tekrar Dene</button>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Fail;
