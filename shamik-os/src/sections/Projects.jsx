import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef, useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import ProjectViewer from '../components/ProjectViewer';
import ScrollReveal from '../components/ScrollReveal';
import { projects } from '../data/projects';

function ProjectStage({ project, index, onSelect }) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'end 12%'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.35 });
  const scale = useTransform(smooth, [0, 0.5, 1], [0.96, 1, 0.98]);
  const y = useTransform(smooth, [0, 1], [34, -20]);
  const titleX = useTransform(smooth, [0, 1], [0, index % 2 ? -35 : 35]);

  return (
    <motion.button
      ref={ref}
      type="button"
      className="project-stage glass-panel"
      onClick={() => onSelect(project)}
      data-cursor="interactive"
      style={prefersReduced ? undefined : { scale, y }}
    >
      <div className="project-stage-grid" aria-hidden="true" />
      <div className="project-stage-top">
        <span className="project-id">{project.id}</span>
        <span className="project-status"><span className="status-dot" />{project.status}</span>
      </div>

      <div className="project-stage-content">
        <div className="project-stage-meta">
          <p className="eyebrow">{project.category}</p>
          <span className="project-stage-label">SYSTEM / 0{index + 1}</span>
        </div>
        <motion.h3 style={prefersReduced ? undefined : { x: titleX }}>{project.title}</motion.h3>
        <p className="project-description">{project.description}</p>
      </div>

      <div className="project-stage-bottom">
        <div className="chip-row project-chips">
          {project.technologies.map((tech) => <span className="tech-chip" key={tech}>{tech}</span>)}
        </div>
        <span className="project-arrow"><ArrowUpRight size={18} /></span>
      </div>
      <span className="project-line" />
    </motion.button>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="section-shell projects-section">
      <div className="shell-container">
        <SectionHeader index="2" label="PROJECTS" note="03 INDEXED SYSTEMS" />

        <div className="projects-intro">
          <ScrollReveal>
            <div>
              <p className="eyebrow">PROJECT DATABASE</p>
              <h2>Selected builds.</h2>
              <p>Three projects that reflect what I&apos;m building right now.</p>
            </div>
          </ScrollReveal>
          <div className="project-count">03 / CURRENT</div>
        </div>

        <div className="project-stage-stack">
          {projects.map((project, index) => (
            <ProjectStage key={project.slug} project={project} index={index} onSelect={setSelected} />
          ))}
        </div>
      </div>

      <ProjectViewer project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
