import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import ScrollReveal from '../components/ScrollReveal';

const interests = ['AI / ML', 'COMPUTER VISION', 'ROBOTICS', 'CYBERSECURITY', 'WEB DEVELOPMENT'];

export default function About() {
  return (
    <section id="about" className="section-shell section-alt about-section">
      <div className="shell-container">
        <SectionHeader index="1" label="ABOUT" note="USER_PROFILE" />

        <div className="about-grid about-story-grid">
          <ScrollReveal className="about-intro glass-panel" y={34}>
            <p className="eyebrow">USER_PROFILE</p>
            <h2>Learning systems by building them.</h2>
            <p>
              I&apos;m a Computer Science &amp; Technology student at Adamas University. I like turning ideas into working interfaces, small systems and applied experiments — especially where software meets AI, vision and human interaction.
            </p>
            <div className="about-stamp">STUDENT / BUILDER / EXPLORER</div>
          </ScrollReveal>

          <ScrollReveal className="profile-data glass-panel" delay={0.08} y={46}>
            {[
              ['NAME', 'SHAMIK DAS'],
              ['ROLE', 'COMPUTER SCIENCE & TECHNOLOGY STUDENT'],
              ['UNIVERSITY', 'ADAMAS UNIVERSITY'],
              ['GITHUB', '@ShamikDas-Dev'],
            ].map(([label, value]) => (
              <div className="data-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </ScrollReveal>
        </div>

        <div className="about-interests">
          <ScrollReveal>
            <p className="eyebrow">INTEREST MAP</p>
          </ScrollReveal>
          <div className="interest-grid">
            {interests.map((item, index) => (
              <ScrollReveal key={item} delay={index * 0.05} y={18} className="interest-card glass-panel">
                <motion.span className="interest-index" whileHover={{ x: 4 }}>{`0${index + 1}`}</motion.span>
                <span>{item}</span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
