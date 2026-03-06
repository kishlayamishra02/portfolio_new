"use client";
import React from "react";
import { ShootingStars } from "./ui/shooting-stars";

export const ShootingStarsBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden bg-[#040404]" style={{ zIndex: -1 }}>
            {/* Very Faint Nebula Haze */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    background: `
                        radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.05) 0%, transparent 60%),
                        radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.04) 0%, transparent 60%),
                        radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 80%)
                    `
                }}
            />

            {/* Static Distance Stars (Tiny) */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: `radial-gradient(1px 1px at 100px 150px, #fff, transparent), 
                                     radial-gradient(1px 1px at 300px 400px, #ddd, transparent),
                                     radial-gradient(1.5px 1.5px at 500px 100px, #eee, transparent),
                                     radial-gradient(1px 1px at 700px 600px, #fff, transparent)`,
                    backgroundSize: '800px 800px',
                }}
            />

            {/* Middle Stars (Medium) with Twinkle */}
            <div
                className="absolute inset-0 opacity-40 animate-pulse"
                style={{
                    backgroundImage: `radial-gradient(2px 2px at 200px 200px, #D4AF37, transparent), 
                                     radial-gradient(2px 2px at 600px 500px, #F8FAFC, transparent),
                                     radial-gradient(2.5px 2.5px at 400px 800px, #F59E0B, transparent)`,
                    backgroundSize: '1000px 1000px',
                    animationDuration: '8s'
                }}
            />

            {/* Cinematic Golden Shooting Stars - Muted and Slow */}
            <ShootingStars
                starColor="#D4AF37"
                trailColor="rgba(212, 175, 55, 0.2)"
                minSpeed={4}
                maxSpeed={12}
                minDelay={3000}
                maxDelay={8000}
                starWidth={15}
            />

            <ShootingStars
                starColor="#F59E0B"
                trailColor="rgba(245, 158, 11, 0.15)"
                minSpeed={6}
                maxSpeed={18}
                minDelay={5000}
                maxDelay={12000}
                starWidth={20}
            />

            <ShootingStars
                starColor="#F8FAFC"
                trailColor="rgba(255, 255, 255, 0.1)"
                minSpeed={10}
                maxSpeed={25}
                minDelay={8000}
                maxDelay={15000}
                starWidth={10}
            />
        </div>
    );
};
