"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Certification } from "../../types";

export const CertificateTimeline = ({ data }: { data: Certification[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref, data]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 40%", "end 80%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div className="w-full relative" ref={containerRef}>
            <div ref={ref} className="relative pb-20">
                {data.map((cert, index) => (
                    <div key={index} className="flex justify-start pt-10 md:pt-16 md:gap-10">
                        <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                            {/* Dot indicator */}
                            <div className="h-6 absolute left-2 md:left-2 w-6 rounded-full bg-[#050508] flex items-center justify-center border border-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                                <div className="h-2 w-2 rounded-full bg-[#D4AF37] border border-[#F59E0B]/50 p-1 animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                            </div>
                        </div>

                        <div className="relative pl-14 pr-4 md:pl-0 w-full">
                            <div
                                style={{
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    backdropFilter: 'blur(12px)',
                                    borderRadius: '0.75rem',
                                    padding: '1.5rem',
                                    border: '1px solid rgba(255, 255, 255, 0.05)',
                                    transition: 'all 0.3s',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                                }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <div className="flex flex-wrap justify-between items-start gap-4 mb-3">
                                        <h4 className="text-lg font-black italic uppercase text-white/80 group-hover:text-white transition-colors">
                                            {cert.title}
                                        </h4>
                                        <span className="text-[10px] font-black tracking-widest uppercase italic text-[#F59E0B] whitespace-nowrap">
                                            {cert.date}
                                        </span>
                                    </div>
                                    <p className="text-sm italic font-semibold mb-4" style={{ color: 'var(--muted)' }}>
                                        {cert.issuer}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {cert.skills.slice(0, 8).map(skill => (
                                            <span key={skill} className="px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest italic bg-white/5 text-white/40">
                                                {skill}
                                            </span>
                                        ))}
                                        {cert.skills.length > 8 && (
                                            <span className="px-2 py-1 rounded-sm text-[9px] font-black uppercase tracking-widest italic bg-white/5 text-white/40">
                                                +{cert.skills.length - 8}
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* The drawing line */}
                <div
                    style={{ height: height + "px" }}
                    className="absolute left-4 md:left-4 top-10 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-white/5 to-transparent"
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            width: '2px',
                            background: 'linear-gradient(to top, #F59E0B, #D4AF37, transparent)',
                            borderRadius: '9999px',
                            boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
