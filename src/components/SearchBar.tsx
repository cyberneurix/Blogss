'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

import { motion } from 'framer-motion';

interface SearchBarProps {
    query: string;
    onQueryChange: (val: string) => void;
}

export default function SearchBar({ query, onQueryChange }: SearchBarProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative max-w-2xl mx-auto"
        >
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-500 w-5 h-5" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder="Search articles by title, category, or keywords..."
                    className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
            </div>
        </motion.div>
    );
}
