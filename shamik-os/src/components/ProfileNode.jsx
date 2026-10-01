import { motion } from 'framer-motion';
import { Crosshair, ScanLine } from 'lucide-react';
import { useState } from 'react';

export default function ProfileNode({ image = '/profile.jpg', name = 'SHAMIK DAS', status = 'ONLINE' }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.div
      className="profile-node glass-panel"
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, delay: 0.18 }}
      whileHover={{ y: -3 }}
      data-cursor="interactive"
    >
      <div className="profile-node-top">
        <span>IDENTITY_NODE</span>
        <span className="profile-status"><span className="status-dot" /> {status}</span>
      </div>

      <div className="profile-image-shell">
        <div className="corner corner-tl" />
        <div className="corner corner-tr" />
        <div className="corner corner-bl" />
        <div className="corner corner-br" />

        {!imageFailed ? (
          <motion.img
            src={image}
            alt="Portrait of Shamik Das"
            className="profile-image"
            onError={() => setImageFailed(true)}
            whileHover={{ scale: 1.015 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="profile-placeholder" role="img" aria-label="Profile photo placeholder">
            <Crosshair size={32} strokeWidth={1.3} />
            <span>PROFILE IMAGE</span>
            <strong>USER_01</strong>
            <small>// ADD /public/profile.jpg</small>
          </div>
        )}

        <div className="image-overlay" />
        <div className="scanline" aria-hidden="true" />
        <div className="image-tag image-tag-left">[U-01]</div>
        <div className="image-tag image-tag-right"><ScanLine size={11} /> REC</div>
      </div>

      <div className="profile-node-bottom">
        <div>
          <strong>{name}</strong>
          <span>CS / AI / WEB</span>
        </div>
        <div className="profile-meta">
          <span>NODE</span>
          <strong>ACTIVE</strong>
        </div>
      </div>
    </motion.div>
  );
}
