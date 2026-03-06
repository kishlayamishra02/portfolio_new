"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.scrollHeight);
      }
    };

    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    if (ref.current) resizeObserver.observe(ref.current);

    // Initial delay to capture layout finishing
    const timer = setTimeout(updateHeight, 500);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent font-sans md:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#040404] flex items-center justify-center border border-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.05)]">
                <div className="h-3 w-3 rounded-full bg-[#D4AF37] border border-[#F59E0B]/50 p-2 animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-black text-white/10 italic uppercase tracking-tighter">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-black text-white/20 italic uppercase">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent z-10"
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
              background: 'linear-gradient(to bottom, transparent 0%, #D4AF37 50%, #F59E0B 100%)',
              borderRadius: '9999px',
              boxShadow: '0 0 20px rgba(212, 175, 55, 0.6)'
            }}
          />
        </div>
      </div>
    </div>
  );
};