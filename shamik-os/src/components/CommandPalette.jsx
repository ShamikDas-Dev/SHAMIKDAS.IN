import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CornerDownLeft, Search, Terminal } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function CommandPalette({ open, onClose, actions }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return actions;
    return actions.filter((action) =>
      `${action.label} ${action.hint} ${action.group}`.toLowerCase().includes(needle),
    );
  }, [actions, query]);

  useEffect(() => {
    if (!open) return undefined;
    setQuery('');
    setSelected(0);
    const timer = window.setTimeout(() => document.getElementById('command-search')?.focus(), 10);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    const onKey = (event) => {
      if (!open) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelected((current) => Math.min(current + 1, filtered.length - 1));
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelected((current) => Math.max(current - 1, 0));
      }
      if (event.key === 'Enter' && filtered[selected]) {
        event.preventDefault();
        filtered[selected].perform();
        onClose();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [filtered, onClose, open, selected]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="command-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            className="command-panel glass-floating"
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="command-search-row">
              <Search size={16} />
              <input
                id="command-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Type a command..."
                autoComplete="off"
              />
              <kbd>ESC</kbd>
            </div>

            <div className="command-list">
              {filtered.length ? (
                filtered.map((action, index) => {
                  const Icon = action.icon ?? Terminal;
                  return (
                    <button
                      key={action.id}
                      type="button"
                      className={`command-item ${index === selected ? 'command-item-selected' : ''}`}
                      onMouseEnter={() => setSelected(index)}
                      onClick={() => {
                        action.perform();
                        onClose();
                      }}
                    >
                      <span className="command-icon"><Icon size={15} /></span>
                      <span className="min-w-0 flex-1 text-left">
                        <span className="command-label">{action.label}</span>
                        <span className="command-hint">{action.hint}</span>
                      </span>
                      <ArrowUpRight size={14} />
                    </button>
                  );
                })
              ) : (
                <div className="command-empty">NO MATCHES / TRY ANOTHER TERM</div>
              )}
            </div>

            <div className="command-footer">
              <span><kbd>↑</kbd><kbd>↓</kbd> NAVIGATE</span>
              <span><kbd><CornerDownLeft size={11} /></kbd> OPEN</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
