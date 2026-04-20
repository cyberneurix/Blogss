'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, Shield, BrainCircuit, FileText, Activity, Book, BookOpen, Mic, Terminal, Server, Microscope, Cpu, Zap, ChevronDown } from 'lucide-react';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', icon: Home, href: 'https://www.cyberneurix.com', active: false },
        { 
            name: 'Cybersecurity', 
            icon: Shield, 
            href: 'https://cybersecurity.cyberneurix.com', 
            active: false,
            dropdown: [
                { name: 'Knowledge Base', icon: Book, href: 'https://cybersecurity.cyberneurix.com/knowledge-base' },
                { name: 'News & Threat Reports', icon: BookOpen, href: 'https://cybersecurity.cyberneurix.com/news-and-threat-reports' },
                { name: 'Podcasts & Perspectives', icon: Mic, href: 'https://cybersecurity.cyberneurix.com/podcasts-and-perspectives' },
                { name: 'Tutorials & Labs', icon: Terminal, href: 'https://cybersecurity.cyberneurix.com/tutorials-and-labs' },
                { name: 'Enter CNIS', icon: Server, href: 'https://cybersecurity.cyberneurix.com/cnis' }
            ]
        },
        { 
            name: 'NeuroTechnology', 
            icon: BrainCircuit, 
            href: 'https://neurotechnology.cyberneurix.com', 
            active: false,
            dropdown: [
                { name: 'Research & Breakthroughs', icon: Microscope, href: 'https://neurotechnology.cyberneurix.com/research-and-breakthroughs' },
                { name: 'Brain-Computer Interfaces', icon: Cpu, href: 'https://neurotechnology.cyberneurix.com/bcis' },
                { name: 'Neural Frontier', icon: Zap, href: 'https://neurotechnology.cyberneurix.com/neural-frontier' }
            ]
        },
        { name: 'Blogs', icon: FileText, href: 'https://blogs.cyberneurix.com', active: true },
        { name: 'Pulse', icon: Activity, href: 'https://pulse.cyberneurix.com/', active: false },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-[100] px-4 py-8 pointer-events-none">
            <div className="max-w-7xl mx-auto flex justify-center">
                <nav className={`
                    pointer-events-auto
                    flex items-center gap-1 p-1 
                    bg-black/40 backdrop-blur-xl
                    border border-white/10 rounded-full
                    shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                    transition-all duration-500
                    ${scrolled ? 'scale-95 opacity-90 hover:scale-100 hover:opacity-100' : ''}
                `}>
                    {navItems.map((item) => (
                        <div key={item.name} className="relative group">
                            <a
                                href={item.href}
                                className={`
                                    flex items-center gap-2 px-6 py-2.5 rounded-full
                                    text-sm font-medium transition-all duration-300
                                    ${item.active
                                        ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                    }
                                `}
                            >
                                <item.icon className={`w-4 h-4 ${item.active ? 'text-white' : 'text-zinc-500 group-hover:text-purple-400'} transition-colors duration-300`} />
                                <span className="hidden md:inline">{item.name}</span>
                                {item.dropdown && <ChevronDown className="hidden md:inline w-3 h-3 text-zinc-500 group-hover:text-white transition-colors" />}
                                
                                {/* Mobile Tooltip */}
                                <span className="md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900 border border-zinc-800 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                    {item.name}
                                </span>
                            </a>

                            {/* Desktop Dropdown */}
                            {item.dropdown && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 z-50 w-64">
                                    <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-2 shadow-2xl flex flex-col gap-1">
                                        {item.dropdown.map(dropItem => (
                                            <a 
                                                key={dropItem.name} 
                                                href={dropItem.href} 
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors group/item"
                                            >
                                                <dropItem.icon className="w-4 h-4 text-zinc-500 group-hover/item:text-purple-400" />
                                                <span className="text-sm">{dropItem.name}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
            
            {/* Logo Backdrop / branding area */}
            <div className="absolute top-8 left-8 hidden lg:block pointer-events-none">
                <div className="flex flex-col">
                    <span className="text-xl font-black text-white tracking-tighter">CYBERNEURIX</span>
                    <span className="text-[9px] font-bold text-purple-500 tracking-[0.3em] uppercase opacity-80">Intelligence Hub</span>
                </div>
            </div>
        </header>
    );
}
