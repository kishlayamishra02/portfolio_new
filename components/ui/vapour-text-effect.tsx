"use client";
import React, { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────
export const Tag = {
    H1: "h1",
    H2: "h2",
    H3: "h3",
    H4: "h4",
    P: "p",
    SPAN: "span",
} as const;
type TagType = (typeof Tag)[keyof typeof Tag];

interface VaporizeTextCycleProps {
    texts: string[];
    font?: {
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: number | string;
        fontStyle?: string;
    };
    color?: string;
    spread?: number;
    density?: number;
    animation?: {
        vaporizeDuration?: number;
        fadeInDuration?: number;
        waitDuration?: number;
    };
    direction?: "left-to-right" | "right-to-left";
    alignment?: "left" | "center" | "right";
    tag?: TagType;
}

interface Particle {
    x: number;
    y: number;
    opacity: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
}

const VaporizeTextCycle: React.FC<VaporizeTextCycleProps> = ({
    texts,
    font = {},
    color = "rgba(255,255,255,0.9)",
    spread = 6,
    density = 6,
    animation = {},
    direction = "left-to-right",
    alignment = "center",
    tag = Tag.H1,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [, forceUpdate] = useState(0);

    const {
        vaporizeDuration = 2.0,
        fadeInDuration = 0.8,
        waitDuration = 0.6,
    } = animation;

    const {
        fontFamily = "Inter, sans-serif",
        fontSize = "52px",
        fontWeight = 900,
        fontStyle = "italic",
    } = font;

    const phaseRef = useRef<"fadein" | "wait" | "vaporize">("fadein");
    const phaseTimeRef = useRef(0);
    const textIndexRef = useRef(0);
    const particlesRef = useRef<Particle[]>([]);
    const frameRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const textOpacityRef = useRef(0);
    const pixelDataRef = useRef<{ x: number; y: number }[]>([]);

    const parseColor = (c: string): [number, number, number] => {
        const match = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
        return [255, 255, 255];
    };

    const [r, g, b] = parseColor(color);

    const samplePixels = (canvas: HTMLCanvasElement, text: string) => {
        const tmp = document.createElement("canvas");
        tmp.width = canvas.width;
        tmp.height = canvas.height;
        const ctx = tmp.getContext("2d")!;
        ctx.clearRect(0, 0, tmp.width, tmp.height);
        ctx.fillStyle = "white";
        ctx.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, tmp.width / 2, tmp.height / 2);
        const imageData = ctx.getImageData(0, 0, tmp.width, tmp.height);
        const pixels: { x: number; y: number }[] = [];
        for (let y = 0; y < tmp.height; y += density) {
            for (let x = 0; x < tmp.width; x += density) {
                if (imageData.data[(y * tmp.width + x) * 4 + 3] > 128) {
                    pixels.push({ x, y });
                }
            }
        }
        pixelDataRef.current = pixels;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        const ctx = canvas.getContext("2d")!;
        ctx.scale(dpr, dpr);
        samplePixels(canvas, texts[0]);

        const animate = (time: number) => {
            const dt = Math.min((time - (lastTimeRef.current || time)) / 1000, 0.05);
            lastTimeRef.current = time;
            phaseTimeRef.current += dt;
            ctx.clearRect(0, 0, w, h);
            const text = texts[textIndexRef.current];

            if (phaseRef.current === "fadein") {
                textOpacityRef.current = Math.min(phaseTimeRef.current / fadeInDuration, 1);
                ctx.globalAlpha = textOpacityRef.current;
                ctx.fillStyle = color;
                ctx.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(text, w / 2, h / 2);
                ctx.globalAlpha = 1;
                if (phaseTimeRef.current >= fadeInDuration) {
                    phaseRef.current = "wait";
                    phaseTimeRef.current = 0;
                }
            } else if (phaseRef.current === "wait") {
                ctx.globalAlpha = 1;
                ctx.fillStyle = color;
                ctx.font = `${fontStyle} ${fontWeight} ${fontSize} ${fontFamily}`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(text, w / 2, h / 2);
                if (phaseTimeRef.current >= waitDuration) {
                    phaseRef.current = "vaporize";
                    phaseTimeRef.current = 0;
                    particlesRef.current = pixelDataRef.current.map(({ x, y }) => {
                        const dirMult = direction === "left-to-right" ? 1 : -1;
                        return {
                            x, y,
                            opacity: 1,
                            vx: (Math.random() * 2 + 0.5) * dirMult * spread,
                            vy: (Math.random() - 0.5) * spread * 0.6,
                            life: 0,
                            maxLife: vaporizeDuration * (0.5 + Math.random() * 0.5),
                            size: 1 + Math.random() * 1.5,
                        };
                    });
                }
            } else {
                const progress = phaseTimeRef.current / vaporizeDuration;
                const alive = particlesRef.current.filter(p => p.life < p.maxLife);
                for (const p of alive) {
                    p.life += dt;
                    const t = p.life / p.maxLife;
                    p.x += p.vx * dt * 60;
                    p.y += p.vy * dt * 60;
                    p.opacity = 1 - t;
                    ctx.globalAlpha = p.opacity;
                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.globalAlpha = 1;
                if (progress >= 1 && alive.length === 0) {
                    textIndexRef.current = (textIndexRef.current + 1) % texts.length;
                    phaseRef.current = "fadein";
                    phaseTimeRef.current = 0;
                    particlesRef.current = [];
                    samplePixels(canvas, texts[textIndexRef.current]);
                }
            }
            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameRef.current);
    }, [texts, color, spread, density, vaporizeDuration, fadeInDuration, waitDuration]);

    return (
        <div ref={containerRef} style={{ width: "100%", position: "relative" }}>
            <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "120px", display: "block" }}
            />
        </div>
    );
};

export default VaporizeTextCycle;
