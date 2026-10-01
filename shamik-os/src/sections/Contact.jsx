import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';

const links = [
  { label: 'EMAIL', value: 'dasshamik6@gmail.com', icon: Mail, href: 'mailto:dasshamik6@gmail.com' },
  { label: 'GITHUB', value: '@ShamikDas-Dev', icon: Github, href: 'https://github.com/ShamikDas-Dev' },
  { label: 'LINKEDIN', value: 'linkedin.com/in/shamik-das-tech', icon: Linkedin, href: 'https://www.linkedin.com/in/shamik-das-tech/' },
];

export default function Contact() {
  return (
    <section id="contact" className="section-shell contact-section section-alt">
      <div className="shell-container">
        <SectionHeader index="5" label="CONTACT" note="ESTABLISH CONNECTION" />

        <div className="contact-grid">
          <ScrollReveal className="contact-copy" y={38}>
            <p className="eyebrow">ESTABLISH_CONNECTION</p>
            <h2>Build something<br />worth opening.</h2>
            <p>
              Have a project, idea or technical problem worth exploring? Send a signal through one of the channels below.
            </p>
          </ScrollReveal>

          <div className="contact-links">
            {links.map(({ label, value, icon: Icon, href }, index) => {
              const Tag = href ? 'a' : 'div';
              return (
                <ScrollReveal key={label} delay={index * 0.07} y={28}>
                  <Tag
                    href={href || undefined}
                    target={href ? '_blank' : undefined}
                    rel={href ? 'noreferrer' : undefined}
                    className={`contact-link glass-panel ${!href ? 'contact-link-disabled' : ''}`}
                  >
                    <span className="contact-icon"><Icon size={17} /></span>
                    <span>
                      <small>{label}</small>
                      <strong>{value}</strong>
                    </span>
                    <ArrowUpRight size={15} />
                  </Tag>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
