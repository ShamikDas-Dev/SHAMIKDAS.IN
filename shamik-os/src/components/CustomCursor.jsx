import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia('(pointer:fine)').matches;
    setEnabled(supportsFinePointer);
    if (!supportsFinePointer) return undefined;

    const move = (event) => setPosition({ x: event.clientX, y: event.clientY });
    const overInteractive = (event) => {
      const target = event.target.closest('a,button,[data-cursor="interactive"]');
      setHovering(Boolean(target));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', overInteractive);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', overInteractive);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{ x: position.x - 3, y: position.y - 3, scale: hovering ? 1.6 : 1 }}
        transition={{ type: 'spring', stiffness: 850, damping: 35, mass: 0.25 }}
      />
      <motion.div
        className="cursor-ring"
        animate={{ x: position.x - 16, y: position.y - 16, scale: hovering ? 1.35 : 1 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.45 }}
      />
    </>
  );
}
