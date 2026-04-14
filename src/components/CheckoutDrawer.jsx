import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import '../css/CheckoutDrawer.css';

const PAYMENT_URL = 'https://api.vitalamps.online/create_payment.php';
const EMPTY = { name: '', surname: '', phone: '', email: '', address: '', tcNumber: '' };

function CheckoutDrawer({ isOpen, onClose, product }) {
    const [form, setForm]         = useState(EMPTY);
    const [formError, setFormError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const overlayRef     = useRef(null);
    const drawerRef      = useRef(null);
    const hasBeenOpened  = useRef(false);

    /* ── Animation ── */
    useEffect(() => {
        if (isOpen) {
            hasBeenOpened.current = true;
            document.body.style.overflow = 'hidden';
            setForm(EMPTY);
            setFormError(null);

            gsap.set(overlayRef.current, { display: 'block' });
            gsap.fromTo(overlayRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.32, ease: 'power2.out' }
            );
            gsap.fromTo(drawerRef.current,
                { x: '100%' },
                { x: '0%', duration: 0.48, ease: 'power3.out', delay: 0.04 }
            );
        } else if (hasBeenOpened.current) {
            gsap.to(drawerRef.current,
                { x: '100%', duration: 0.38, ease: 'power3.in' }
            );
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.28,
                delay: 0.08,
                onComplete: () => {
                    gsap.set(overlayRef.current, { display: 'none' });
                    document.body.style.overflow = '';
                },
            });
        }
    }, [isOpen]);

    /* ── Form ── */
    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'phone' || name === 'tcNumber') value = value.replace(/\D/g, '');
        setForm(prev => ({ ...prev, [name]: value }));
        if (formError) setFormError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, surname, phone, email, address, tcNumber } = form;

        if (!name.trim() || !surname.trim() || !phone.trim() || !email.trim() || !address.trim() || !tcNumber.trim()) {
            setFormError('Lütfen tüm alanları doldurunuz.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setFormError('Geçerli bir e-posta adresi giriniz.');
            return;
        }
        if (tcNumber.length < 10 || tcNumber.length > 11) {
            setFormError('T.C. Kimlik No / VKN 10 veya 11 haneli olmalıdır.');
            return;
        }

        setIsLoading(true);
        setFormError(null);

        try {
            const res = await axios.post(PAYMENT_URL, {
                id:      product.product_id,
                price:   product.price,
                name:    name.trim(),
                surname: surname.trim(),
                phone:   phone.trim(),
                email:   email.trim(),
                address:  address.trim(),
                tcNumber: tcNumber.trim(),
            });

            if (res.data?.success && res.data?.paymentUrl) {
                window.location.href = res.data.paymentUrl;
            } else {
                setFormError('Ödeme başlatılamadı. Lütfen tekrar deneyiniz.');
            }
        } catch {
            setFormError('Bir ağ hatası oluştu. Bağlantınızı kontrol ediniz.');
        } finally {
            setIsLoading(false);
        }
    };

    const price    = product?.price ? parseFloat(product.price).toFixed(2) : '—';
    const priceTL  = product?.price ? (parseFloat(product.price) * 33.50).toFixed(2) : '—';

    return (
        <>
            {/* Backdrop */}
            <div
                ref={overlayRef}
                className="cd-overlay"
                style={{ display: 'none' }}
                onClick={onClose}
            />

            {/* Drawer panel */}
            <div ref={drawerRef} className="cd-drawer">
                {/* Header */}
                <div className="cd-header">
                    <div>
                        <p className="cd-header-label">Sipariş Özeti</p>
                        <p className="cd-header-product">{product?.name}</p>
                    </div>
                    <button className="cd-close" onClick={onClose} aria-label="Kapat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Price strip */}
                <div className="cd-price-strip">
                    <span className="cd-price-usd">${price}</span>
                    <span className="cd-price-sep">·</span>
                    <span className="cd-price-tl">≈ ₺{priceTL}</span>
                    <span className="cd-price-note">(1$ = 33.50 TL)</span>
                </div>

                <div className="cd-divider" />

                {/* Form */}
                <form className="cd-form" onSubmit={handleSubmit} noValidate>
                    <div className="cd-row">
                        <div className="cd-field">
                            <label className="cd-label">Ad</label>
                            <input
                                className="cd-input"
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Ali"
                                autoComplete="given-name"
                            />
                        </div>
                        <div className="cd-field">
                            <label className="cd-label">Soyad</label>
                            <input
                                className="cd-input"
                                type="text"
                                name="surname"
                                value={form.surname}
                                onChange={handleChange}
                                placeholder="Yılmaz"
                                autoComplete="family-name"
                            />
                        </div>
                    </div>

                    <div className="cd-field">
                        <label className="cd-label">Telefon</label>
                        <input
                            className="cd-input"
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="05550000000"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            autoComplete="tel"
                        />
                    </div>

                    <div className="cd-field">
                        <label className="cd-label">T.C. Kimlik No / VKN</label>
                        <input
                            className="cd-input"
                            type="text"
                            name="tcNumber"
                            value={form.tcNumber}
                            onChange={handleChange}
                            placeholder="10 veya 11 hane"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={11}
                        />
                    </div>

                    <div className="cd-field">
                        <label className="cd-label">E-posta</label>
                        <input
                            className="cd-input"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="ali@ornek.com"
                            autoComplete="email"
                        />
                    </div>

                    <div className="cd-field">
                        <label className="cd-label">Açık Adres</label>
                        <textarea
                            className="cd-input cd-textarea"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            placeholder="Mahalle, cadde, bina no, daire no, ilçe / il"
                            autoComplete="street-address"
                            rows={3}
                        />
                    </div>

                    {formError && (
                        <div className="cd-error">
                            <span>{formError}</span>
                            <button type="button" className="cd-error-close" onClick={() => setFormError(null)}>✕</button>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="cd-submit"
                        disabled={isLoading}
                        style={isLoading ? { opacity: 0.7 } : undefined}
                    >
                        {isLoading ? (
                            <span className="cd-dots">
                                <span /><span /><span />
                            </span>
                        ) : 'Ödemeye Geç'}
                    </button>

                    <p className="cd-footer-note">
                        Güvenli ödeme Iyzico altyapısıyla sağlanmaktadır.
                    </p>
                </form>
            </div>
        </>
    );
}

export default CheckoutDrawer;
