import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import Hero from './components/Hero';
import Products from './components/Products';
import Footer from './components/Footer';
import CustomAlert from './components/CustomAlert';
import AllCollection from './pages/AllCollection';
import ProductDetail from './pages/ProductDetail';
import Success from './pages/Success';
import Fail from './pages/Fail';

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  const navbarRef = useRef(null);
  const logoRef = useRef(null);
  const scrollbarThumbRef = useRef(null);
  const [introComplete, setIntroComplete] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);

  const lenisRef = useRef(null);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis();
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!introComplete) {
      if (lenisRef.current) lenisRef.current.stop();
      document.body.style.overflow = 'hidden';
      setShowScrollbar(false);
    } else {
      if (lenisRef.current) lenisRef.current.start();
      document.body.style.overflow = '';

      setTimeout(() => {
        setShowScrollbar(true);
      }, 500);
    }
  }, [introComplete]);

  useEffect(() => {
    if (!lenisRef.current) return;

    const updateScrollbar = (e) => {
      if (scrollbarThumbRef.current) {
        const viewH = window.innerHeight;
        const docH = document.documentElement.scrollHeight;
        const ratio = Math.min(1, viewH / docH);

        const tHeight = Math.max(40, viewH * ratio);
        scrollbarThumbRef.current.style.height = `${tHeight}px`;

        const maxTravel = viewH - tHeight;
        scrollbarThumbRef.current.style.transform = `translateY(${e.progress * maxTravel}px)`;
      }
    };

    lenisRef.current.on('scroll', updateScrollbar);

    const handleResize = () => {
      if (lenisRef.current) updateScrollbar({ progress: lenisRef.current.progress });
    };
    window.addEventListener('resize', handleResize);

    setTimeout(() => updateScrollbar({ progress: 0 }), 100);

    return () => {
      if (lenisRef.current) lenisRef.current.off('scroll', updateScrollbar);
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <>
      <Intro
        navbarRef={navbarRef}
        logoRef={logoRef}
        onComplete={() => setIntroComplete(true)}
      />
      <Navbar ref={navbarRef} />
      <Hero introComplete={introComplete} />
      <Products />
      <Footer />
      <Logo ref={logoRef} />
      <CustomAlert trigger={introComplete} />

      <div
        className={`fixed top-0 right-0 w-[6px] h-full z-9999 pointer-events-none mix-blend-difference transition-opacity duration-1000ms ease-out ${showScrollbar ? 'opacity-100' : 'opacity-0'}`}
        style={{ mixBlendMode: 'difference' }}
      >
        <div
          ref={scrollbarThumbRef}
          className="w-full bg-white rounded-full opacity-100 will-change-transform"
        />
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<AllCollection />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
