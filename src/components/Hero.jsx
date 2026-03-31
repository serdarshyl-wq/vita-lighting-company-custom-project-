import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../css/Hero.css';

gsap.registerPlugin(ScrollTrigger);

const slides = [
    {
        image: '/products/ürün4-on.png',
        title: 'Helix',
        description: 'A sculptural helix lamp blending ambient warmth with modern design',
    },
    {
        image: '/products/ürün1-on.png',
        title: 'Arc',
        description: 'Minimalist curves casting soft light for serene living spaces',
    },
    {
        image: '/products/ürün2-on.png',
        title: 'Forma',
        description: 'Bold geometric form meets gentle illumination',
    },
];

function Hero({ introComplete }) {
    const sectionRef = useRef(null);
    const productRef = useRef(null);
    const productImgRef = useRef(null);
    const taglineRef = useRef(null);
    const heroLogoRef = useRef(null);
    const sliderRef = useRef(null);
    const isAnimating = useRef(false);
    const [activeSlide, setActiveSlide] = useState(0);
    const activeSlideRef = useRef(0);
    const scrollProgressRef = useRef(0);

    useEffect(() => {
        if (!introComplete) return;

        const tl = gsap.timeline();

        tl.to(productRef.current, {
            y: 0,
            duration: 1,
            ease: 'power3.out',
        });

        tl.to(
            heroLogoRef.current,
            {
                y: 0,
                duration: 1,
                ease: 'power3.out',
            },
            '<'
        );

        tl.to(
            taglineRef.current,
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
            },
            '<0.3'
        );

        return () => {
            tl.kill();
        };
    }, [introComplete]);

    useEffect(() => {
        if (!introComplete) return;

        let scrollTl;
        const timer = setTimeout(() => {
            scrollTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=120%',
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        scrollProgressRef.current = self.progress;
                    },
                },
            });

            scrollTl.fromTo(
                taglineRef.current,
                { opacity: 1, y: 0 },
                {
                    opacity: 0,
                    y: 30,
                    duration: 0.3,
                    ease: 'none',
                }
            );

            scrollTl.fromTo(
                productRef.current,
                { x: '0vw' },
                {
                    x: '-25vw',
                    duration: 0.7,
                    ease: 'none',
                },
                '<'
            );

            scrollTl.fromTo(
                sliderRef.current,
                { opacity: 0, x: 40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: 'none',
                },
                '<0.2'
            );

            scrollTl.to({}, { duration: 0.5 });

            ScrollTrigger.refresh();
        }, 200);

        return () => {
            clearTimeout(timer);
            if (scrollTl) {
                scrollTl.scrollTrigger?.kill();
                scrollTl.kill();
            }
        };
    }, [introComplete]);

    const goToSlide = useCallback((index) => {
        if (index === activeSlideRef.current || isAnimating.current) return;
        if (scrollProgressRef.current < 0.58) return;
        isAnimating.current = true;

        const img = productImgRef.current;

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating.current = false;
            },
        });

        tl.to(img, {
            x: '-120%',
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
        });

        tl.call(() => {
            img.src = slides[index].image;
            activeSlideRef.current = index;
            setActiveSlide(index);
            productRef.current.style.zIndex = index === 2 ? '5' : '20';
            gsap.set(img, { x: '80%', opacity: 0 });
        });

        tl.to(img, {
            x: '0%',
            opacity: 1,
            duration: 0.4,
            ease: 'power3.out',
        });
    }, []);

    const handleNextSlide = useCallback(() => {
        const next = (activeSlideRef.current + 1) % slides.length;
        goToSlide(next);
    }, [goToSlide]);

    return (
        <section
            className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
            ref={sectionRef}
        >
            <div
                className="hero-logo absolute top-24 left-0 w-full flex justify-center z-10 pointer-events-none"
                ref={heroLogoRef}
            >
                <span className="hero-logo-text text-white leading-none tracking-[0.15em] select-none opacity-20">
                    VITA
                </span>
            </div>

            <div className="hero-product z-20 relative" ref={productRef}>
                <img
                    ref={productImgRef}
                    src={slides[0].image}
                    alt="VITA Lamp"
                    className="hero-product-img object-contain"
                />
            </div>

            <div
                className="hero-tagline absolute left-32 bottom-32 max-w-md text-white text-2xl leading-relaxed tracking-wide z-30"
                ref={taglineRef}
            >
                A modern lighting experience
                inspired by nature and designed for everyday living
            </div>

            <div
                className="hero-slider absolute right-0 top-[calc(60%)] -translate-y-1/2 w-[60%] flex flex-col justify-center items-start pl-0 z-40"
                ref={sliderRef}
                onClick={handleNextSlide}
            >
                <div className="flex gap-3 cursor-pointer mb-8">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`h-[3px] rounded-full transition-all duration-300 cursor-pointer ${i === activeSlide
                                ? 'bg-white w-14'
                                : 'bg-neutral-600 w-7'
                                }`}
                            onClick={(e) => {
                                e.stopPropagation();
                                goToSlide(i);
                            }}
                        />
                    ))}
                </div>

                <h3 className="text-white text-4xl font-medium tracking-wide mb-4">
                    {slides[activeSlide].title}
                </h3>
                <p className="text-neutral-400 text-xl max-w-md leading-relaxed tracking-wide">
                    {slides[activeSlide].description}
                </p>
            </div>
        </section>
    );
}

export default Hero;
