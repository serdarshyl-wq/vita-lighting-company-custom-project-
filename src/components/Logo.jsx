import { forwardRef } from 'react';
import '../css/Intro.css';

const Logo = forwardRef(function Logo({ containerClass, textClass }, ref) {
    // Props verilmediyse orijinal (fixed ve mix-blend) intro ayarlarını kullan
    const wrapperClass = containerClass !== undefined ? containerClass : "fixed z-[300] pointer-events-none mix-blend-difference";
    const wrapperStyle = containerClass !== undefined ? {} : { mixBlendMode: 'difference' };
    const innerTextClass = textClass !== undefined ? textClass : "text-white";

    return (
        <div ref={ref} className={wrapperClass} style={wrapperStyle}>
            <div className="relative">
                <div className={`intro-text-bg tracking-[0.15em] leading-none select-none ${innerTextClass}`}>
                    VITA
                </div>
                <div className={`intro-text-fg absolute inset-0 tracking-[0.15em] leading-none select-none ${innerTextClass}`}>
                    VITA
                </div>
            </div>
        </div>
    );
});

export default Logo;
