import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, Github, MoveRight } from 'lucide-react';
import { useRef } from 'react';
import ProfileNode from '../components/ProfileNode';

const focus = ['AI / ML', 'COMPUTER VISION', 'WEB DEVELOPMENT'];

export default function Home() {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.3 });
  const titleY = useTransform(smoothProgress, [0, 1], [0, -95]);
  const titleScale = useTransform(smoothProgress, [0, 1], [1, 0.92]);
  const copyOpacity = useTransform(smoothProgress, [0, 0.8, 1], [1, 0.78, 0]);
  const profileY = useTransform(smoothProgress, [0, 1], [0, 75]);
  const profileRotate = useTransform(smoothProgress, [0, 1], [0, -1.8]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section id="home" ref={ref} className="hero-section section-shell">
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-glow hero-glow-a" />
      <div className="hero-glow hero-glow-b" />

      <div className="shell-container relative z-10 grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-10 xl:gap-16">
        <motion.div className="hero-copy" style={prefersReduced ? undefined : { opacity: copyOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.02 }}
            className="system-ready"
          >
            <span className="status-dot" />
            SYSTEM READY
          </motion.div>

          <motion.div style={prefersReduced ? undefined : { y: titleY, scale: titleScale }} className="hero-title-wrap">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.68, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title"
            >
              <span>SHAMIK</span>
              <span className="hero-title-muted">DAS</span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="hero-description"
          >
            Computer Science &amp; Technology student building software, AI experiments and interactive systems — currently exploring computer vision, web engineering and small technical tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.26 }}
            className="focus-panel glass-panel"
          >
            <div className="focus-heading">CURRENT FOCUS</div>
            <ul>
              {focus.map((item, index) => (
                <li key={item}>
                  <span className="focus-arrow">&gt;</span>
                  <span>{item}</span>
                  <span className="focus-index">{String(index + 1).padStart(2, '0')}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.34 }}
            className="hero-actions"
          >
            <button type="button" className="primary-button glass-button" onClick={() => scrollTo('projects')}>
              ENTER PROJECTS <ArrowDown size={14} />
            </button>
            <a className="secondary-button glass-button" href="https://github.com/ShamikDas-Dev" target="_blank" rel="noreferrer">
              GITHUB <Github size={14} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="hero-subline"
          >
            <span>ADAMAS UNIVERSITY</span>
            <MoveRight size={13} />
            <span>BUILD / LEARN / SHIP</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-profile"
          style={prefersReduced ? undefined : { y: profileY, rotate: profileRotate }}
        >
          <ProfileNode />
        </motion.div>
      </div>

      <motion.button
        type="button"
        className="scroll-cue"
        onClick={() => scrollTo('about')}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        aria-label="Scroll to About"
      >
        <span>SCROLL TO EXPLORE</span>
        <motion.span animate={prefersReduced ? undefined : { y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={13} />
        </motion.span>
      </motion.button>
    </section>
  );
}
