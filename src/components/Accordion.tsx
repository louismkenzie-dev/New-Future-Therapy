"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface AccordionItem {
  id: string;
  title: string;
  summary: string;
  body: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-grey-light">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.8, delay: index * 0.06, ease: EASE_OUT }}
          >
            <button
              className="w-full text-left py-6 flex items-start gap-4 group"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
            >
              <motion.span
                className="text-sage mt-1 shrink-0"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <ChevronDown size={20} />
              </motion.span>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-xl md:text-2xl font-medium text-charcoal group-hover:text-sage-dark transition-colors duration-200">
                  {item.title}
                </h3>
                <AnimatePresence initial={false}>
                  {!isOpen && (
                    <motion.p
                      className="font-body text-sm text-muted mt-1 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {item.summary}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`accordion-${item.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <div className="pl-9 pb-8">
                    {item.body.split("\n\n").map((para, i) => (
                      <motion.p
                        key={i}
                        className="font-body text-base text-muted leading-relaxed mb-4 last:mb-0"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE_OUT }}
                      >
                        {para}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
