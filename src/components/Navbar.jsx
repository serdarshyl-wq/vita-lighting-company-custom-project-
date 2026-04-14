import { useState, useEffect, forwardRef } from 'react';
import '../css/Navbar.css';

const Navbar = forwardRef(function Navbar(props, ref) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Menü açıldığında scroll'u kitle
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    return (
        <>
            <nav
                className="navbar fixed top-4 left-0 w-full h-[80px] flex items-center justify-between px-8 z-100 mix-blend-difference mix-blend-mode"
                style={{ mixBlendMode: 'difference' }}
                ref={ref}
            >
                <button
                    className={`hamburger-btn flex flex-col items-end justify-center h-12 w-16 cursor-pointer p-2 relative ${isMenuOpen ? 'is-open' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className={`hamburger-bar-top absolute right-2 h-[4px] bg-white rounded-sm transition-all duration-300 ${isMenuOpen ? 'w-10 top-1/2 -translate-y-1/2 rotate-45' : 'w-10 top-[18px]'}`} />
                    <span className={`hamburger-bar-bottom absolute right-2 h-[4px] bg-white rounded-sm transition-all duration-300 ${isMenuOpen ? 'w-10 top-1/2 -translate-y-1/2 -rotate-45' : 'w-14 bottom-[18px]'}`} />
                </button>
                <div />
                <button className="buy-now-btn group flex items-center gap-3 bg-white rounded-full pl-6 pr-1.5 py-1.5 cursor-pointer">
                    <span className="text-black text-sm font-medium tracking-wide">
                        Buy Now
                    </span>
                    <span className="buy-icon-wrap flex items-center justify-center w-10 h-10 bg-black rounded-full text-white">
                        <i className="fa-solid fa-arrow-right text-sm -rotate-45 transition-transform duration-300 group-hover:rotate-0 group-hover:translate-x-0.5" />
                    </span>
                </button>
            </nav>

            <div
                className={`fixed inset-0 bg-white z-90 flex flex-col pt-[20vh] items-center px-8 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
            >
                <div className="navbar-links-grid w-full max-w-7xl grid grid-cols-3 gap-x-4 gap-y-10 md:gap-y-16 text-black sm:text-5xl lg:text-6xl font-semibold tracking-tighter z-10 relative">
                    {['About', 'Inspire', 'Collection', 'Best Sellers', 'Extras', 'Services'].map((item) => (
                        <div key={item} className="w-full flex justify-center items-center">
                            {item === 'Collection' ? (
                                <a
                                    href="/collection"
                                    onClick={(e) => { e.preventDefault(); window.open('/collection', '_blank'); setIsMenuOpen(false); }}
                                    className="navbar-link inline-block group relative leading-tight pb-2"
                                >
                                    {item}
                                    <span className="absolute left-0 bottom-0 w-full h-[3px] md:h-[6px] bg-black origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
                                </a>
                            ) : (
                                <a href="#" className="navbar-link inline-block group relative leading-tight pb-2">
                                    {item}
                                    <span className="absolute left-0 bottom-0 w-full h-[3px] md:h-[6px] bg-black origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100" />
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                <div className="w-full flex justify-center absolute bottom-12 md:bottom-20 left-0 pointer-events-none px-4">
                    <span className="navbar-bg-text text-black opacity-50 select-none text-center uppercase tracking-widest font-medium">
                        designed for modern living
                    </span>
                </div>
            </div>
        </>
    );
});

export default Navbar;
