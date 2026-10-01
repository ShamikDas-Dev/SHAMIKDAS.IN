import { motion } from 'framer-motion';
import {
  Activity,
  Atom,
  Braces,
  Code2,
  Database,
  FileCode,
  Flame,
  GitBranch,
  Github,
  Monitor,
  Scan,
  Terminal,
  Wind,
} from 'lucide-react';
import { skillGroups } from '../data/skills';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';

const STACK_ICONS = {
  C: Code2,
  JavaScript: Braces,
  Python: Terminal,
  HTML: FileCode,
  CSS: Code2,
  React: Atom,
  'Tailwind CSS': Wind,
  'Computer Vision': Scan,
  MediaPipe: Activity,
  Firebase: Flame,
  Firestore: Database,
  Git: GitBranch,
  GitHub: Github,
  'VS Code': Monitor,
};

export default function Stack() {
  return (
    <section id="stack" className="section-shell">
      <div className="shell-container">
        <SectionHeader index="4" label="STACK" note="WORKING TOOLSET" />

        <div className="stack-intro">
          <ScrollReveal>
            <div>
              <p className="eyebrow">TOOLCHAIN</p>
              <h2>Tools I work with.</h2>
            </div>
          </ScrollReveal>
          <p>No inflated percentages. Just the technologies currently in my workflow.</p>
        </div>

        <div className="stack-grid">
          {skillGroups.map((group, index) => (
            <ScrollReveal
              key={group.label}
              className="stack-card glass-panel"
              delay={index * 0.05}
              y={22 + index * 4}
            >
              <div className="stack-card-top">
                <span>{group.label}</span>
                <span>0{index + 1}</span>
              </div>
              <div className="stack-items">
                {group.items.map((item) => {
                  const Icon = STACK_ICONS[item] || Code2;
                  return (
                    <div className="stack-item" key={item}>
                      <span className="stack-icon" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.8} />
                      </span>
                      <span className="stack-item-name">{item}</span>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="stack-marquee glass-panel" y={24}>
          <motion.div
            className="stack-marquee-track"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            <span>REACT • JAVASCRIPT • PYTHON • C • FIREBASE • MEDIAPIPE • GIT • GITHUB •</span>
            <span>REACT • JAVASCRIPT • PYTHON • C • FIREBASE • MEDIAPIPE • GIT • GITHUB •</span>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
