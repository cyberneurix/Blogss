'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar, ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

interface BlogGridProps {
    posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const postsPerPage = 6;
    const totalPages = Math.ceil(posts.length / postsPerPage);
    const currentPosts = posts.slice(currentIndex * postsPerPage, (currentIndex + 1) * postsPerPage);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % totalPages);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (isAutoPlaying && totalPages > 1) {
            timerRef.current = setInterval(nextSlide, 8000); // Change slide every 8 seconds
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isAutoPlaying, currentIndex, totalPages]);

    const toggleAutoPlay = () => {
        setIsAutoPlaying(!isAutoPlaying);
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
        >
            {/* Carousel Controls - Top */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <motion.button
                            onClick={prevSlide}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-purple-900/30 hover:bg-purple-800/50 text-white rounded-lg transition-colors border border-purple-700/30"
                            aria-label="Previous posts"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            onClick={nextSlide}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-purple-900/30 hover:bg-purple-800/50 text-white rounded-lg transition-colors border border-purple-700/30"
                            aria-label="Next posts"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            onClick={toggleAutoPlay}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-purple-900/30 hover:bg-purple-800/50 text-white rounded-lg transition-colors border border-purple-700/30"
                            aria-label={isAutoPlaying ? "Pause auto-scroll" : "Play auto-scroll"}
                        >
                            {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </motion.button>
                    </div>

                    {/* Page Indicators */}
                    <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <motion.button
                                key={idx}
                                onClick={() => goToSlide(idx)}
                                whileHover={{ scale: 1.2 }}
                                className={`h-2 rounded-full transition-all ${idx === currentIndex
                                    ? 'w-8 bg-purple-500'
                                    : 'w-2 bg-zinc-600 hover:bg-zinc-500'
                                    }`}
                                aria-label={`Go to page ${idx + 1}`}
                            />
                        ))}
                    </div>

                    <div className="text-sm text-zinc-400">
                        Page {currentIndex + 1} of {totalPages} • {posts.length} posts total
                    </div>
                </div>
            )}

            {/* Blog Posts Grid with Animation */}
            <div
                className="relative overflow-hidden min-h-[600px]"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onFocus={() => setIsAutoPlaying(false)}
                onTouchStart={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
            >
                {posts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 text-center space-y-4 relative z-10">
                        <div className="text-zinc-500 text-xl font-mono">NO_DATA_STREAM_FOUND</div>
                        <p className="text-zinc-600 max-w-md">The intelligence repository at <code className="text-purple-400">content/posts</code> appears to be empty or inaccessible.</p>
                    </div>
                )}
                {/* Animated Background */}
                <div className="absolute inset-0 -z-10">
                    {/* Gradient Orbs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float-slow"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-float-delayed"></div>
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl animate-float-slower"></div>

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px] animate-grid-flow"></div>

                    {/* Radial Gradient Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]"></div>
                </div>

                <AnimatePresence custom={direction} mode="wait">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {currentPosts.map((post, index) => (
                            <motion.article
                                key={post.slug}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="blog-card group"
                            >
                                <Link href={`/blog/${post.slug}`}>
                                    <div className="h-full bg-black border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all group relative min-h-[420px] flex flex-col shadow-2xl">
                                        {/* Image Section - Top */}
                                        <div className="relative h-56 w-full overflow-hidden">
                                            {post.image ? (
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    fill
                                                    priority={index < 2}
                                                    className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 blur-[0.5px] group-hover:blur-0"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gradient-to-br from-purple-900/40 to-blue-900/40" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                        </div>

                                        {/* Content Area - Bottom Body */}
                                        <div className="p-8 bg-black flex-1 flex flex-col justify-center border-t border-zinc-900/50">
                                            {/* Primary Title */}
                                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2 leading-tight drop-shadow-sm">
                                                {post.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-purple-500 font-bold text-xs uppercase tracking-widest mt-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                Read Article <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
