import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Command, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import StatusIndicator from './StatusIndicator';

const navItems = [
  ['about', 'ABOUT'],
  ['projects', 'PROJECTS'],
  ['lab', 'LAB'],
  ['stack', 'STACK'],
  ['contact', 'CONTACT'],
];

export default function Navbar({ active, onOpenPalette }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => scrollY.on('change', (value) => setScrolled(value > 48)), [scrollY]);

  const go = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 lg:px-7">
      <motion.nav
        className={`glass-nav mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 sm:px-5 ${scrolled ? 'nav-scrolled' : ''}`}
        animate={{
          y: scrolled ? -1 : 0,
          boxShadow: scrolled
            ? '0 16px 42px rgba(52, 68, 44, 0.10), inset 0 1px 0 rgba(255,255,255,0.60)'
            : '0 10px 32px rgba(52, 68, 44, 0.06), inset 0 1px 0 rgba(255,255,255,0.56)',
        }}
        transition={{ duration: 0.22 }}
      >
        <button type="button" className="brand-button" onClick={() => go('home')} aria-label="Go home">
          <span className="brand-dot" aria-hidden="true" />
          <span>SHAMIK.OS</span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map(([id, label], index) => {
            const selected = active === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => go(id)}
                className={`nav-link ${selected ? 'nav-link-active' : ''}`}
              >
                <span className="nav-index">{String(index + 1).padStart(2, '0')}</span>
                <span>/ {label}</span>
                {selected && <motion.span layoutId="nav-underline" className="nav-underline" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" className="command-button" onClick={onOpenPalette} aria-label="Open command palette">
            <Command size={14} />
            <span className="hidden sm:inline">⌘K</span>
          </button>
          <StatusIndicator />
          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-nav glass-floating"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <p className="eyebrow">NAVIGATION / MOBILE</p>
            <div className="mobile-nav-links">
              {navItems.map(([id, label], index) => (
                <button key={id} type="button" onClick={() => go(id)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{label}</strong>
                  {active === id && <i />}
                </button>
              ))}
            </div>
            <button type="button" className="mobile-nav-command" onClick={() => { setMenuOpen(false); onOpenPalette(); }}>
              <Command size={15} /> COMMAND PALETTE <span>⌘K</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
