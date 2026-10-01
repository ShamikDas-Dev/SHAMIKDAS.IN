import { useCallback, useMemo, useState } from 'react';
import { ArrowRight, Github } from 'lucide-react';
import BootSequence from './components/BootSequence';
import Navbar from './components/Navbar';
import SystemBar from './components/SystemBar';
import CommandPalette from './components/CommandPalette';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import ScrollMarquee from './components/ScrollMarquee';
import ScrollProgress from './components/ScrollProgress';
import Home from './sections/Home';
import About from './sections/About';
import Projects from './sections/Projects';
import Lab from './sections/Lab';
import Stack from './sections/Stack';
import Contact from './sections/Contact';
import { projects } from './data/projects';
import { useActiveSection } from './hooks/useActiveSection';
import { useCommandPalette } from './hooks/useCommandPalette';
import { useLocalStorage } from './hooks/useLocalStorage';

const SECTION_IDS = ['home', 'about', 'projects', 'lab', 'stack', 'contact'];

export default function App() {
  const [booted, setBooted] = useLocalStorage('shamik-os:booted', false);
  const [showBoot, setShowBoot] = useState(!booted);
  const { open, openPalette, closePalette } = useCommandPalette();
  const active = useActiveSection(SECTION_IDS);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
    setShowBoot(false);
  }, [setBooted]);

  const paletteActions = useMemo(() => {
    const navActions = SECTION_IDS.filter((id) => id !== 'home').map((id, index) => ({
      id: `nav-${id}`,
      label: `Go to ${id}`,
      hint: `Section / ${String(index + 1).padStart(2, '0')}`,
      group: 'GO TO',
      icon: ArrowRight,
      perform: () => scrollTo(id),
    }));

    return [
      ...navActions,
      {
        id: 'github',
        label: 'Open GitHub',
        hint: 'github.com/ShamikDas-Dev',
        group: 'ACTIONS',
        icon: Github,
        perform: () => window.open('https://github.com/ShamikDas-Dev', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'reset-boot',
        label: 'Replay boot sequence',
        hint: 'Reset / launch intro',
        group: 'SYSTEM',
        icon: ArrowRight,
        perform: () => {
          setBooted(false);
          setShowBoot(true);
        },
      },
    ];
  }, [scrollTo, setBooted]);

  return (
    <div className="site-shell">
      {showBoot && <BootSequence onComplete={handleBootComplete} />}
      <ScrollProgress />
      <CustomCursor />
      <Navbar active={active} onOpenPalette={openPalette} />

      <main className="pb-24">
        <Home />
        <ScrollMarquee text="BUILD / LEARN / SHIP / BUILD / LEARN / SHIP" />
        <About />
        <Projects />
        <ScrollMarquee text="AI / VISION / WEB / SYSTEMS / AI / VISION / WEB / SYSTEMS" />
        <Lab />
        <Stack />
        <Contact />
        <Footer />
      </main>

      <SystemBar projectCount={projects.length} />
      <CommandPalette open={open} onClose={closePalette} actions={paletteActions} />

      <button
        type="button"
        className="mobile-command glass-button"
        onClick={openPalette}
        aria-label="Open command palette"
      >
        <span>&gt;_</span>
      </button>
    </div>
  );
}
