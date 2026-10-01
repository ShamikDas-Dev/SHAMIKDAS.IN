import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const goHome = () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer-section">
      <div className="shell-container">
        <div className="footer-grid">
          <div>
            <p className="eyebrow">SYSTEM END</p>
            <h2>Thanks for<br />exploring.</h2>
          </div>
          <div className="footer-side">
            <p>SHAMIK.OS / PERSONAL DEVELOPER SYSTEM</p>
            <p>© {new Date().getFullYear()} SHAMIK DAS</p>
            <button type="button" className="text-link" onClick={goHome}>
              RETURN HOME <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
