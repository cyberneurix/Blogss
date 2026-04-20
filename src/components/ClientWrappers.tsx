'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

export function FadeInWrapper({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {children}
        </motion.div>
    );
}

export function ScrollTransformWrapper({ children, className }: { children: ReactNode, className?: string }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 1]);
    
    return (
        <motion.div ref={containerRef} style={{ opacity }} className={className}>
            {children}
        </motion.div>
    );
}

export function HoverCardWrapper({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <motion.div whileHover={{ y: -4 }} className={className}>
            {children}
        </motion.div>
    );
}
