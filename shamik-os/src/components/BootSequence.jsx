import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BOOT_LINES = [
  ['core.init', 'OK'],
  ['profile.load', 'OK'],
  ['projects.index', 'OK'],
  ['interface.start', 'OK'],
];

export default function BootSequence({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [finishing, setFinishing] = useState(false);

  useEffect(() => {
    if (index >= BOOT_LINES.length) {
      const timer = setTimeout(() => setFinishing(true), 350);
      const done = setTimeout(onComplete, 650);
      return () => {
        clearTimeout(timer);
        clearTimeout(done);
      };
    }

    const timer = setTimeout(() => setIndex((current) => current + 1), 320);
    return () => clearTimeout(timer);
  }, [index, onComplete]);

  const skip = () => {
    setFinishing(true);
    window.setTimeout(onComplete, 220);
  };

  return (
    <AnimatePresence>
      {!finishing && (
        <motion.div
          className="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          role="dialog"
          aria-label="System boot sequence"
        >
          <div className="boot-grid" />
          <div className="boot-shell">
            <div className="boot-topline">
              <span>SHAMIK.OS</span>
              <span>INIT / 01</span>
            </div>

            <div className="boot-title-wrap">
              <p className="eyebrow">BOOT SEQUENCE</p>
              <h1>System startup</h1>
              <p className="boot-description">
                Preparing a small digital workspace for the work behind the screen.
              </p>
            </div>

            <div className="boot-console glass-panel">
              {BOOT_LINES.map(([label, status], lineIndex) => {
                const visible = lineIndex < index;
                return (
                  <div className="boot-line" key={label}>
                    <span className="boot-prefix">$</span>
                    <span>{label}</span>
                    <span className={visible ? 'boot-ok' : 'boot-pending'}>
                      {visible ? status : '…'}
                    </span>
                  </div>
                );
              })}
              <div className="boot-progress">
                <motion.span
                  animate={{ width: `${Math.min((index / BOOT_LINES.length) * 100, 100)}%` }}
                  transition={{ duration: 0.25 }}
                />
              </div>
            </div>

            <div className="boot-footer">
              <span>LIGHT SYSTEM / GLASS INTERFACE</span>
              <button type="button" onClick={skip} className="text-button">
                SKIP /
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
