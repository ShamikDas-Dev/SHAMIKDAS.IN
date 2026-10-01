import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github, X } from 'lucide-react';
import { useEffect } from 'react';

export default function ProjectViewer({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyTouchAction = body.style.touchAction;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.touchAction = 'none';

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.touchAction = previousBodyTouchAction;
    };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            className="project-viewer glass-floating"
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="project-viewer-top">
              <div>
                <p className="eyebrow">PROJECT / {project.id}</p>
                <h3>{project.title}</h3>
              </div>
              <button type="button" className="icon-button" onClick={onClose} aria-label="Close project details">
                <X size={17} />
              </button>
            </div>

            <div className="project-viewer-grid">
              <div>
                <div className="viewer-kicker">OVERVIEW</div>
                <p className="viewer-description">{project.description}</p>
              </div>
              <div className="viewer-stats">
                <div><span>TYPE</span><strong>{project.category}</strong></div>
                <div><span>STATUS</span><strong>{project.status}</strong></div>
              </div>
            </div>

            <div className="viewer-section">
              <div className="viewer-kicker">FEATURES</div>
              <div className="feature-grid">
                {project.features.map((feature) => (
                  <div className="feature-item" key={feature}>
                    <span className="feature-marker">+</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="viewer-section">
              <div className="viewer-kicker">TECH STACK</div>
              <div className="chip-row">
                {project.technologies.map((tech) => <span className="tech-chip" key={tech}>{tech}</span>)}
              </div>
            </div>

            <div className="viewer-actions">
              {project.githubUrl ? (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="action-link">
                  <Github size={14} /> GITHUB <ArrowUpRight size={13} />
                </a>
              ) : (
                <span className="action-link action-link-disabled"><Github size={14} /> GITHUB / ADD URL</span>
              )}
              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="action-link">
                  <ExternalLink size={14} /> LIVE DEMO <ArrowUpRight size={13} />
                </a>
              ) : (
                <span className="action-link action-link-disabled"><ExternalLink size={14} /> LIVE / ADD URL</span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
