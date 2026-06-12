"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              className="w-full text-left py-6 flex items-start gap-4 group"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-${item.id}`}
            >
              <ChevronDown
                size={20}
                className={`text-sage mt-1 shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-xl md:text-2xl font-medium text-charcoal group-hover:text-sage-dark transition-colors duration-200">
                  {item.title}
                </h3>
                {!isOpen && (
                  <p className="font-body text-sm text-muted mt-1 leading-relaxed">
                    {item.summary}
                  </p>
                )}
              </div>
            </button>

            <div
              id={`accordion-${item.id}`}
              className={`overflow-hidden transition-all duration-400 ease-in-out ${
                isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="pl-9 pb-8">
                {item.body.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="font-body text-base text-muted leading-relaxed mb-4 last:mb-0"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
