# VITA - Premium Lighting Showcase

VITA is a highly interactive, modern web application designed to showcase premium, sculptural lighting products. Built with a focus on immersive user experience (UX), it features fluid scroll animations, dynamic theme transitions, and a meticulously crafted, fully responsive layout.

## ✨ Key Features

- **Immersive Scroll Animations:** Powered by GSAP and ScrollTrigger, the site offers cinematic, scroll-driven storytelling through the `Hero` and `Showcase` sections.
- **Smooth Scrolling Engine:** Integrates `Lenis` for a frictionless, premium scrolling experience across all devices, complete with a custom scrollbar tracker.
- **Sleek Mobile Responsive UI:** A carefully engineered clamp-based CSS architecture ensures typography and layouts (like the expanding hamburger menu and 3-column footer) scale elegantly on any screen.
- **Advanced Theme Toggling:** A synchronized dark/light mode "wipe" effect that smoothly transitions the entire interface.
- **Custom UI Components:** Drops native alerts for custom-designed glassmorphism toast notifications (`CustomAlert`) to capture and restrict placeholder actions cleanly.
- **Production Secured:** Asset and application logic are heavily minified and obfuscated (via `javascript-obfuscator` & `terser`) to prevent trivial code inspection upon deployment, while control flow paths are kept optimal.

## 🛠️ Core Stack & Technologies

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS (augmented with custom Vanilla CSS + `clamp()` variables for precision responsive control)
- **Animation:** GSAP (GreenSock) + ScrollTrigger
- **Scroll Hijacking:** Lenis
- **Build & Obfuscation:** `vite-plugin-javascript-obfuscator` + Terser

## 🎨 Design Philosophy
Every visual element in VITA—from the exact optical centering of the mobile logo to the Base64-locked build distribution—was programmed for a flawless "Premium Brand" delivery. The application heavily leverages CSS `clamp()`, `vw/vh` scaling, and nested React layouts so that nothing breaks, regardless of screen constraints.
