import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollReveal({ children, className = '', delay = 0, y = 28, scale = 0.985 }) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'end 14%'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.7, 1], [0, 1, 1, 0.92]);
  const translateY = useTransform(scrollYProgress, [0, 0.55, 1], [y, 0, -y * 0.2]);
  const zoom = useTransform(scrollYProgress, [0, 0.5, 1], [scale, 1, 0.995]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={prefersReduced ? undefined : { opacity, y: translateY, scale: zoom }}
      initial={prefersReduced ? undefined : { opacity: 0, y }}
      whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
