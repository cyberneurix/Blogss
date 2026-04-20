'use client';

import { useEffect, useState } from 'react';

export default function FloatingBackground() {
    const [words] = useState([
        'CYBERSECURITY',
        'NEUROTECHNOLOGY',
        'AI',
        'MACHINE LEARNING',
        'THREAT DETECTION',
        'NEURAL NETWORKS',
        'BLOCKCHAIN',
        'ZERO TRUST',
        'QUANTUM COMPUTING',
        'BCI',
        'COGNITION',
        'SECURITY',
        'INNOVATION',
        'DEFENSE',
        'ENCRYPTION',
        'FIREWALL',
        'ANALYSIS',
    ]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
            {words.map((word, index) => {
                const randomTop = Math.random() * 100;
                const randomLeft = Math.random() * 100;
                const randomDelay = Math.random() * 10;
                const randomDuration = 15 + Math.random() * 10;
                const randomSize = 1.5 + Math.random() * 2.5;
                const randomRotation = -15 + Math.random() * 30;

                return (
                    <div
                        key={index}
                        className="absolute text-zinc-800 dark:text-zinc-800 font-mono font-bold select-none floating-text"
                        style={{
                            top: `${randomTop}%`,
                            left: `${randomLeft}%`,
                            fontSize: `${randomSize}rem`,
                            transform: `rotate(${randomRotation}deg)`,
                            animationDelay: `${randomDelay}s`,
                            animationDuration: `${randomDuration}s`,
                        }}
                    >
                        {word}
                    </div>
                );
            })}
        </div>
    );
}
