'use client';

import { useEffect, useState, useRef } from 'react';

interface TocItem {
    id: string;
    text: string;
}

interface TableOfContentsProps {
    items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(true);
    const [readProgress, setReadProgress] = useState(0);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (items.length === 0) return;

        const handleScroll = () => {
            // Track read progress
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setReadProgress(docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0);

            // Determine active heading
            let currentId: string | null = null;
            for (const item of items) {
                const el = document.getElementById(item.id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150) {
                        currentId = item.id;
                    }
                }
            }
            setActiveId(currentId);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [items]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top, behavior: 'smooth' });
            setActiveId(id);
        }
    };

    if (items.length === 0) return null;

    return (
        <div className="my-10 max-w-2xl">
            {/* TOC Box */}
            <div className="bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-purple-950/30 border border-purple-500/20 rounded-b-2xl rounded-tr-2xl overflow-hidden backdrop-blur-sm shadow-[0_0_30px_rgba(168,85,247,0.08)]">

                {/* Header */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 group hover:bg-white/[0.02] transition-colors"
                >
                    <div className="flex items-center gap-3">
                        {/* Icon */}
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 group-hover:border-purple-400/40 transition-colors">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-purple-400">
                                <line x1="3" y1="6" x2="7" y2="6"></line>
                                <line x1="10" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="12" x2="7" y2="12"></line>
                                <line x1="10" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="18" x2="7" y2="18"></line>
                                <line x1="10" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </div>
                        <span className="text-sm font-bold text-white tracking-widest uppercase">Table of Contents</span>
                        <span className="text-xs text-zinc-600 font-mono">{items.length} sections</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-purple-400/70 font-mono tabular-nums">{Math.round(readProgress)}% read</span>
                        <svg
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                            strokeLinecap="round" strokeLinejoin="round"
                            className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </button>

                {/* Items */}
                <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isOpen ? `${items.length * 56 + 24}px` : '0px' }}
                >
                    <div className="px-4 pb-4 space-y-1">
                        {items.map((item, i) => {
                            const isActive = activeId === item.id;
                            return (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={(e) => handleClick(e, item.id)}
                                    className={`group flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                                        isActive
                                            ? 'bg-purple-500/10 border border-purple-500/30'
                                            : 'border border-transparent hover:bg-white/[0.04] hover:border-zinc-700/40'
                                    }`}
                                >
                                    {/* Number */}
                                    <span className={`min-w-[1.75rem] h-7 flex items-center justify-center rounded-lg text-xs font-bold font-mono transition-all duration-200 ${
                                        isActive
                                            ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)]'
                                            : 'bg-zinc-800/60 text-zinc-500 group-hover:bg-zinc-700/60 group-hover:text-zinc-300'
                                    }`}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>

                                    {/* Active indicator bar */}
                                    {isActive && (
                                        <span className="w-1 h-5 rounded-full bg-gradient-to-b from-purple-400 to-cyan-400 shadow-[0_0_8px_rgba(168,85,247,0.8)] flex-shrink-0" />
                                    )}

                                    {/* Text */}
                                    <span className={`text-sm leading-snug transition-colors duration-200 line-clamp-1 ${
                                        isActive
                                            ? 'text-white font-semibold'
                                            : 'text-zinc-400 group-hover:text-zinc-200'
                                    }`}>
                                        {item.text}
                                    </span>

                                    {/* Arrow on hover */}
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        className={`w-3.5 h-3.5 ml-auto flex-shrink-0 transition-all duration-200 ${
                                            isActive ? 'text-purple-400 opacity-100' : 'text-zinc-600 opacity-0 group-hover:opacity-100'
                                        }`}>
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
