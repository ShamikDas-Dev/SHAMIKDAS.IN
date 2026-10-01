export default function StatusIndicator({ label = 'ONLINE' }) {
  return (
    <span className="status-indicator">
      <span className="status-dot" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}
