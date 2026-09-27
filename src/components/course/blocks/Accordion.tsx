"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import BlockHeading from "./BlockHeading";
import RichText from "./RichText";
import { courseIcon } from "./courseIcons";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Accordion({
  heading,
  intro,
  items,
}: {
  heading?: string;
  intro?: string;
  items: { icon?: string; title: string; body: string }[];
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      <BlockHeading heading={heading} intro={intro} />
      <div className="bg-white rounded-2xl border border-grey-light shadow-sm divide-y divide-grey-light overflow-hidden">
        {items.map((item, i) => {
          const Icon = courseIcon(item.icon);
          const isOpen = open === i;
          return (
            <div key={item.title}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full text-left px-6 md:px-8 py-5 flex items-center gap-4 group min-h-[44px]"
              >
                {item.icon && (
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-sage-pale text-sage-dark shrink-0">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                )}
                <span className="flex-1 font-body text-base md:text-lg font-medium text-charcoal group-hover:text-sage-dark transition-colors duration-200">
                  {item.title}
                </span>
                <motion.span
                  className="text-sage shrink-0"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <ChevronDown size={20} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                    className="overflow-hidden"
                  >
                    <div className={`px-6 md:px-8 pb-7 ${item.icon ? "md:pl-[5.5rem]" : ""}`}>
                      <RichText body={item.body} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
