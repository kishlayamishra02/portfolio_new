import React from 'react';
import { motion } from 'framer-motion';
import { ContentItem } from '../types';
import { GlowingEffect } from './ui/glowing-effect';

interface ModalProps {
  item: ContentItem | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(24px)'
      }}
    >
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        style={{ width: '100%', maxWidth: '56rem', position: 'relative' }}
      >
        <div className="relative group w-full rounded-[2.5rem] p-px">
          <GlowingEffect
            blur={0}
            borderWidth={2}
            disabled={false}
            glow={true}
            inactiveZone={0.01}
            proximity={80}
            spread={60}
            variant="default"
          />
          <div className="relative h-full rounded-[39px] bg-[#040404]/90 backdrop-blur-3xl border border-white/5 overflow-hidden max-h-[90vh]">
            <div className="overflow-y-auto h-full scrollbar-hide relative z-10">
              {/* Handcrafted gold shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-8 right-8 z-20 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black transition-all group"
                data-hover="true"
              >
                <svg className="w-5 h-5 transition-transform group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-6 sm:p-10 md:p-20 relative z-10">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-8 text-[#D4AF37]/60 font-black text-[10px] uppercase tracking-[0.4em] italic">
                  <span>{item.year}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                  <span>{item.description}</span>
                </div>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none italic uppercase">
                  {item.title}
                </h2>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {item.tags?.map(tag => (
                    <span key={tag} className="px-4 py-1.5 rounded-sm text-[9px] font-black uppercase tracking-widest border border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37]/80 italic">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="h-px bg-gradient-to-r from-[#D4AF37]/30 via-[#D4AF37]/10 to-transparent w-full mb-10" />

                {/* Details */}
                <p className="text-lg md:text-2xl text-[#9CA3AF] font-medium leading-relaxed mb-14 max-w-3xl italic">
                  {item.details || item.description}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-6">
                  <a
                    href={item.sourceLink || "https://www.linkedin.com/in/kishlayamishra"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 !py-5 flex items-center justify-center text-center"
                    data-hover="true"
                  >
                    SOURCE LOG
                  </a>
                  <a
                    href={item.demoLink || "https://www.linkedin.com/in/kishlayamishra"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost flex-1 !py-5 !bg-white/5 flex items-center justify-center text-center"
                    data-hover="true"
                  >
                    OPERATIONAL DEMO
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
