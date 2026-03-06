import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from './ui/typewriter';

interface LoadingProps {
    onComplete: () => void;
}

const MESSAGES = [
    "Benchmarking ROI...",
    "Valuating impact...",
    "Generating contract...",
    "Portfolio ready.",
];

const Loading: React.FC<LoadingProps> = ({ onComplete }) => {
    useEffect(() => {
        const t = setTimeout(onComplete, 6500);
        return () => clearTimeout(t);
    }, [onComplete]);

    const nodes = [
        { id: 0, x: 0, y: 0 },
        { id: 1, x: -120, y: -60 },
        { id: 2, x: 140, y: -90 },
        { id: 3, x: 60, y: 110 },
        { id: 4, x: -90, y: 130 },
        { id: 5, x: 180, y: 40 },
        { id: 6, x: -160, y: 20 },
    ];

    const links = [
        [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 6], [2, 5], [3, 5], [4, 6],
        [1, 2], [5, 6]
    ];

    return (
        <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                backgroundColor: '#040404'
            }}
        >
            {/* Dark Nebula Haze */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 70%)'
                }}
            />

            <div className="relative w-full h-full flex items-center justify-center">
                {/* Constellation Network */}
                <svg className="absolute w-[600px] h-[600px] pointer-events-none">
                    <defs>
                        <filter id="gold-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="2" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Lines */}
                    {links.map(([from, to], i) => {
                        const start = nodes[from];
                        const end = nodes[to];
                        return (
                            <motion.line
                                key={`link-${i}`}
                                x1={300 + start.x}
                                y1={300 + start.y}
                                x2={300 + end.x}
                                y2={300 + end.y}
                                stroke="rgba(212, 175, 55, 0.15)"
                                strokeWidth="1"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{
                                    delay: 1.5 + i * 0.1,
                                    duration: 2,
                                    ease: "easeInOut"
                                }}
                            />
                        );
                    })}

                    {/* Nodes (Stars) */}
                    {nodes.map((node, i) => (
                        <motion.g key={`node-${i}`}>
                            {/* Star Core */}
                            <motion.circle
                                cx={300 + node.x}
                                cy={300 + node.y}
                                initial={{ r: 0, opacity: 0 }}
                                animate={{
                                    r: node.id === 0 ? 3 : 2,
                                    opacity: [0, 1, 0.6, 1],
                                }}
                                transition={{
                                    delay: i === 0 ? 0.5 : 1 + i * 0.2,
                                    duration: node.id === 0 ? 1.5 : 1,
                                    opacity: { repeat: Infinity, duration: 3 + Math.random() * 2 }
                                }}
                                fill={node.id === 0 ? "#F59E0B" : "#D4AF37"}
                                filter="url(#gold-glow)"
                            />
                            {/* Subtle Pulse Ring for the center star */}
                            {node.id === 0 && (
                                <motion.circle
                                    cx={300}
                                    cy={300}
                                    initial={{ r: 0, opacity: 0 }}
                                    animate={{ r: 40, opacity: 0 }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeOut"
                                    }}
                                    stroke="rgba(245, 158, 11, 0.2)"
                                    strokeWidth="1"
                                    fill="none"
                                />
                            )}
                        </motion.g>
                    ))}
                </svg>

                {/* Text Content */}
                <div className="absolute bottom-[20%] text-center space-y-2">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        transition={{ delay: 3 }}
                        style={{
                            fontSize: '10px',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '1em',
                            fontStyle: 'italic',
                            color: 'rgba(255, 255, 255, 0.4)'
                        }}
                    >
                        Initializing Deep Space
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3.5 }}
                        style={{
                            fontSize: '12px',
                            fontFamily: 'monospace',
                            color: 'rgba(212, 175, 55, 0.6)',
                            letterSpacing: '0.2em'
                        }}
                    >
                        Mapping Kishlaya Mishra...
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Loading;
