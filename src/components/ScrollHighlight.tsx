'use client';

import { useEffect } from 'react';

export default function ScrollHighlight() {
    useEffect(() => {
        const sections = document.querySelectorAll('.scroll-highlight-section[data-section="true"]');
        if (sections.length === 0) return;

        let rafId: number | null = null;

        const updateSections = () => {
            const viewportCenter = window.innerHeight / 2;
            let closestSection: Element | null = null;
            let closestDistance = Infinity;

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                const sectionCenter = rect.top + rect.height / 2;
                const distance = Math.abs(sectionCenter - viewportCenter);

                // Track closest section for the glow/border effect
                if (rect.bottom > 0 && rect.top < window.innerHeight) {
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestSection = section;
                    }
                }

                // Maintain full brightness throughout
                (section as HTMLElement).style.opacity = "1";
            });

            // Toggle the glow/border effect on the single closest section
            sections.forEach(s => {
                if (s === closestSection) {
                    s.classList.add('section-active');
                } else {
                    s.classList.remove('section-active');
                }
            });
        };

        const handleScroll = () => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updateSections);
        };

        // Initial update
        updateSections();

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId) cancelAnimationFrame(rafId);
            // Clean up inline styles
            sections.forEach(s => {
                (s as HTMLElement).style.opacity = '';
            });
        };
    }, []);

    return null;
}
