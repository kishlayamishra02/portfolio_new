"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Certification } from '../../types';

const SQRT_5000 = Math.sqrt(5000);

// Map issuer to a logo URL (fallback to UI Avatars for any not listed)
const issuerLogos: Record<string, string> = {
    "Aspire Institute": "https://ui-avatars.com/api/?name=AI&background=3b82f6&color=fff&size=128&bold=true",
    "Oracle": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/120px-Oracle_logo.svg.png",
    "Deloitte": "https://ui-avatars.com/api/?name=DL&background=86BC25&color=fff&size=128&bold=true",
    "PwC": "https://ui-avatars.com/api/?name=PwC&background=D04A02&color=fff&size=128&bold=true",
    "Goldman Sachs": "https://ui-avatars.com/api/?name=GS&background=6F9FD8&color=fff&size=128&bold=true",
    "Skyscanner": "https://ui-avatars.com/api/?name=SS&background=0770e3&color=fff&size=128&bold=true",
    "Mastercard": "https://ui-avatars.com/api/?name=MC&background=EB001B&color=fff&size=128&bold=true",
    "Accenture": "https://ui-avatars.com/api/?name=AC&background=A100FF&color=fff&size=128&bold=true",
    "Google": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png",
    "Google Digital Academy (Skillshop)": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.svg.png",
    "HP LIFE": "https://ui-avatars.com/api/?name=HP&background=0096D6&color=fff&size=128&bold=true",
    "IBM": "https://ui-avatars.com/api/?name=IBM&background=054ada&color=fff&size=128&bold=true",
    "PW (PhysicsWallah)": "https://ui-avatars.com/api/?name=PW&background=1a1a2e&color=fff&size=128&bold=true",
    "Yale University": "https://ui-avatars.com/api/?name=Y&background=00356B&color=fff&size=128&bold=true",
    "Kennesaw State University": "https://ui-avatars.com/api/?name=KSU&background=FDBB30&color=000&size=128&bold=true",
    "Duke University": "https://ui-avatars.com/api/?name=DU&background=012169&color=fff&size=128&bold=true",
    "University of Alaska Fairbanks": "https://ui-avatars.com/api/?name=UAF&background=236192&color=fff&size=128&bold=true",
    "iit guwahati": "https://ui-avatars.com/api/?name=IIT&background=1a1a2e&color=fff&size=128&bold=true",
    "University of Michigan": "https://ui-avatars.com/api/?name=UM&background=00274C&color=FFCB05&size=128&bold=true",
    "Vanderbilt University": "https://ui-avatars.com/api/?name=VU&background=866D4B&color=fff&size=128&bold=true",
    "Harvard University": "https://ui-avatars.com/api/?name=H&background=A51C30&color=fff&size=128&bold=true",
};

function getIssuerLogo(issuer: string): string {
    return issuerLogos[issuer] || `https://ui-avatars.com/api/?name=${encodeURIComponent(issuer.substring(0, 2))}&background=040404&color=D4AF37&size=128&bold=true`;
}

function generateContent(cert: Certification): string {
    const skillPreview = cert.skills.slice(0, 4).join(", ");
    const phrases = [
        `Gained expertise in ${skillPreview}. Ready to apply these skills in real-world production systems.`,
        `Mastered ${skillPreview} through rigorous coursework. Applying insights to build better, more scalable solutions.`,
        `Certified in ${skillPreview}. Bringing this knowledge to every project and team I join.`,
        `Developed deep understanding of ${skillPreview}. These skills directly fuel my technical impact.`,
    ];
    // Deterministic pick based on id
    return phrases[parseInt(cert.id) % phrases.length];
}

interface CertCardData {
    tempId: number;
    title: string;
    content: string;
    by: string;
    imgSrc: string;
    link?: string;
}

function certsToCards(certs: Certification[]): CertCardData[] {
    return certs.map((c, i) => ({
        tempId: i,
        title: c.title,
        content: generateContent(c),
        by: `${c.issuer} · ${c.date}`,
        imgSrc: getIssuerLogo(c.issuer),
        link: c.link
    }));
}

interface CertCardProps {
    position: number;
    card: CertCardData;
    handleMove: (steps: number) => void;
    cardSize: number;
}

