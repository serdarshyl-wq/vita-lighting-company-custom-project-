import { useEffect, useState } from 'react';
import '../css/CustomAlert.css';

function CustomAlert() {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const handleClick = (e) => {
            // Find the closest anchor tag or element with a buy-now-btn class
            const target = e.target.closest('a') || e.target.closest('.buy-now-btn');
            
            if (target) {
                const href = target.getAttribute('href');
                // Intercept any placeholder links (href="#") or the buy-now button
                if (href === '#' || target.classList.contains('buy-now-btn')) {
                    e.preventDefault();
                    
                    // Reset animation correctly if clicked multiple times rapidly
                    setShowAlert(false);
                    setTimeout(() => setShowAlert(true), 50);
                    
                    // Auto hide after 4 seconds
                    setTimeout(() => {
                        setShowAlert(false);
                    }, 4000);
                }
            }
        };

        // Use capture phase to ensure we catch it before any other library ignores it
        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, []);

    return (
        <div className={`custom-alert-overlay ${showAlert ? 'active' : ''}`}>
            <div className="custom-alert-box">
                <i className="fa-solid fa-circle-info custom-alert-icon"></i>
                <div className="custom-alert-content">
                    <h4>Notice</h4>
                    <p>This is a custom design showcase.<br className="md:hidden" /> No real purchases can be made.</p>
                </div>
                <button className="custom-alert-close" onClick={() => setShowAlert(false)} aria-label="Close">
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
    );
}

export default CustomAlert;
