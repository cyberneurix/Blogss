'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ReadingIndicator() {
    const [progress, setProgress] = useState(0);
    const { scrollYProgress } = useScroll();
    
    // Smooth the progress value
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        return scrollYProgress.onChange(v => setProgress(Math.round(v * 100)));
    }, [scrollYProgress]);

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center gap-6">
            {/* Percentage Text */}
            <div className="text-purple-400 font-mono text-sm font-black rotate-90 mb-12 whitespace-nowrap tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                {progress}% INTEL READ
            </div>
            
            {/* Vertical Progress Bar Track */}
            <div className="w-[2px] h-64 bg-zinc-800/50 relative rounded-full overflow-hidden backdrop-blur-md border border-white/5">
                {/* Active Progress Fill */}
                <motion.div 
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-500 via-violet-500 to-cyan-500 origin-top shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                    style={{ scaleY }}
                />
            </div>

            {/* Bottom status indicator */}
            <div className={`w-3 h-3 rounded-full transition-all duration-500 ${progress > 98 ? 'bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] scale-125' : 'bg-zinc-800 border border-white/10'}`} />
        </div>
    );
}
