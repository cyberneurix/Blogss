'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Introduction() {
    return (
        <section className="relative py-20 bg-zinc-900 overflow-hidden">
            {/* Animated Background Layer */}
            <div className="absolute inset-0 opacity-20">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-zinc-900 to-cyan-900/30"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </div>

            {/* Animated Grid */}
            <div className="absolute inset-0 opacity-10">
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(148, 163, 184, 0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(148, 163, 184, 0.15) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                    animate={{
                        backgroundPosition: ['0px 0px', '60px 60px']
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: `${3 + Math.random() * 5}px`,
                            height: `${3 + Math.random() * 5}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            background: i % 3 === 0
                                ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.5), rgba(147, 51, 234, 0.2))'
                                : i % 3 === 1
                                    ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.5), rgba(6, 182, 212, 0.2))'
                                    : 'linear-gradient(135deg, rgba(148, 163, 184, 0.5), rgba(100, 116, 139, 0.2))',
                            boxShadow: '0 0 15px rgba (148, 163, 184, 0.3)'
                        }}
                        animate={{
                            y: [0, -120 - Math.random() * 80, 0],
                            x: [0, Math.random() * 80 - 40, 0],
                            opacity: [0, 0.6, 0],
                            scale: [0, 1.3, 0]
                        }}
                        transition={{
                            duration: 7 + Math.random() * 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5
                        }}
                    />
                ))}
            </div>

            {/* Gradient Orbs */}
            <motion.div
                className="absolute top-1/3 left-1/5 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.15, 0.3, 0.15],
                    x: [0, 40, 0],
                    y: [0, -20, 0]
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl"
                animate={{
                    scale: [1.3, 1, 1.3],
                    opacity: [0.3, 0.15, 0.3],
                    x: [0, -40, 0],
                    y: [0, 20, 0]
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                }}
            />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                {/* Main Introduction - Centered */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-24 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-slate-300 via-cyan-200 to-slate-300 bg-clip-text text-transparent">
                        Engineering Depth Across Two Complex Frontiers
                    </h2>
                    <p className="text-xl text-zinc-400 leading-relaxed max-w-4xl mx-auto">
                        CyberNeurix explores cybersecurity and neurotechnology as interconnected systems — disciplines
                        defined by complexity, scale, and structural interdependence. Each article is built on research,
                        operational insight, and architectural reasoning, moving beyond surface commentary into applied
                        systems thinking.
                    </p>
                </motion.div>
            </div>

            {/* Cybersecurity Section - Edge-to-Edge Full Width */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative min-h-[700px] md:min-h-[600px] overflow-hidden group mb-0 flex items-center justify-center text-center p-8 md:p-20 border-y border-purple-500/20"
            >
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/cyber-animation.png"
                        alt="Cybersecurity"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Dark Overlay with Blur */}
                    <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950" />

                    {/* Animated LED/Laser traveling lights - Full Width */}
                    <div className="absolute inset-0 pointer-events-none opacity-40">
                        <motion.div
                            className="absolute h-px w-full bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                            animate={{ y: ['20%', '80%'], opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
                            animate={{ x: ['10%', '90%'], opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
                        />
                    </div>
                </div>

                {/* Centered Content - Constrained for readability */}
                <div className="relative z-10 max-w-5xl px-4">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold mb-10 text-white drop-shadow-[0_0_30px_rgba(192,132,252,0.4)] tracking-tight"
                    >
                        Cybersecurity Analysis
                    </motion.h3>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <p className="text-xl md:text-3xl text-zinc-100 font-light leading-relaxed mb-10">
                            Cybersecurity is no longer a perimeter problem — it is a systems architecture challenge.
                            We examine detection engineering, telemetry pipelines, SOC optimization, governance frameworks,
                            adversarial modeling, and operational resilience across enterprise environments.
                        </p>
                        <div className="h-px w-40 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mx-auto mb-10" />
                        <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed mb-12 max-w-3xl mx-auto italic">
                            Our methodology moves beyond traditional defense, focusing on the structural integrity of the digital ecosystem. We prioritize high-fidelity intelligence and automated responses to match the speed of modern adversaries.
                        </p>
                        <a
                            href="#blog-posts"
                            className="inline-flex items-center gap-4 px-12 py-5 bg-purple-600 hover:bg-purple-500 text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(147,51,234,0.5)] group"
                        >
                            Explore Cybersecurity
                            <svg className="w-6 h-6 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </motion.div>

            {/* NeuroTechnology Section - Edge-to-Edge Full Width */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative min-h-[700px] md:min-h-[600px] overflow-hidden group flex items-center justify-center text-center p-8 md:p-20 border-b border-cyan-500/20"
            >
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/neuro-animation.png"
                        alt="NeuroTechnology"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Dark Overlay with Blur */}
                    <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950" />

                    {/* Glowing neural network effects - Full Width */}
                    <div className="absolute inset-0 pointer-events-none opacity-50">
                        <motion.div
                            className="absolute inset-0"
                            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.4) 0%, transparent 70%)' }}
                            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </div>

                {/* Centered Content - Constrained for readability */}
                <div className="relative z-10 max-w-5xl px-4">
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold mb-10 text-white drop-shadow-[0_0_30px_rgba(34,211,238,0.4)] tracking-tight"
                    >
                        NeuroTechnology Research
                    </motion.h3>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <p className="text-xl md:text-3xl text-zinc-100 font-light leading-relaxed mb-10">
                            Neurotechnology is redefining the interface between biological cognition and computational systems.
                            We analyze brain–computer interfaces, neural data architectures, cognitive augmentation, AI convergence,
                            and the structural implications of neural computing.
                        </p>
                        <div className="h-px w-40 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mx-auto mb-10" />
                        <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed mb-12 max-w-3xl mx-auto italic">
                            We bridge the gap between neurobiology and machine intelligence, exploring the ethical and technical boundaries of human-AI integration. Our research provides a blueprint for the future of synthetic cognition and neural interface design.
                        </p>
                        <a
                            href="#blog-posts"
                            className="inline-flex items-center gap-4 px-12 py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(8,145,178,0.5)] group"
                        >
                            Explore NeuroTechnology
                            <svg className="w-6 h-6 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
