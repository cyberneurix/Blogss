'use client';

import { motion } from 'framer-motion';

export default function QuoteSection() {
    return (
        <section className="relative py-20 bg-zinc-950 overflow-hidden">
            {/* Green Aurora Effect - Multiple Layers */}
            <div className="absolute inset-0 opacity-30">
                {/* Aurora Wave 1 */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 30%, rgba(16, 185, 129, 0.4) 0%, rgba(5, 150, 105, 0.2) 30%, transparent 60%)',
                    }}
                    animate={{
                        x: ['-20%', '20%', '-20%'],
                        y: ['-10%', '10%', '-10%'],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Aurora Wave 2 */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at 30% 50%, rgba(52, 211, 153, 0.3) 0%, rgba(16, 185, 129, 0.15) 35%, transparent 55%)',
                    }}
                    animate={{
                        x: ['20%', '-20%', '20%'],
                        y: ['10%', '-10%', '10%'],
                        scale: [1.1, 1, 1.1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />

                {/* Aurora Wave 3 */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at 70% 60%, rgba(6, 95, 70, 0.35) 0%, rgba(4, 120, 87, 0.18) 40%, transparent 65%)',
                    }}
                    animate={{
                        x: ['-15%', '15%', '-15%'],
                        y: ['15%', '-15%', '15%'],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />

                {/* Flowing Aurora Streaks */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, transparent 0%, rgba(16, 185, 129, 0.15) 30%, rgba(52, 211, 153, 0.2) 50%, rgba(16, 185, 129, 0.15) 70%, transparent 100%)',
                    }}
                    animate={{
                        rotate: [0, 360],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            {/* Animated shimmer particles */}
            <div className="absolute inset-0 opacity-20">
                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(52, 211, 153, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)
            `
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Floating Particles - Green tinted */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            boxShadow: '0 0 10px rgba(52, 211, 153, 0.6)'
                        }}
                        animate={{
                            y: [0, -60, 0],
                            opacity: [0, 0.7, 0],
                        }}
                        transition={{
                            duration: 8 + i,
                            repeat: Infinity,
                            delay: i * 0.7
                        }}
                    />
                ))}
            </div>

            <div className="max-w-5xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center"
                >
                    {/* Decorative Line */}
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                        className="h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent mb-12 mx-auto max-w-md"
                    />

                    {/* Quote Icon */}
                    <motion.div
                        initial={{ scale: 1, rotate: 0 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="mb-8"
                    >
                        <svg className="w-16 h-16 mx-auto text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                        </svg>
                    </motion.div>

                    {/* Main Quote */}
                    <motion.blockquote
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight"
                    >
                        <span className="bg-gradient-to-r from-slate-200 via-cyan-200 to-slate-200 bg-clip-text text-transparent">
                            &quot;Security Systems, Cognitive Frontiers.
                            <br />
                            One Intelligence Framework - CNIS&quot;
                        </span>
                    </motion.blockquote>

                    {/* Attribution */}
                    <motion.p
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="text-xl text-zinc-500 font-medium"
                    >
                        — CyberNeurix
                    </motion.p>

                    {/* Decorative Line */}
                    <motion.div
                        initial={{ width: "100%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.2, delay: 1.2 }}
                        className="h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent mt-12 mx-auto max-w-md"
                    />
                </motion.div>
            </div>
        </section>
    );
}
