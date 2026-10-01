import { useEffect, useState } from 'react';
import StatusIndicator from './StatusIndicator';

export default function SystemBar({ projectCount }) {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const formatted = time.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-5 lg:px-8">
      <div className="glass-system mx-auto grid max-w-[1500px] grid-cols-2 gap-2 px-4 py-2.5 text-[9px] sm:flex sm:items-center sm:justify-between sm:px-5 sm:text-[10px]">
        <div className="flex items-center gap-2">
          <span>SYSTEM</span>
          <StatusIndicator />
        </div>
        <div className="hidden sm:block">PROJECTS <span className="strong-value">{String(projectCount).padStart(2, '0')}</span></div>
        <div className="hidden sm:block">STACK <span className="strong-value">JS / PY / C</span></div>
        <div className="hidden md:block">GITHUB <span className="strong-value">CONNECTED</span></div>
        <div className="text-right">LOCAL TIME <span className="strong-value">{formatted}</span></div>
        <div className="col-span-2 border-t border-line-soft pt-1.5 text-right sm:col-span-1 sm:border-0 sm:pt-0">SHAMIKDAS.IN</div>
      </div>
    </div>
  );
}
