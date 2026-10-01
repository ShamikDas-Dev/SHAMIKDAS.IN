export default function SectionHeader({ index, label, note }) {
  return (
    <div className="section-header">
      <div>
        <p className="eyebrow">{String(index).padStart(2, '0')} / {label}</p>
      </div>
      {note && <span className="section-note">{note}</span>}
    </div>
  );
}
