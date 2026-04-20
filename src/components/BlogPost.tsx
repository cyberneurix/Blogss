import { Calendar, Clock, User, Tag, ArrowLeft, ArrowRight, Lightbulb, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import type { BlogPost as BlogPostType } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ScrollHighlight from './ScrollHighlight';
import ReadingIndicator from './ReadingIndicator';
import { FadeInWrapper, ScrollTransformWrapper, HoverCardWrapper } from './ClientWrappers';

interface BlogPostProps {
    post: BlogPostType;
    relatedPosts: BlogPostType[];
}

export default function BlogPost({ post, relatedPosts }: BlogPostProps) {
    return (
        <div className="relative bg-zinc-950 overflow-hidden">
            <ReadingIndicator />
            {/* Matrix Background */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/matrix-bg.png"
                    alt=""
                    fill
                    className="object-cover opacity-20"
                    style={{ transform: 'rotate(180deg)' }}
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-zinc-950/80" />
            </div>

            {/* Back Button */}
            <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8 relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-purple-400 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back to All Posts</span>
                </Link>
            </div>

            {/* Article Header */}
            <article className="max-w-6xl mx-auto px-6 md:px-12 pb-20 relative z-10">
                <FadeInWrapper>
                    {/* Premium Splendid Hero Card */}
                    <div className="relative mb-16 rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-white/10 group">
                        <div className="absolute inset-0 z-10 bg-gradient-to-br from-purple-950/90 via-zinc-950/60 to-black/90" />
                        
                        <div className="relative z-20 p-8 md:p-16 flex flex-col justify-between min-h-[450px]">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                        <span className="text-[10px] tracking-[0.4em] font-black text-purple-400 uppercase">CYBERNEURIX</span>
                                    </div>
                                    <span className="text-[10px] tracking-[0.4em] font-black text-zinc-500 uppercase block">{post.category}</span>
                                </div>
                                <div className="text-[10px] tracking-[0.4em] font-black text-zinc-500 uppercase">{formatDate(post.date)}</div>
                            </div>
                            
                            <div>
                                <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.05] tracking-tight max-w-4xl mb-8 group-hover:scale-[1.01] transition-transform duration-700">
                                    <span className="bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
                                        {post.title}
                                    </span>
                                </h1>
                                
                                <div className="flex flex-wrap items-center gap-10 text-zinc-400 border-t border-white/5 pt-8">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-purple-500/10 rounded-lg">
                                            <User className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] uppercase tracking-widest text-zinc-500 mb-0.5">Author</span>
                                            <span className="text-sm font-bold text-zinc-200">
                                                <a href="https://cyberneurix.com/about" style={{ color: 'inherit', textDecoration: 'none' }}>
                                                    {post.author === 'TAOCS' ? 'Kaushik Sundararajan' : (post.author || 'The Neurix Observer')}
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-cyan-500/10 rounded-lg">
                                            <Clock className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] uppercase tracking-widest text-zinc-500 mb-0.5">Time to Read</span>
                                            <span className="text-sm font-bold text-zinc-200">{post.readingTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Background Image / Texture Layer */}
                        <div className="absolute inset-0 z-0">
                            {post.image ? (
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover opacity-30 blur-[4px] group-hover:scale-110 transition-transform duration-1000"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-zinc-950 to-black" />
                            )}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.1),transparent_70%)]" />
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none" />
                        </div>
                    </div>

                    {/* Article Content - Rich Ebook Typography with Scroll Highlighting */}
                    <ScrollTransformWrapper
                        className="prose-custom blog-content scroll-highlight-container"
                    >
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                            components={{
                                h2: ({ children, ...props }: any) => (
                                    <h2
                                        className="scroll-highlight-section text-3xl md:text-4xl font-bold text-white mt-8 mb-6 pb-3 border-b border-purple-900/30"
                                        data-section="true"
                                        {...props}
                                    >
                                        {children}
                                    </h2>
                                ),
                                h3: ({ children, ...props }: any) => (
                                    <h3
                                        className="scroll-highlight-section text-2xl md:text-3xl font-bold text-slate-200 mt-8 mb-5"
                                        data-section="true"
                                        {...props}
                                    >
                                        {children}
                                    </h3>
                                ),
                                p: ({ children, ...props }: any) => (
                                    <p
                                        className="scroll-highlight-section mb-6 leading-[1.9] text-lg text-zinc-300 font-light tracking-wide"
                                        data-section="true"
                                        {...props}
                                    >
                                        {children}
                                    </p>
                                ),
                                ul: ({ children, ...props }: any) => (
                                    <ul
                                        className="scroll-highlight-section mb-8 space-y-3 text-zinc-300"
                                        data-section="true"
                                        {...props}
                                    >
                                        {children}
                                    </ul>
                                ),
                                blockquote: ({ children, ...props }: any) => (
                                    <div className="scroll-highlight-section my-12" data-section="true">
                                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                                            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                                CyberNeurix Unique Angle
                                            </span>
                                        </h3>
                                        <blockquote
                                            className="pl-6 border-l-4 border-purple-500 bg-purple-900/10 py-6 pr-6 rounded-r-lg italic"
                                            {...props}
                                        >
                                            {children}
                                        </blockquote>
                                    </div>
                                ),
                                table: ({ children, ...props }: any) => (
                                    <div className="scroll-highlight-section my-12 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm shadow-2xl" data-section="true">
                                        <table className="w-full text-left border-collapse" {...props}>
                                            {children}
                                        </table>
                                    </div>
                                ),
                                thead: ({ children, ...props }: any) => (
                                    <thead className="bg-zinc-800/80 border-b border-zinc-700" {...props}>
                                        {children}
                                    </thead>
                                ),
                                th: ({ children, ...props }: any) => (
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-purple-400" {...props}>
                                        {children}
                                    </th>
                                ),
                                td: ({ children, ...props }: any) => (
                                    <td className="px-6 py-5 text-sm text-zinc-300 border-b border-zinc-800/50" {...props}>
                                        {children}
                                    </td>
                                ),
                                'flow-chart': ({ children }: any) => (
                                    <div className="scroll-highlight-section my-16 py-8 px-4 border-y border-zinc-800 bg-zinc-900/20" data-section="true">
                                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 lg:gap-8">
                                            {children}
                                        </div>
                                    </div>
                                ),
                                'flow-step': ({ title, children, isLast }: any) => (
                                    <div className="flex flex-col md:flex-row items-center gap-4 group">
                                        <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:border-purple-500/50 transition-all min-w-[200px] text-center shadow-xl">
                                            <div className="text-purple-400 font-bold text-sm tracking-widest uppercase mb-1">{title}</div>
                                            <div className="text-zinc-400 text-xs font-light">{children}</div>
                                        </div>
                                        {!isLast && (
                                            <div className="flex items-center justify-center h-full">
                                                <ArrowRight className="w-6 h-6 text-zinc-700 md:rotate-0 rotate-90" />
                                            </div>
                                        )}
                                    </div>
                                ),
                            } as any}
                        >
                            {post.content}
                        </ReactMarkdown>
                        <ScrollHighlight />
                    </ScrollTransformWrapper>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-3 mt-16 pt-8 border-t border-zinc-800/50">
                            <Tag className="w-5 h-5 text-zinc-500" />
                            <div className="flex flex-wrap gap-3">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-4 py-2 text-sm bg-zinc-800/50 text-zinc-300 rounded-lg hover:bg-zinc-700/50 transition-colors border border-zinc-700/30"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* What's Next Strategic Roadmap */}
                    <div className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-purple-900/10 to-cyan-900/10 border border-purple-500/20 backdrop-blur-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ArrowRight className="w-24 h-24 rotate-[-45deg]" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
                            <ChevronRight className="w-8 h-8 text-cyan-400" />
                            Next Evolution: The Strategic Roadmap
                        </h3>
                        <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                            {post.category === 'cybersecurity' 
                                ? "As we move further into 2026, the intersection of autonomous response and identity-centric architecture will define the winner's circle in cyber defense. Stay tuned for our upcoming deep-dives into LLM-driven threat modeling and quantum-resistant network perimeters."
                                : "The decentralisation of neural computing is just beginning. Our research pipeline for Q3 2026 focuses on non-invasive cognitive augmentation and the emerging legal frameworks for mental privacy in the workplace."
                            }
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link 
                                href={post.category === 'cybersecurity' ? '/category/cybersecurity' : '/category/neurotechnology'}
                                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-900/20"
                            >
                                Track {post.category === 'cybersecurity' ? 'Cyber' : 'Neural'} Future
                            </Link>
                            <Link 
                                href="https://cyberneurix.com"
                                className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all border border-zinc-700"
                            >
                                Explore Main Ecosystem
                            </Link>
                        </div>
                    </div>
                </FadeInWrapper>
            </article>

            {/* Related Posts */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 border-t border-zinc-800/50 relative z-10">
                <h2 className="text-4xl font-bold text-white mb-12">Continue Reading</h2>
                
                {relatedPosts.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {relatedPosts.map((relatedPost) => (
                            <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                                <HoverCardWrapper
                                    className="blog-card bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 hover:border-purple-500/50 transition-all h-full backdrop-blur-sm"
                                >
                                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-zinc-400 text-base mb-6 line-clamp-3 leading-relaxed">
                                        {relatedPost.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-zinc-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{relatedPost.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            <span>{relatedPost.readingTime}</span>
                                        </div>
                                    </div>
                                </HoverCardWrapper>
                            </Link>
                        ))}
                    </div>
                )}
                
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-t border-zinc-800 pt-8 mt-8">
                    <Link href="/" className="text-zinc-400 hover:text-purple-400 transition-colors inline-flex items-center gap-2">
                        <span>&larr;</span> Back to CyberNeurix Blog
                    </Link>
                    <Link 
                        href={post.category === 'cybersecurity' ? process.env.NEXT_PUBLIC_CYBERSECURITY_URL || 'https://cybersecurity.cyberneurix.com' : process.env.NEXT_PUBLIC_NEURO_URL || 'https://neurotechnology.cyberneurix.com'} 
                        className="text-zinc-400 hover:text-cyan-400 transition-colors inline-flex items-center gap-2"
                    >
                        Explore {post.category === 'cybersecurity' ? 'Cybersecurity' : 'Neurotechnology'} Hub <span>&rarr;</span>
                    </Link>
                </div>
            </section>
        </div>
    );
}
