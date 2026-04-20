'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import BlogGrid from '@/components/BlogGrid';
import SearchBar from '@/components/SearchBar';
import Introduction from '@/components/Introduction';
import QuoteSection from '@/components/QuoteSection';
import type { BlogPost } from '@/lib/blog';

export default function BlogClient({ allPosts }: { allPosts: BlogPost[] }) {
    const [searchQuery, setSearchQuery] = useState('');

    const posts = allPosts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-zinc-950 scroll-smooth">
            <Hero />
            <Introduction />
            <QuoteSection />

            {/* Search and Blog Grid Section with Dark Trippy Background */}
            <section id="blog-posts" className="py-16 bg-black relative overflow-hidden scroll-mt-20">
                {/* Dark Trippy Animated Background Layer */}
                <div className="absolute inset-0 -z-0">
                    {/* Deep Purple/Black Gradient Orbs - Dramatic Float & Pulse */}
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-950/40 rounded-full blur-[100px] animate-float-slow"></div>
                    <div className="absolute bottom-1/3 right-1/3 w-[550px] h-[550px] bg-violet-950/35 rounded-full blur-[120px] animate-float-delayed"></div>
                    <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-indigo-950/30 rounded-full blur-[100px] animate-float-slower"></div>

                    {/* Pulsing overlapping orbs for depth and movement */}
                    <div className="absolute top-3/4 left-1/3 w-[400px] h-[400px] bg-purple-900/25 rounded-full blur-[80px] animate-pulse-slow"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-fuchsia-950/30 rounded-full blur-[90px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>

                    {/* Additional moving orbs for more life */}
                    <div className="absolute top-1/3 right-1/2 w-[350px] h-[350px] bg-violet-900/20 rounded-full blur-[70px] animate-float-delayed" style={{ animationDelay: '3s' }}></div>

                    {/* Animated Grid Pattern - Flowing */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(139,92,246,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(139,92,246,0.04)_1px,transparent_1px)] bg-[size:100px_100px] animate-grid-flow opacity-40"></div>

                    {/* Dark Vignette Overlay for Mystery */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.8)_100%)]"></div>

                    {/* Noise texture overlay for trippy feel */}
                    <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="mb-12">
                        <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />
                    </div>
                    <BlogGrid posts={posts} />
                </div>
            </section>
        </div>
    );
}
