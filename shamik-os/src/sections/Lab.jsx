import { motion } from 'framer-motion';
import { Activity, Cpu, Eye, Radio } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';

const experiments = [
  { icon: Eye, title: 'COMPUTER VISION', text: 'Exploring pose landmarks, visual interfaces and camera-based interactions.' },
  { icon: Radio, title: 'AI INTERFACES', text: 'Designing interfaces that make intelligent features feel clear and usable.' },
  { icon: Cpu, title: 'WEB SYSTEMS', text: 'Building practical frontends, data-backed apps and reusable UI systems.' },
];

export default function Lab() {
  return (
    <section id="lab" className="section-shell section-alt">
      <div className="shell-container">
        <SectionHeader index="3" label="LAB" note="EXPERIMENTAL SPACE" />

        <div className="lab-grid">
          <ScrollReveal className="lab-terminal glass-panel" y={44}>
            <div className="terminal-topline">
              <span>LAB / ACTIVE</span>
              <Activity size={14} />
            </div>
            <div className="terminal-body">
              <p><span>$</span> cat /current_focus</p>
              <p className="terminal-accent">01 / POSE ESTIMATION</p>
              <p className="terminal-accent">02 / COMPUTER VISION</p>
              <p className="terminal-accent">03 / AI-ASSISTED APPS</p>
              <p className="terminal-muted">// prototype → test → refine</p>
            </div>
            <div className="signal-row" aria-hidden="true">
              {[32, 52, 41, 72, 58, 78, 64, 86, 68, 54, 74, 62].map((height, index) => (
                <motion.span
                  key={index}
                  style={{ height: `${height}%` }}
                  initial={{ height: '20%' }}
                  whileInView={{ height: `${height}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03, duration: 0.4 }}
                />
              ))}
            </div>
          </ScrollReveal>

          <div className="lab-cards">
            {experiments.map(({ icon: Icon, title, text }, index) => (
              <ScrollReveal key={title} delay={index * 0.07} y={28} className="lab-card glass-panel">
                <div className="lab-icon"><Icon size={17} /></div>
                <div>
                  <p className="eyebrow">0{index + 1} / MODULE</p>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
