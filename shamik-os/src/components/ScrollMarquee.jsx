import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function ScrollMarquee({ text = 'BUILD / LEARN / SHIP' }) {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], ['0%', '-34%']);

  return (
    <section className="scroll-marquee" aria-hidden="true">
      <motion.div className="scroll-marquee-track" style={{ x }}>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </motion.div>
    </section>
  );
}
