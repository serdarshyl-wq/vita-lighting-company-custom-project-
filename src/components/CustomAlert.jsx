import { useEffect, useRef, useState } from 'react';
import '../css/CustomAlert.css';

const MESSAGE = 'Test ortamındasınız. Başarılı bir ödeme denemesi için 4603 4500 0000 0000 (Visa) numaralı Iyzico test kartını kullanabilirsiniz. SKT için rastgele geçerli bir numara ve CVV için "123" rakamlarını girebilirsiniz.';

function CustomAlert({ trigger }) {
    const [showAlert, setShowAlert] = useState(false);
    const hideTimer = useRef(null);

    const show = (duration = 7000) => {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        setShowAlert(false);
        setTimeout(() => setShowAlert(true), 50);
        hideTimer.current = setTimeout(() => setShowAlert(false), duration);
    };

    // Intro tamamlandığında otomatik aç
    useEffect(() => {
        if (!trigger) return;
        const t = setTimeout(() => show(9000), 400);
        return () => clearTimeout(t);
    }, [trigger]);

    // href="#" veya buy-now-btn tıklamalarında aç
    useEffect(() => {
        const handleClick = (e) => {
            const target = e.target.closest('a') || e.target.closest('.buy-now-btn');
            if (!target) return;
            const href = target.getAttribute('href');
            if (href === '#' || target.classList.contains('buy-now-btn')) {
                e.preventDefault();
                show(7000);
            }
        };
        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, []);

    return (
        <div className={`custom-alert-overlay ${showAlert ? 'active' : ''}`}>
            <div className="custom-alert-box">
                <i className="fa-solid fa-credit-card custom-alert-icon" />
                <div className="custom-alert-content">
                    <h4>Test Ortamı</h4>
                    <p>{MESSAGE}</p>
                </div>
                <button className="custom-alert-close" onClick={() => setShowAlert(false)} aria-label="Kapat">
                    <i className="fa-solid fa-xmark" />
                </button>
            </div>
        </div>
    );
}

export default CustomAlert;
