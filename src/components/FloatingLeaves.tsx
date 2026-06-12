"use client";

import { motion } from "motion/react";

/* Ambient drifting leaves — slow, weightless, barely-there.
   Hidden from screen readers and pointer events; purely atmospheric. */

const Leaf = ({ size, fill }: { size: number; fill: string }) => (
  <svg width={size} height={size * 1.22} viewBox="0 0 180 220" fill="none" aria-hidden="true">
    <path d="M90 200 C20 150 10 80 90 20 C170 80 160 150 90 200Z" fill={fill} />
    <line x1="90" y1="200" x2="90" y2="20" stroke="#F5F3EF" strokeWidth="2" />
    <line x1="90" y1="120" x2="50" y2="80" stroke="#F5F3EF" strokeWidth="1.5" />
    <line x1="90" y1="140" x2="130" y2="100" stroke="#F5F3EF" strokeWidth="1.5" />
  </svg>
);

interface LeafSpec {
  size: number;
  fill: string;
  left: string;
  top: string;
  duration: number;
  delay: number;
  rotate: number;
  opacity: number;
}

const LEAVES: LeafSpec[] = [
  { size: 38, fill: "#6B8C6F", left: "6%", top: "18%", duration: 11, delay: 0, rotate: -14, opacity: 0.14 },
  { size: 26, fill: "#3A5A40", left: "88%", top: "12%", duration: 13, delay: 1.5, rotate: 18, opacity: 0.12 },
  { size: 48, fill: "#C4D9C6", left: "78%", top: "62%", duration: 15, delay: 3, rotate: -8, opacity: 0.3 },
  { size: 22, fill: "#6B8C6F", left: "14%", top: "70%", duration: 12, delay: 2, rotate: 24, opacity: 0.16 },
];

export default function FloatingLeaves({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {LEAVES.map((l, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: l.left, top: l.top, opacity: l.opacity, rotate: l.rotate }}
          animate={{
            y: [0, -26, 0],
            rotate: [l.rotate, l.rotate + 10, l.rotate],
          }}
          transition={{
            duration: l.duration,
            delay: l.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Leaf size={l.size} fill={l.fill} />
        </motion.div>
      ))}
    </div>
  );
}