const CertCard: React.FC<CertCardProps> = ({ position, card, handleMove, cardSize }) => {
    const isCenter = position === 0;

    return (
        <div
            onClick={() => {
                if (isCenter) {
                    window.open(card.link || "https://www.linkedin.com/in/kishlayamishra", "_blank", "noopener,noreferrer");
                } else {
                    handleMove(position);
                }
            }}
            data-hover={isCenter}
            className={cn(
                "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-8 transition-all duration-500 ease-in-out select-none",
                isCenter
                    ? "z-10 border-[#D4AF37]/60"
                    : "z-0 border-white/10 hover:border-[#D4AF37]/30"
            )}
            style={{
                width: cardSize,
                height: cardSize,
                background: isCenter
                    ? 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(245,158,11,0.1) 100%)'
                    : 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(16px)',
                clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
                transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
                boxShadow: isCenter
                    ? '0px 8px 0px 4px rgba(212,175,55,0.15), 0 0 40px rgba(212,175,55,0.08)'
                    : '0px 0px 0px 0px transparent',
            }}
        >
            {/* Corner cut line */}
            <span
                className="absolute block origin-top-right rotate-45"
                style={{
                    right: -2,
                    top: 48,
                    width: SQRT_5000,
                    height: 2,
                    background: isCenter ? 'rgba(212,175,55,0.4)' : 'rgba(255,255,255,0.08)',
                }}
            />

            {/* Issuer logo */}
            <img
                src={card.imgSrc}
                alt={card.by.split('·')[0]}
                className="mb-4 h-14 w-12 object-cover object-center rounded-sm"
                style={{
                    boxShadow: '3px 3px 0px rgba(4,4,7,0.8)',
                    filter: isCenter ? 'none' : 'grayscale(0.5) opacity(0.7)',
                }}
            />

            {/* Certificate title */}
            <h3
                className={cn(
                    "text-sm sm:text-base font-black italic uppercase tracking-tight leading-tight",
                    isCenter ? "text-white" : "text-white/50"
                )}
            >
                {card.title}
            </h3>

            {/* Content (skills summary) */}
            <p
                className={cn(
                    "mt-3 text-[11px] sm:text-xs leading-relaxed italic",
                    isCenter ? "text-white/70" : "text-white/30"
                )}
            >
                {card.content}
            </p>

            {/* Issuer + Date */}
            <p
                className={cn(
                    "absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 text-[10px] font-black uppercase tracking-widest italic",
                    isCenter ? "text-[#D4AF37]" : "text-white/20"
                )}
            >
                {card.by}
            </p>
        </div>
    );
};

export const StaggerCertificates: React.FC<{ data: Certification[] }> = ({ data }) => {
    const [cardSize, setCardSize] = useState(365);
    const [cards, setCards] = useState<CertCardData[]>(() => certsToCards(data));

    const handleMove = (steps: number) => {
        const newList = [...cards];
        if (steps > 0) {
            for (let i = steps; i > 0; i--) {
                const item = newList.shift();
                if (!item) return;
                newList.push({ ...item, tempId: Math.random() });
            }
        } else {
            for (let i = steps; i < 0; i++) {
                const item = newList.pop();
                if (!item) return;
                newList.unshift({ ...item, tempId: Math.random() });
            }
        }
        setCards(newList);
    };

    useEffect(() => {
        const updateSize = () => {
            const { matches } = window.matchMedia("(min-width: 640px)");
            setCardSize(matches ? 365 : 280);
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return (
        <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ height: 580 }}
        >
            {cards.map((card, index) => {
                const position = cards.length % 2
                    ? index - (cards.length + 1) / 2
                    : index - cards.length / 2;
                return (
                    <CertCard
                        key={card.tempId}
                        card={card}
                        handleMove={handleMove}
                        position={position}
                        cardSize={cardSize}
                    />
                );
            })}

            {/* Navigation arrows */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-20">
                <button
                    onClick={() => handleMove(-1)}
                    className={cn(
                        "flex h-12 w-12 items-center justify-center text-xl transition-all duration-300 rounded-lg",
                        "bg-white/5 border border-white/10 text-white/50",
                        "hover:bg-[#D4AF37]/20 hover:text-white hover:border-[#D4AF37]/40",
                    )}
                    aria-label="Previous certificate"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={() => handleMove(1)}
                    className={cn(
                        "flex h-12 w-12 items-center justify-center text-xl transition-all duration-300 rounded-lg",
                        "bg-white/5 border border-white/10 text-white/50",
                        "hover:bg-[#D4AF37]/20 hover:text-white hover:border-[#D4AF37]/40",
                    )}
                    aria-label="Next certificate"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};
