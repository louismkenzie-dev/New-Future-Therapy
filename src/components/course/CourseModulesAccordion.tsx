"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, PlayCircle, PenLine, FileDown, Clock } from "lucide-react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export interface ModuleSummary {
  id: string;
  number: number;
  title: string;
  lede: string;
  lessons: {
    id: string;
    title: string;
    summary: string;
    estimatedMinutes: number;
    hasVideo: boolean;
    hasExercise: boolean;
    hasDownload: boolean;
    preview?: boolean;
  }[];
}

export default function CourseModulesAccordion({
  modules,
}: {
  modules: ModuleSummary[];
}) {
  const [openId, setOpenId] = useState<string | null>(modules[0]?.id ?? null);

  return (
    <div className="space-y-4">
      {modules.map((module, index) => {
        const isOpen = openId === module.id;
        const minutes = module.lessons.reduce((s, l) => s + l.estimatedMinutes, 0);
        return (
          <motion.div
            key={module.id}
            className="bg-white rounded-2xl border border-grey-light shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.8, delay: index * 0.05, ease: EASE_OUT }}
          >
            <button
              className="w-full text-left p-6 md:p-8 flex items-start gap-5 group"
              onClick={() => setOpenId(isOpen ? null : module.id)}
              aria-expanded={isOpen}
              aria-controls={`module-${module.id}`}
            >
              <span className="font-heading text-3xl font-light text-sage shrink-0 w-10 text-center">
                {module.number}
              </span>
              <div className="flex-1 min-w-0">
                <span className="block w-8 h-0.5 bg-sage mb-3" aria-hidden="true" />
                <h3 className="font-heading text-xl md:text-2xl font-medium text-charcoal group-hover:text-sage-dark transition-colors duration-200">
                  {module.title}
                </h3>
                <p className="font-body text-sm text-muted mt-2 leading-relaxed">
                  {module.lede}
                </p>
                <p className="font-body text-xs text-grey-mid mt-3 uppercase tracking-widest">
                  {module.lessons.length} lessons · about {minutes} minutes
                </p>
              </div>
              <motion.span
                className="text-sage mt-1 shrink-0"
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <ChevronDown size={20} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`module-${module.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <ul className="border-t border-grey-light divide-y divide-grey-light">
                    {module.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="px-6 md:px-8 py-4 flex items-start gap-4"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-sm font-medium text-charcoal">
                            {lesson.title}
                            {lesson.preview && (
                              <span className="ml-2 font-body text-xs text-sage-dark bg-sage-pale border border-sage-light/50 rounded-full px-3 py-0.5">
                                Free Preview
                              </span>
                            )}
                          </p>
                          <p className="font-body text-sm text-muted mt-1 leading-relaxed">
                            {lesson.summary}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 text-grey-mid shrink-0 mt-0.5">
                          {lesson.hasVideo && (
                            <PlayCircle size={16} aria-label="Includes video" />
                          )}
                          {lesson.hasExercise && (
                            <PenLine size={16} aria-label="Includes exercise" />
                          )}
                          {lesson.hasDownload && (
                            <FileDown size={16} aria-label="Includes download" />
                          )}
                          <span className="inline-flex items-center gap-1 font-body text-xs">
                            <Clock size={14} />
                            {lesson.estimatedMinutes}m
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
