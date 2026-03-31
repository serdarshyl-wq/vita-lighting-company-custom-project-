import { useState, useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import '../css/Showcase.css';

const slides = [
    {
        image: '/products/ürün4-on.png',
        description: 'A sculptural helix lamp blending ambient warmth with modern design',
    },
    {
        image: '/products/ürün1-on.png',
        description: 'Minimalist curves casting soft light for serene living spaces',
    },
    {
        image: '/products/ürün2-on.png',
        description: 'Bold geometric form meets gentle illumination',
    },
];

function Showcase() {
    const [activeSlide, setActiveSlide] = useState(0);
    const productImgRef = useRef(null);
    const descRef = useRef(null);
    const isAnimating = useRef(false);

    const goToSlide = useCallback(
        (index) => {
            if (index === activeSlide || isAnimating.current) return;
            isAnimating.current = true;

            const tl = gsap.timeline({
                onComplete: () => {
                    isAnimating.current = false;
                },
            });

            tl.to(productImgRef.current, {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.in',
            });
            tl.to(
                descRef.current,
                {
                    opacity: 0,
                    duration: 0.2,
                    ease: 'power2.in',
                },
                '<'
            );

            tl.call(() => {
                setActiveSlide(index);
            });

            tl.to(productImgRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
            });
            tl.to(
                descRef.current,
                {
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                },
                '<'
            );
        },
        [activeSlide]
    );

    const handleNextSlide = useCallback(() => {
        const next = (activeSlide + 1) % slides.length;
        goToSlide(next);
    }, [activeSlide, goToSlide]);

    const sliderRef = useRef(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    gsap.to(slider, {
                        opacity: 1,
                        x: 0,
                        duration: 0.6,
                        ease: 'power3.out',
                    });
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(slider);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative w-full h-screen flex overflow-hidden">
            <div className="w-1/2 flex items-center justify-center">
                <img
                    ref={productImgRef}
                    src={slides[activeSlide].image}
                    alt="VITA Lamp"
                    className="showcase-product-img object-contain"
                />
            </div>

            <div
                className="w-1/2 flex flex-col justify-center items-start pl-16 cursor-pointer"
                onClick={handleNextSlide}
            >
                <div
                    className="showcase-slider flex flex-col gap-4"
                    ref={sliderRef}
                >
                    <div className="flex flex-col gap-3 mt-12">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                className={`showcase-line h-[3px] rounded-full transition-all duration-300 cursor-pointer ${i === activeSlide
                                        ? 'bg-white w-16'
                                        : 'bg-neutral-600 w-8'
                                    }`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToSlide(i);
                                }}
                            />
                        ))}
                    </div>

                    <p
                        className="text-neutral-400 text-sm max-w-xs leading-relaxed tracking-wide mt-4"
                        ref={descRef}
                    >
                        {slides[activeSlide].description}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Showcase;
