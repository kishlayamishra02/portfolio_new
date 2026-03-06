"use client";

import { useEffect, useRef } from "react";

interface SkillsGlobeProps {
    skills: string[];
    width?: number;
    height?: number;
    className?: string;
}

interface Meteor {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
    progress: number;      // 0 → 1
    speed: number;
    trail: { x: number; y: number; alpha: number }[];
    skillIdx: number;
    impactFlash: number;   // 0 → 1 → 0 flash on impact
    impactParticles: { x: number; y: number; vx: number; vy: number; life: number }[];
}

export default function SkillsGlobe({ skills, width = 500, height = 500, className = "" }: SkillsGlobeProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        const containerWidth = Math.min(width, canvas.parentElement?.clientWidth || width);
        const containerHeight = Math.min(height, containerWidth);
        const radius = containerWidth * 0.35;

        canvas.width = containerWidth * dpr;
        canvas.height = containerHeight * dpr;
        canvas.style.width = `${containerWidth}px`;
        canvas.style.height = `${containerHeight}px`;
        ctx.scale(dpr, dpr);

        const cx = containerWidth / 2;
        const cy = containerHeight / 2;

        // Generate sphere points using fibonacci sphere distribution
        const numPoints = 200;
        const points: { x: number; y: number; z: number }[] = [];
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));

        for (let i = 0; i < numPoints; i++) {
            const y = 1 - (i / (numPoints - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = goldenAngle * i;
            points.push({
                x: Math.cos(theta) * r,
                y: y,
                z: Math.sin(theta) * r,
            });
        }

        // Place skill labels on specific points (evenly distributed)
        const labelIndices: number[] = [];
        const step = Math.floor(numPoints / skills.length);
        for (let i = 0; i < skills.length; i++) {
            labelIndices.push((i * step) % numPoints);
        }

        let rotation = 0;
        let isDragging = false;
        let dragStartX = 0;
        let dragStartRotation = 0;

        // Progressive skill reveal state
        const revealedScales = new Array(skills.length).fill(0);
        let revealedCount = 0;
        const meteors: Meteor[] = [];
        let lastMeteorTime = performance.now();
        const meteorInterval = 4000; // 4 seconds between meteors

        // Helper: get the projected position of a label point
        const getLabelScreenPos = (skillIdx: number): { x: number; y: number } => {
            const ptIdx = labelIndices[skillIdx];
            const p = points[ptIdx];
            const cosR = Math.cos(rotation);
            const sinR = Math.sin(rotation);
            const rx = p.x * cosR - p.z * sinR;
            const rz = p.x * sinR + p.z * cosR;
            const ry = p.y;
            const scale = 1 / (1 + rz * 0.15);
            return {
                x: cx + rx * radius * scale,
                y: cy + ry * radius * scale,
            };
        };

        // Spawn a new meteor toward the next unrevealed skill
        const spawnMeteor = () => {
            if (revealedCount >= skills.length) return;
            const target = getLabelScreenPos(revealedCount);

            // Random start position from edges (higher up for a longer fall)
            const edge = Math.random();
            let startX: number, startY: number;
            if (edge < 0.3) {
                // from top
                startX = Math.random() * containerWidth;
                startY = -100;
            } else if (edge < 0.6) {
                // from top-right
                startX = containerWidth + 100;
                startY = Math.random() * -100;
            } else {
                // from top-left
                startX = -100;
                startY = Math.random() * -100;
            }

            meteors.push({
                x: startX,
                y: startY,
                targetX: target.x,
                targetY: target.y,
                progress: 0,
                speed: 0.003 + Math.random() * 0.002, // SLOWER: halved speed
                trail: [],
                skillIdx: revealedCount,
                impactFlash: 0,
                impactParticles: [],
            });
        };

        const render = (now: number) => {
            ctx.clearRect(0, 0, containerWidth, containerHeight);

            // Spawn meteors on interval
            if (now - lastMeteorTime > meteorInterval && revealedCount < skills.length && meteors.length === 0) {
                spawnMeteor();
                lastMeteorTime = now;
            }

            // Update & draw meteors
            for (let m = meteors.length - 1; m >= 0; m--) {
                const meteor = meteors[m];

                if (meteor.progress < 1) {
                    // Ease-in movement for a "falling" feel
                    meteor.progress = Math.min(1, meteor.progress + meteor.speed);
                    const t = meteor.progress;
                    // Custom cubic bezier for a nice arc-like fall
                    const ease = t * t * (3 - 2 * t);

                    const currentTarget = getLabelScreenPos(meteor.skillIdx);
                    meteor.targetX = currentTarget.x;
                    meteor.targetY = currentTarget.y;

                    // Linear interpolation based on progress
                    const startX = meteor.trail.length > 0 ? meteor.trail[meteor.trail.length - 1].x : meteor.x;
                    const startY = meteor.trail.length > 0 ? meteor.trail[meteor.trail.length - 1].y : meteor.y;

                    // We need a stable start position. Let's use the first trail point as start.
                    if (meteor.trail.length === 0) {
                        meteor.trail.push({ x: meteor.x, y: meteor.y, alpha: 1 });
                    }

                    const initialPos = meteor.trail[meteor.trail.length - 1];
                    meteor.x = (1 - ease) * initialPos.x + ease * currentTarget.x;
                    meteor.y = (1 - ease) * initialPos.y + ease * currentTarget.y;

                    // Add trail particles
                    meteor.trail.unshift({ x: meteor.x, y: meteor.y, alpha: 1 });
                    if (meteor.trail.length > 40) meteor.trail.pop(); // LONGER TRAIL

                    // Draw trail
                    meteor.trail.forEach((tp, ti) => {
                        tp.alpha *= 0.94;
                        const trailSize = Math.max(0.5, (1 - ti / 40) * 5);
                        ctx.beginPath();
                        ctx.arc(tp.x, tp.y, trailSize, 0, Math.PI * 2);
                        // Gold trail
                        ctx.fillStyle = `rgba(212, 175, 55, ${tp.alpha * 0.6})`;
                        ctx.fill();

                        // Core trail
                        if (ti < 10) {
                            ctx.beginPath();
                            ctx.arc(tp.x, tp.y, trailSize * 0.4, 0, Math.PI * 2);
                            ctx.fillStyle = `rgba(255, 255, 255, ${tp.alpha * 0.8})`;
                            ctx.fill();
                        }
                    });

                    // Draw meteor head
                    const headGlow = 10 + Math.sin(now * 0.01) * 3;
                    ctx.beginPath();
                    ctx.arc(meteor.x, meteor.y, 5, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(255, 255, 255, 1)";
                    ctx.shadowBlur = headGlow;
                    ctx.shadowColor = "rgba(212, 175, 55, 1)";
                    ctx.fill();
                    ctx.shadowBlur = 0;

                    // Head outer glow
                    ctx.beginPath();
                    ctx.arc(meteor.x, meteor.y, headGlow, 0, Math.PI * 2);
                    ctx.fillStyle = "rgba(212, 175, 55, 0.2)";
                    ctx.fill();
                } else {
                    // Impact! 
                    if (meteor.impactFlash === 0) {
                        for (let i = 0; i < 20; i++) {
                            const angle = Math.random() * Math.PI * 2;
                            const speed = 1 + Math.random() * 4;
                            meteor.impactParticles.push({
                                x: meteor.targetX,
                                y: meteor.targetY,
                                vx: Math.cos(angle) * speed,
                                vy: Math.sin(angle) * speed,
                                life: 1,
                            });
                        }
                    }

                    meteor.impactFlash += 0.03;

                    // Draw Particles
                    meteor.impactParticles.forEach((p, pi) => {
                        p.x += p.vx;
                        p.y += p.vy;
                        p.life -= 0.015;
                        if (p.life > 0) {
                            ctx.beginPath();
                            ctx.arc(p.x, p.y, p.life * 4, 0, Math.PI * 2);
                            // Amber particles for impact
                            ctx.fillStyle = `rgba(245, 158, 11, ${p.life})`;
                            ctx.fill();
                        }
                    });

                    // Impact flash ring
                    if (meteor.impactFlash < 1) {
                        const flashRadius = meteor.impactFlash * 80;
                        ctx.beginPath();
                        ctx.arc(meteor.targetX, meteor.targetY, flashRadius, 0, Math.PI * 2);
                        ctx.strokeStyle = `rgba(245, 158, 11, ${(1 - meteor.impactFlash) * 0.8})`;
                        ctx.lineWidth = 4 * (1 - meteor.impactFlash);
                        ctx.stroke();

                        // Inner "BOOM" glow
                        ctx.beginPath();
                        ctx.arc(meteor.targetX, meteor.targetY, flashRadius * 0.6, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(212, 175, 55, ${(1 - meteor.impactFlash) * 0.3})`;
                        ctx.fill();

                        if (meteor.impactFlash > 0.2 && revealedCount <= meteor.skillIdx) {
                            revealedCount = meteor.skillIdx + 1;
                        }
                    } else {
                        meteors.splice(m, 1);
                    }
                }
            }

            // Animate Revealed Scales
            for (let i = 0; i < skills.length; i++) {
                if (i < revealedCount) {
                    if (revealedScales[i] < 1) {
                        revealedScales[i] = Math.min(1, revealedScales[i] + 0.05);
                    }
                }
            }

            // Draw subtle globe outline
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(212, 175, 55, 0.1)";
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw grid lines
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI;
                ctx.beginPath();
                ctx.ellipse(cx, cy, radius, radius * Math.abs(Math.cos(angle)), 0, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(212, 175, 55, 0.05)";
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            const projected: { sx: number; sy: number; z: number; idx: number }[] = [];

            points.forEach((p, idx) => {
                const cosR = Math.cos(rotation);
                const sinR = Math.sin(rotation);
                const rx = p.x * cosR - p.z * sinR;
                const rz = p.x * sinR + p.z * cosR;
                const ry = p.y;

                const scale = 1 / (1 + rz * 0.15);
                const sx = cx + rx * radius * scale;
                const sy = cy + ry * radius * scale;

                projected.push({ sx, sy, z: rz, idx });
            });

            projected.sort((a, b) => a.z - b.z);

            projected.forEach(({ sx, sy, z, idx }) => {
                const alpha = (z + 1) / 2;
                const labelIdx = labelIndices.indexOf(idx);

                if (labelIdx >= 0 && labelIdx < revealedCount) {
                    const springScale = revealedScales[labelIdx];
                    const dotSize = (2.5 + alpha * 2) * springScale;

                    ctx.beginPath();
                    ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(212, 175, 55, ${0.2 + alpha * 0.8})`;
                    ctx.fill();

                    // Glow
                    ctx.beginPath();
                    ctx.arc(sx, sy, dotSize + 4 * springScale, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(245, 158, 11, ${alpha * 0.2 * springScale})`;
                    ctx.fill();

                    if (alpha > 0.45 && springScale > 0.5) {
                        const fontSize = (10 + alpha * 4) * springScale;
                        ctx.font = `black ${fontSize}px 'JetBrains Mono', monospace`;
                        ctx.fillStyle = `rgba(248, 250, 252, ${(0.2 + alpha * 0.8) * (springScale - 0.5) * 2})`;
                        ctx.textAlign = "center";
                        ctx.fillText(skills[labelIdx].toUpperCase(), sx, sy - dotSize - 8 * springScale);
                    }
                } else if (labelIdx >= 0 && labelIdx >= revealedCount) {
                } else {
                    const dotSize = 0.5 + alpha * 1.5;
                    ctx.beginPath();
                    ctx.arc(sx, sy, dotSize, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(212, 175, 55, ${0.05 + alpha * 0.2})`;
                    ctx.fill();
                }
            });
        };

        const animate = () => {
            if (!isDragging) {
                rotation += 0.004;
            }
            render(performance.now());
            return requestAnimationFrame(animate);
        };

        const frameId = animate();

        // Mouse interaction
        const handleMouseDown = (e: MouseEvent) => {
            isDragging = true;
            dragStartX = e.clientX;
            dragStartRotation = rotation;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const dx = e.clientX - dragStartX;
                rotation = dragStartRotation + dx * 0.005;
            }
        };

        const handleMouseUp = () => {
            isDragging = false;
        };

        canvas.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            cancelAnimationFrame(frameId);
            canvas.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [skills, width, height]);

    return (
        <canvas
            ref={canvasRef}
            className={`cursor-grab active:cursor-grabbing ${className}`}
            style={{ maxWidth: "100%", height: "auto" }}
        />
    );
}
