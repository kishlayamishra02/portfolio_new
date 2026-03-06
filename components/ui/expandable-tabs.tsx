
"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  id: string;
  // Fix: Using an optional string literal allows for better union narrowing than 'never'
  type?: "tab";
}

interface Separator {
  type: "separator";
}

export type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  activeColor?: string;
  activeIndex?: number | null;
  onChange?: (id: string | null) => void;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

// Fix: Use 'as const' to ensure 'type' is inferred as the literal "spring" instead of "string" for Framer Motion types
const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 } as const;

export function ExpandableTabs({
  tabs,
  className,
  activeColor = "text-[#D4AF37]",
  activeIndex: externalActiveIndex,
  onChange,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(0);

  // Sync with external active index (from IntersectionObserver)
  React.useEffect(() => {
    if (externalActiveIndex !== undefined && externalActiveIndex !== null) {
      setSelected(externalActiveIndex);
    }
  }, [externalActiveIndex]);

  const handleSelect = (index: number, id?: string) => {
    setSelected(index);
    if (id) onChange?.(id);
  };

  const SeparatorComponent = () => (
    <div className="mx-1 h-[24px] w-[1.2px] bg-white/10" aria-hidden="true" />
  );

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-2xl border border-white/5 bg-black/40 backdrop-blur-md p-1 shadow-2xl",
        className
      )}
    >
      {tabs.map((tab, index) => {
        // Fix: Checking tab.type now correctly discriminates the union between Tab and Separator
        if (tab.type === "separator") {
          return <SeparatorComponent key={`separator-${index}`} />;
        }

        // Now 'tab' is correctly inferred as 'Tab'
        const Icon = tab.icon;
        const isSelected = selected === index;
        return (
          <div
            key={tab.title}
            onClick={() => handleSelect(index, tab.id)}
            className={cn(
              "relative flex items-center rounded-xl px-4 py-2 text-sm font-black uppercase tracking-widest transition-colors duration-300 cursor-pointer",
              isSelected
                ? cn("bg-white/10", activeColor)
                : "text-white/40 hover:bg-white/5 hover:text-white"
            )}
            data-hover="true"
          >
            <motion.div
              variants={buttonVariants}
              initial={false}
              animate="animate"
              custom={isSelected}
              transition={transition}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Icon size={18} strokeWidth={2.5} />
              <AnimatePresence initial={false}>
                {isSelected && (
                  <motion.span
                    variants={spanVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    style={{ overflow: 'hidden', whiteSpace: 'nowrap', marginLeft: '0.5rem', fontSize: '10px' }}
                  >
                    {tab.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
