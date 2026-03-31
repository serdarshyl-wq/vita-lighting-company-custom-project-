import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../css/Intro.css';

function Intro({ navbarRef, logoRef, onComplete }) {
    const overlayRef = useRef(null);
    const barFillRef = useRef(null);

    useEffect(() => {
        const logo = logoRef.current;
        const navbar = navbarRef.current;
        if (!logo || !navbar) return;

        const fg = logo.querySelector('.intro-text-fg');
        const logoRect = logo.getBoundingClientRect();

        const centerX = (window.innerWidth - logoRect.width) / 2;
        const centerY = (window.innerHeight - logoRect.height) / 2 - 30;

        gsap.set(logo, { left: centerX, top: centerY });

        const tl = gsap.timeline();

        tl.to(barFillRef.current, {
            width: '100%',
            duration: 3,
            ease: 'power1.inOut',
        });
        tl.to(
            fg,
            {
                clipPath: 'inset(0 0% 0 0)',
                duration: 3,
                ease: 'power1.inOut',
            },
            '<'
        );

        tl.to({}, { duration: 0.3 });

        const navRect = navbar.getBoundingClientRect();
        let targetX = navRect.left + navRect.width / 2 - logoRect.width / 2;

        const vw = window.innerWidth;
        let scaleRatio;
        let targetY;

        if (vw > 768) {
            targetY = navRect.top + navRect.height / 2 - logoRect.height / 2;
            scaleRatio = 65 / logoRect.height;
        } else {
            const targetLogoH = vw <= 480 ? 32 : 45;
            scaleRatio = targetLogoH / logoRect.height;

            targetX -= 16;

            const buyBtn = navbar.querySelector('.buy-now-btn');
            if (buyBtn) {
                const btnRect = buyBtn.getBoundingClientRect();
                const btnCenterY = btnRect.top + btnRect.height / 2;
                const scaledHeight = logoRect.height * scaleRatio;
                targetY = (btnCenterY - scaledHeight / 2) - 18;
            } else {
                targetY = navRect.top + navRect.height / 2 - logoRect.height / 2;
            }
        }

        tl.to(barFillRef.current.parentElement, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
        });

        tl.to(
            logo,
            {
                left: targetX,
                top: targetY,
                scale: scaleRatio,
                duration: 0.8,
                ease: 'power3.inOut',
            },
            '<'
        );

        tl.to(
            overlayRef.current,
            {
                backgroundColor: 'rgba(0,0,0,0)',
                duration: 0.6,
                ease: 'power2.inOut',
            },
            '<'
        );

        tl.call(() => {
            navbar.style.opacity = '1';
            navbar.style.visibility = 'visible';
            overlayRef.current.style.display = 'none';
            logo.style.pointerEvents = 'auto';
            logo.style.zIndex = '300';
            if (onComplete) onComplete();
        });

        return () => {
            tl.kill();
        };
    }, [navbarRef, logoRef]);

    return (
        <div
            className="fixed inset-0 bg-black flex items-center justify-center z-200"
            ref={overlayRef}
        >
            <div className="mt-52">
                <div className="intro-bar-track h-2 bg-[#333333] rounded-lg overflow-hidden">
                    <div className="intro-bar-fill h-full bg-white rounded-lg" ref={barFillRef}></div>
                </div>
            </div>
        </div>
    );
}

export default Intro;
