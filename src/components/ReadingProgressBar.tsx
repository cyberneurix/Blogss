'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 w-full z-[9999] pointer-events-none"
            aria-hidden="true"
        >
            <div className="h-[3px] w-full bg-transparent">
                <div
                    className="h-full bg-gradient-to-r from-purple-600 via-violet-500 to-cyan-400 transition-none"
                    style={{
                        width: `${progress}%`,
                        boxShadow: progress > 0 ? '0 0 8px rgba(168,85,247,0.7), 0 0 20px rgba(168,85,247,0.3)' : 'none',
                    }}
                />
            </div>
        </div>
    );
}
