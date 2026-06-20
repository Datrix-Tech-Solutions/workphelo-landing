'use client';

import { motion } from 'framer-motion';
import { useScroll } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-orange-500 origin-left z-60"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
