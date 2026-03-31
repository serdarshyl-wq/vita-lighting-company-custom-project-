import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Logo from './Logo';
import '../css/Footer.css';

function Footer() {
    const footerRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;

                    const tl = gsap.timeline();

                    tl.to(footerRef.current.querySelector('.footer-logo'), {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power3.out'
                    });

                    tl.to(footerRef.current.querySelectorAll('.footer-link, .footer-social'), {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.05,
                        ease: 'power2.out'
                    }, '-=0.4');

                    tl.to(footerRef.current.querySelector('.footer-copy'), {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out'
                    }, '-=0.2');
                }
            },
            { threshold: 0.15 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="footer-container bg-white text-black py-24 px-8 flex flex-col items-center justify-center relative overflow-hidden"
        >
            <Logo
                containerClass="footer-logo mb-16 flex justify-center w-full"
                textClass="text-black text-[12vw] md:text-[8rem] lg:text-[10rem] font-black uppercase"
            />
            <div className="w-full max-w-6xl footer-links-grid grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 text-center md:text-left">
                <div className="flex flex-row md:flex-col flex-wrap justify-center gap-6 md:gap-4 items-center md:items-start text-sm md:text-lg font-medium tracking-wide">
                    <a href="#" className="footer-link hover:opacity-50 transition-opacity">About</a>
                    <a href="#" className="footer-link hover:opacity-50 transition-opacity">Inspire</a>
                    <a href="#" className="footer-link hover:opacity-50 transition-opacity">Collection</a>
                </div>

                <div className="flex flex-row md:flex-col flex-wrap justify-center gap-6 md:gap-4 items-center md:items-start text-sm md:text-lg font-medium tracking-wide">
                    <a href="#" className="footer-link hover:opacity-50 transition-opacity">Best Sellers</a>
                    <a href="#" className="footer-link hover:opacity-50 transition-opacity">Extras</a>
                    <a href="#" className="footer-link hover:opacity-50 transition-opacity">Services</a>
                </div>

                <div className="flex flex-row md:flex-col flex-wrap justify-center gap-6 md:gap-4 items-center md:items-start text-sm md:text-lg font-medium tracking-wide opacity-70">
                    <a href="#" className="footer-link hover:opacity-100 transition-opacity whitespace-nowrap">Contact Us</a>
                    <a href="#" className="footer-link hover:opacity-100 transition-opacity whitespace-nowrap">Privacy Policy</a>
                    <a href="#" className="footer-link hover:opacity-100 transition-opacity whitespace-nowrap">Terms of Service</a>
                </div>

                <div className="flex flex-col gap-5 items-center md:items-start text-center md:text-left">
                    <span className="footer-link font-semibold text-2xl tracking-tight mb-1">Follow Us</span>
                    <div className="flex gap-6 mt-1 justify-center md:justify-start">
                        <a href="#" className="footer-social text-3xl hover:scale-110 transition-transform"><i className="fa-brands fa-instagram"></i></a>
                        <a href="#" className="footer-social text-3xl hover:scale-110 transition-transform"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="footer-social text-3xl hover:scale-110 transition-transform"><i className="fa-brands fa-x-twitter"></i></a>
                    </div>
                </div>
            </div>

            <div className="footer-copy w-full max-w-7xl pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center text-sm opacity-50 tracking-wide gap-4">
                <span>&copy; {new Date().getFullYear()} VITA Lighting. All rights reserved.</span>
                <span>Designed for modern living.</span>
            </div>
        </footer>
    );
}

export default Footer;
