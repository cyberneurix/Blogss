'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { BookOpen } from 'lucide-react';

function Particle({ i, springX, springY }: { i: number, springX: any, springY: any }) {
    const x = useTransform(springX, [-0.5, 0.5], [Math.random() * 50 - 25, Math.random() * 50 - 25]);
    const y = useTransform(springY, [-0.5, 0.5], [Math.random() * 50 - 25, Math.random() * 50 - 25]);

    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                width: `${4 + Math.random() * 6}px`,
                height: `${4 + Math.random() * 6}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 2 === 0
                    ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.6), rgba(147, 51, 234, 0.3))'
                    : 'linear-gradient(135deg, rgba(34, 211, 238, 0.6), rgba(6, 182, 212, 0.3))',
                boxShadow: i % 2 === 0
                    ? '0 0 20px rgba(168, 85, 247, 0.4)'
                    : '0 0 20px rgba(34, 211, 238, 0.4)',
                x,
                y
            }}
            animate={{
                y: [0, -150 - Math.random() * 100, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0]
            }}
            transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4
            }}
        />
    );
}

export default function Hero() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    const spotlightBg = useTransform(
        [springX, springY],
        ([x, y]) => `radial-gradient(600px circle at ${50 + (x as number) * 100}% ${50 + (y as number) * 100}%, rgba(168, 85, 247, 0.15), transparent 80%)`
    );

    const tickerItems = [
        { topic: "Zero Trust Architecture", status: "SECURE" },
        { topic: "SOC Automation Level 4", status: "LIVE" },
        { topic: "Advanced Adversary Profiling", status: "INTEL" },
        { topic: "Compliance Auto-Mapping", status: "UPDATE" },
        { topic: "Supply Chain Integrity", status: "CRITICAL" },
        { topic: "Post-Quantum Cryptography", status: "NEW" },
        { topic: "Security Architecture v4.2", status: "ACTIVE" },
        { topic: "Cloud Native Defense Hub", status: "SECURE" },
        { topic: "Dark Web Leak Detection", status: "INTEL" },
        { topic: "GRC Framework Alignment", status: "UPDATE" },
        { topic: "SAST/DAST Pipeline", status: "ACTIVE" },
        { topic: "Identity-Centric Authentication", status: "SECURE" },
        { topic: "Threat Hunting with ML", status: "LIVE" },
        { topic: "Neural Signal Encryption", status: "CRITICAL" },
        { topic: "BCI Ethics & Policy", status: "NEW" },
        { topic: "AppSec Vulnerability Shield", status: "ACTIVE" }
    ];

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            // Normalize to -0.5 to 0.5
            mouseX.set((clientX / innerWidth) - 0.5);
            mouseY.set((clientY / innerHeight) - 0.5);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Transform mouse movement into parallax offsets
    const orb1X = useTransform(springX, [-0.5, 0.5], [-30, 30]);
    const orb1Y = useTransform(springY, [-0.5, 0.5], [-30, 30]);
    const orb2X = useTransform(springX, [-0.5, 0.5], [30, -30]);
    const orb2Y = useTransform(springY, [-0.5, 0.5], [30, -30]);

    return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-zinc-950">
            {/* Top Intelligence Ticker - Live Feed Style */}
            <div className="absolute top-20 left-0 right-0 h-10 bg-black/80 border-b border-zinc-800/50 flex items-center z-20">
                <div className="flex items-center px-4 border-r border-zinc-800 bg-zinc-900 h-full z-30">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse mr-2 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                    <span className="text-[10px] font-bold text-zinc-300 tracking-[0.2em] whitespace-nowrap">LIVE INTEL FEED</span>
                </div>
                <div className="flex-1 overflow-hidden relative container-for-ticker [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes ticker-scroll {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }
                        .ticker-inner {
                            display: flex;
                            width: max-content;
                            animation: ticker-scroll 40s linear infinite;
                        }
                        .ticker-inner:hover {
                            animation-play-state: paused;
                        }
                    `}} />
                    <div className="ticker-inner">
                        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
                            <span key={i} className="flex items-center text-[10px] uppercase tracking-[0.15em] text-zinc-500 mx-10">
                                <span className={`text-[8px] font-bold mr-2 px-1.5 py-0.5 rounded ${item.status === 'CRITICAL' ? 'text-red-400 bg-red-400/10' :
                                    item.status === 'SECURE' ? 'text-emerald-400 bg-emerald-400/10' :
                                        item.status === 'INTEL' ? 'text-purple-400 bg-purple-400/10' :
                                            'text-cyan-400 bg-cyan-400/10'
                                    }`}>
                                    {item.status}
                                </span>
                                <span className="text-zinc-400">{item.topic}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>


            {/* Mouse Spotlight Layer */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-10 opacity-40"
                style={{
                    background: spotlightBg
                }}
            />

            {/* Animated gradient background */}
            <div className="absolute inset-0 opacity-30">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-zinc-900 to-cyan-900/40"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </div>

            {/* Large Animated Grid Background */}
            <div className="absolute inset-0 opacity-20">
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(34, 211, 238, 0.15) 2px, transparent 2px),
                            linear-gradient(to bottom, rgba(168, 85, 247, 0.15) 2px, transparent 2px)
                        `,
                        backgroundSize: '80px 80px'
                    }}
                    animate={{
                        backgroundPosition: ['0px 0px', '80px 80px']
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            {/* Mouse Interactive Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <Particle key={i} i={i} springX={springX} springY={springY} />
                ))}
            </div>

            {/* Mouse Interactive Gradient Orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                style={{ x: orb1X, y: orb1Y }}
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
                style={{ x: orb2X, y: orb2Y }}
                animate={{
                    scale: [1.4, 1, 1.4],
                    opacity: [0.4, 0.2, 0.4]
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
            />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 max-w-6xl mx-auto px-4 text-center py-20"
            >
                {/* Research Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 mb-8"
                >
                    <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-400">RESEARCH & ANALYSIS HUB</span>
                </motion.div>

                {/* Main Title - Reduced Size */}
                <motion.h1
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight italic"
                >
                    <span className="text-white pr-4">
                        CyberNeurix Blogs
                    </span>
                </motion.h1>

                {/* Tagline - Restored Research Focus */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed"
                >
                    Advancing the standard for technical depth. Explore original research and
                    applied systems thinking at the collision point of <span className="text-purple-300 font-semibold italic">digital defense</span> and <span className="text-cyan-300 font-semibold italic">human cognition</span>.
                </motion.p>

                {/* Clickable Category Labels */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    <a
                        href="#blog-posts"
                        className="px-8 py-4 text-zinc-300 rounded-xl font-medium text-base min-w-[200px] text-center border border-purple-700/40 bg-purple-950/20 transition-all duration-300 hover:scale-105 hover:bg-purple-900/30 hover:border-purple-500 active:scale-95 shadow-xl shadow-purple-950/20"
                    >
                        Cybersecurity
                    </a>

                    {/* Scroll Indicator - Positioned between buttons */}
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2 pointer-events-none mx-4"
                    >
                        <div className="w-px h-10 bg-gradient-to-b from-purple-500/50 to-transparent" />
                        <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-zinc-600 whitespace-nowrap">SCROLL TO READ</span>
                    </motion.div>

                    <a
                        href="#blog-posts"
                        className="px-8 py-4 text-zinc-300 rounded-xl font-medium text-base min-w-[200px] text-center border border-cyan-700/40 bg-cyan-950/20 transition-all duration-300 hover:scale-105 hover:bg-cyan-900/30 hover:border-cyan-500 active:scale-95 shadow-xl shadow-cyan-950/20"
                    >
                        NeuroTechnology
                    </a>
                </motion.div>
            </motion.div>



            {/* Bottom gradient border */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/30 to-transparent" />
        </section>
    );
}
