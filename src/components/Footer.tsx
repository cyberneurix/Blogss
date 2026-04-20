'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Footer() {
    const waveContainerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
        const container = waveContainerRef.current;
        if (!container) return;

        // Clear existing content if any (though React should handle this, direct DOM manipulation needs care)
        // In this case, we'll create the structure via React if possible, or ref.
        // Let's us a ref for the inner div to append children, or just render them with React.
        // Rendering with React is cleaner.
    }, []);

    // We can render the wave segments with React and animate them with a ref to their elements.
    // Or we can stick to the imperative approach used in the HTML since it's manipulating styles directly in a loop.
    // React state updates for 60fps animation is not ideal. Direct DOM manipulation is better for this specific animation.

    useEffect(() => {
        const waveDiv = waveContainerRef.current;
        if (!waveDiv) return;

        // Clean up previous segments
        waveDiv.innerHTML = '';

        const barCount = 23;
        const waveRefs: HTMLDivElement[] = [];

        for (let i = 0; i < barCount; i++) {
            const segment = document.createElement('div');
            segment.className = 'wave-segment';
            segment.style.height = `${i + 1}px`;
            segment.style.backgroundColor = 'rgb(255, 255, 255)';
            segment.style.marginTop = '-2px';
            waveDiv.appendChild(segment);
            waveRefs.push(segment);
        }

        let t = 0;
        let isVisible = false;

        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            isVisible = entry.isIntersecting;

            if (isVisible) {
                // Start animation if visible
                if (!animationRef.current) {
                    animateWave();
                }
            } else {
                // Stop/pause if not visible
                if (animationRef.current) {
                    cancelAnimationFrame(animationRef.current);
                    animationRef.current = null;
                }
            }
        }, { threshold: 0.01 });

        const footer = document.getElementById('footer');
        if (footer) {
            observer.observe(footer);
        }

        const animateWave = () => {
            let offset = 0;

            waveRefs.forEach((element, index) => {
                if (element) {
                    offset += Math.max(0, 20 * Math.sin((t + index) * 0.3));
                    element.style.transform = `translateY(${index + offset}px)`;
                }
            });

            t += 0.2;

            if (isVisible) {
                animationRef.current = requestAnimationFrame(animateWave);
            } else {
                animationRef.current = null;
            }
        };

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            if (footer) {
                observer.unobserve(footer);
            }
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer id="footer" className="bg-black text-white relative z-20 flex flex-col w-full h-full justify-between lg:h-[26vh] select-none">
            <div className="container mx-auto flex flex-col md:flex-row justify-between w-full gap-8 pt-8 px-6">
                {/* Foundation Section */}
                <div className="space-y-6 flex-1">
                    <h4 className="text-fuchsia-500 font-black tracking-widest uppercase italic text-[10px] mb-4">Foundation</h4>
                    <ul className="grid grid-cols-2 gap-y-3 gap-x-8">
                        <li><a href={process.env.NEXT_PUBLIC_LEGAL_URL || "https://cyberneurix.com"} className="text-base text-zinc-400 hover:text-white transition-colors">Home</a></li>
                        <li><a href="https://blogs.cyberneurix.com" className="text-base text-zinc-400 hover:text-white transition-colors">Blogs</a></li>
                        <li><a href="https://pulse.cyberneurix.com" className="text-base text-zinc-400 hover:text-white transition-colors">Pulse</a></li>
                        <li><a href={(process.env.NEXT_PUBLIC_LEGAL_URL || "https://cyberneurix.com") + "/terms-of-use.html"} className="text-base text-zinc-400 hover:text-white transition-colors">Terms of Use</a></li>
                        <li><a href={(process.env.NEXT_PUBLIC_LEGAL_URL || "https://cyberneurix.com") + "/privacy-policy.html"} className="text-base text-zinc-400 hover:text-white transition-colors">Privacy Policy</a></li>
                    </ul>
                    <p className="text-sm mt-8 flex items-center gap-x-2 text-zinc-500 italic">
                        <svg className="size-4 text-fuchsia-600" viewBox="0 0 80 80">
                            <path fillRule="evenodd" clip-rule="evenodd" fill="currentColor"
                                d="M67.4307 11.5693C52.005 -3.85643 26.995 -3.85643 11.5693 11.5693C-3.85643 26.995 -3.85643 52.005 11.5693 67.4307C26.995 82.8564 52.005 82.8564 67.4307 67.4307C82.8564 52.005 82.8564 26.995 67.4307 11.5693ZM17.9332 17.9332C29.8442 6.02225 49.1558 6.02225 61.0668 17.9332C72.9777 29.8442 72.9777 49.1558 61.0668 61.0668C59.7316 62.4019 58.3035 63.5874 56.8032 64.6232L56.8241 64.6023C46.8657 54.6439 46.8657 38.4982 56.8241 28.5398L58.2383 27.1256L51.8744 20.7617L50.4602 22.1759C40.5018 32.1343 24.3561 32.1343 14.3977 22.1759L14.3768 22.1968C15.4126 20.6965 16.5981 19.2684 17.9332 17.9332ZM34.0282 38.6078C25.6372 38.9948 17.1318 36.3344 10.3131 30.6265C7.56889 39.6809 9.12599 49.76 14.9844 57.6517L34.0282 38.6078ZM21.3483 64.0156C29.24 69.874 39.3191 71.4311 48.3735 68.6869C42.6656 61.8682 40.0052 53.3628 40.3922 44.9718L21.3483 64.0156Z">
                            </path>
                        </svg>
                        CyberNeurix 2026. All Rights Reserved
                    </p>
                </div>
                
                {/* Cybersecurity Section */}
                <div className="space-y-6 flex-1">
                    <h4 className="text-fuchsia-500 font-black tracking-widest uppercase italic text-[10px] mb-4">Cybersecurity</h4>
                    <ul className="space-y-3">
                        <li><a href={process.env.NEXT_PUBLIC_CYBERSECURITY_URL || "https://cybersecurity.cyberneurix.com"} className="text-base text-zinc-400 hover:text-white transition-colors">Intelligence Hub</a></li>
                        <li><a href={(process.env.NEXT_PUBLIC_CYBERSECURITY_URL || "https://cybersecurity.cyberneurix.com") + "/cnis"} className="text-base text-zinc-400 hover:text-white transition-colors">CNIS Explorer</a></li>
                        <li><a href={(process.env.NEXT_PUBLIC_CYBERSECURITY_URL || "https://cybersecurity.cyberneurix.com") + "/knowledge-base"} className="text-base text-zinc-400 hover:text-white transition-colors">Knowledge Base</a></li>
                        <li><a href={(process.env.NEXT_PUBLIC_CYBERSECURITY_URL || "https://cybersecurity.cyberneurix.com") + "/news-and-threat-reports"} className="text-base text-zinc-400 hover:text-white transition-colors">News & Threat Reports</a></li>
                    </ul>
                </div>

                {/* NeuroTechnology Section */}
                <div className="space-y-6 flex-1 text-right">
                    <h4 className="text-fuchsia-500 font-black tracking-widest uppercase italic text-[10px] mb-4">NeuroTechnology</h4>
                    <ul className="space-y-3">
                        <li><a href={process.env.NEXT_PUBLIC_NEURO_URL || "https://neurotechnology.cyberneurix.com"} className="text-base text-zinc-400 hover:text-white transition-colors">Neuro Hub</a></li>
                        <li><a href={(process.env.NEXT_PUBLIC_NEURO_URL || "https://neurotechnology.cyberneurix.com") + "/research-and-breakthroughs"} className="text-base text-zinc-400 hover:text-white transition-colors">Research & Breakthroughs</a></li>
                        <li><a href={(process.env.NEXT_PUBLIC_NEURO_URL || "https://neurotechnology.cyberneurix.com") + "/bcis"} className="text-base text-zinc-400 hover:text-white transition-colors">Brain-Computer Interfaces</a></li>
                        <li><a href={(process.env.NEXT_PUBLIC_NEURO_URL || "https://neurotechnology.cyberneurix.com") + "/neural-frontier"} className="text-base text-zinc-400 hover:text-white transition-colors">Neural Frontier</a></li>
                    </ul>
                    <div className="pt-8">
                        <button 
                            className="text-sm font-black uppercase italic tracking-widest text-fuchsia-500 hover:text-white transition-colors inline-flex items-center gap-2"
                            onClick={scrollToTop}
                        >
                            Back to top <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15"></polyline></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div
                id="waveContainer"
                aria-hidden="true"
                style={{ overflow: 'hidden', height: '200px' }}
                className="mt-4"
            >
                <div ref={waveContainerRef} style={{ marginTop: 0 }}>
                    {/* Wave segments will be inserted here by JS */}
                </div>
            </div>
        </footer>
    );
}
